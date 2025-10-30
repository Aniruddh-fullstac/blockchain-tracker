import { v4 as uuidv4 } from 'uuid';
import { ref, push, onValue, off, set, get, child } from 'firebase/database';
import { database } from './firebase';

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  deviceId?: string; // Which device created this transaction
}

export interface Block {
  id: string;
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  difficulty: number;
  minerId?: string; // Which device mined this block
}

export interface Blockchain {
  blocks: Block[];
  pendingTransactions: Transaction[];
  difficulty: number;
}

export interface Device {
  id: string;
  name: string;
  walletAddress: string;
  createdAt: number;
}

// Simple hash function for demonstration
function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

// Generate a transaction hash
export function generateTransactionHash(transaction: Omit<Transaction, 'hash'>): string {
  const data = `${transaction.from}-${transaction.to}-${transaction.amount}-${transaction.timestamp}`;
  return simpleHash(data);
}

// Generate a block hash
export function generateBlockHash(block: Omit<Block, 'hash' | 'id'>): string {
  const data = `${block.index}-${block.timestamp}-${block.previousHash}-${block.nonce}`;
  return simpleHash(data);
}

// Create a new transaction
export function createTransaction(from: string, to: string, amount: number): Transaction {
  const timestamp = Date.now();
  const id = uuidv4();
  const transaction: Omit<Transaction, 'hash'> = {
    id,
    from,
    to,
    amount,
    timestamp,
    status: 'pending',
    deviceId: getDeviceId()
  };
  
  return {
    ...transaction,
    hash: generateTransactionHash(transaction)
  };
}

// Mine a block (simplified proof of work)
export function mineBlock(transactions: Transaction[], previousHash: string, index: number): Block {
  const timestamp = Date.now();
  let nonce = 0;
  let hash = '';
  const difficulty = 2; // Number of leading zeros required
  
  // Simple proof of work
  do {
    nonce++;
    const blockData = { index, timestamp, transactions, previousHash, nonce, difficulty };
    hash = generateBlockHash(blockData);
  } while (!hash.startsWith('0'.repeat(difficulty)));
  
  return {
    id: uuidv4(),
    index,
    timestamp,
    transactions,
    previousHash,
    hash,
    nonce,
    difficulty,
    minerId: getDeviceId()
  };
}

// Firebase operations
export function addTransactionToFirebase(transaction: Transaction) {
  const transactionsRef = ref(database, 'pendingTransactions');
  return push(transactionsRef, transaction);
}

export function addBlockToFirebase(block: Block) {
  const blocksRef = ref(database, 'blocks');
  return push(blocksRef, block);
}

export function listenToBlockchainUpdates(callback: (blockchain: Blockchain) => void) {
  const blockchainRef = ref(database, '/');
  
  const unsubscribe = onValue(blockchainRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const blockchain: Blockchain = {
        blocks: data.blocks ? Object.values(data.blocks) : [],
        pendingTransactions: data.pendingTransactions ? Object.values(data.pendingTransactions) : [],
        difficulty: data.difficulty || 2
      };
      callback(blockchain);
    }
  });
  
  return () => off(blockchainRef, 'value', unsubscribe);
}

// Generate a unique device ID (persists across sessions)
export function getDeviceId(): string {
  let deviceId = localStorage.getItem('blockchain-device-id');
  if (!deviceId) {
    deviceId = `device-${uuidv4().slice(0, 8)}`;
    localStorage.setItem('blockchain-device-id', deviceId);
  }
  return deviceId;
}

// Generate a device name for display
export function getDeviceName(): string {
  let deviceName = localStorage.getItem('blockchain-device-name');
  if (!deviceName) {
    const names = ['Miner', 'Node', 'Validator', 'Blockchain', 'Crypto', 'Hash', 'Chain', 'Block'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomNum = Math.floor(Math.random() * 999) + 1;
    deviceName = `${randomName}-${randomNum}`;
    localStorage.setItem('blockchain-device-name', deviceName);
  }
  return deviceName;
}

// Generate random wallet addresses
export function generateWalletAddress(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '0x';
  for (let i = 0; i < 40; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Ensure the current device is registered with a wallet in Firebase
export async function registerCurrentDevice(): Promise<Device> {
  const id = getDeviceId();
  const name = getDeviceName();
  let wallet = localStorage.getItem('blockchain-device-wallet');
  if (!wallet) {
    wallet = generateWalletAddress();
    localStorage.setItem('blockchain-device-wallet', wallet);
  }

  const devicesRef = ref(database, 'devices');
  const snapshot = await get(child(devicesRef, id));
  if (!snapshot.exists()) {
    const device: Device = {
      id,
      name,
      walletAddress: wallet,
      createdAt: Date.now()
    };
    await set(child(devicesRef, id), device);
    return device;
  } else {
    const existing = snapshot.val() as Device;
    // Keep local wallet in sync if needed
    if (existing.walletAddress && existing.walletAddress !== wallet) {
      localStorage.setItem('blockchain-device-wallet', existing.walletAddress);
    }
    return existing;
  }
}

export function getCurrentDeviceWallet(): string {
  let wallet = localStorage.getItem('blockchain-device-wallet');
  if (!wallet) {
    wallet = generateWalletAddress();
    localStorage.setItem('blockchain-device-wallet', wallet);
  }
  return wallet;
}

export function listenToDevices(callback: (devices: Device[]) => void) {
  const devicesRef = ref(database, 'devices');
  const unsubscribe = onValue(devicesRef, (snapshot) => {
    const data = snapshot.val();
    const devices: Device[] = data ? Object.values(data) : [];
    callback(devices);
  });
  return () => off(devicesRef, 'value', unsubscribe);
}

