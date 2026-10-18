<div align="center">

# Blockchain Tracker

### A live, multi-device blockchain you can see, mine, and follow in real time.

Watch transactions enter the mempool, compete to mine the next block, and see every connected device agree on the same chain.

[Features](#features) · [How it works](#how-it-works) · [Device identity](#device-identity) · [Mining flow](#mining-flow) · [Quick start](#quick-start)

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-627EEA?style=for-the-badge&logo=ethereum&logoColor=white)](https://sepolia.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## The idea

Blockchain Tracker is a production-style blockchain application. You create transfers between wallet addresses, those transfers sit in a shared pending pool, and devices on the network race to seal them into the next block with proof of work.

The chain is hash-linked. Each block carries an index, a timestamp, its transactions, the previous block hash, a nonce, and a difficulty target. The first device to produce a valid hash writes the block. Every other client receives it at once and extends the same chain.

The interface is built for demonstration and daily use: live counters, a scrolling block timeline, mining controls, device identity, and smart-contract status for the Ethereum Sepolia deployment.

<div align="center">

| | | |
| :---: | :---: | :---: |
| **Create** | **Mine** | **Agree** |
| Send value between wallets | Proof of work, two leading zeros | One chain across every device |

</div>

---

## Features

### Transactions

- Compose a transfer with sender, receiver, and amount.
- Generate wallet addresses in one click.
- Each transaction receives an id, a timestamp, a hash, and a `pending` status.
- The device that created it is recorded, so you can see who submitted the transfer.

### Mining

- **Mine Block** seals up to three pending transactions into the next block.
- **Auto-mine** retries every five seconds while the pool is not empty.
- Proof of work increments a nonce until the block hash satisfies the difficulty target.
- The winning device is stored as the miner on that block.

### Shared network

- Firebase Realtime Database is the live ledger every client reads and writes.
- Open the app on a phone, a laptop, and a second browser. They share pending transactions, blocks, and device records.
- Each browser keeps a stable device id, a display name, and a wallet address.

### Interface

- Live stats: block count, confirmed transactions, pending count, and total value.
- Network status for Ethereum Sepolia, the contract address, and proof-of-work consensus.
- Animated block cards in a horizontal chain, with the latest block marked.
- Collapsible device panel and smart-contract panel, sized for desktop and mobile.
- Motion throughout the page, with a dark, high-contrast layout.

### Smart contract

| | |
| --- | --- |
| **Address** | `0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6` |
| **Network** | Ethereum Sepolia testnet |
| **Consensus** | Proof of work |
| **Role** | Immutable transaction handling and network agreement |

The status panel reports connection, contract address, network, and the active capabilities of the deployment: on-chain recording, proof of work, and a decentralized set of nodes.

---

## How it works

```text
  You                    Network                         Chain
  ────                   ───────                         ─────

  Create transfer   →    Pending pool (all devices)
                              │
                              ▼
  Mine / auto-mine  →    Proof of work (nonce loop)
                              │
                              ▼
  First valid hash  →    New block linked to previous hash
                              │
                              ▼
  Every client      ←    Same blocks, same order, live
```

1. **Join.** On first load the app registers this device: a persistent id, a name such as `Miner-42`, and a wallet. The record is stored under `devices`.
2. **Transact.** A new transfer is hashed from sender, receiver, amount, and time, then pushed to `pendingTransactions`. Every open session sees it.
3. **Mine.** The client takes up to three pending transfers, sets `previousHash` to the tip of the chain (or `0` for the genesis block), and searches for a nonce whose hash begins with the required zeros. Difficulty is `2`.
4. **Commit.** The block — index, timestamp, transactions, previous hash, hash, nonce, difficulty, miner — is written to `blocks`. Listeners rebuild the chain immediately.
5. **Repeat.** Auto-mine keeps the pipeline moving. Manual mine lets you step through one block at a time.

A block is valid when its hash meets the difficulty target and its `previousHash` matches the block before it. Changing an earlier block breaks every hash that follows.

---

## Device identity

Every browser that opens Blockchain Tracker becomes a named node. Identity is created once, stored on the device, and registered on the shared network so transactions and blocks can be attributed to a real participant.

Three pieces make a device:

| Piece | Example | Where it lives | When it is created |
| --- | --- | --- | --- |
| **Device id** | `device-a1b2c3d4` | `localStorage` key `blockchain-device-id` | First visit, then reused forever in that browser |
| **Display name** | `Miner-417` | `localStorage` key `blockchain-device-name` | First visit, picked from a name list plus a number |
| **Wallet** | `0x` + 40 characters | `localStorage` key `blockchain-device-wallet` | First registration, unless the network already has one |

The id is the permanent key. The name is what people read. The wallet is the address attached to that node.

### How the device id is created

```text
                         Open the app
                              │
                              ▼
              Read localStorage["blockchain-device-id"]
                              │
              ┌───────────────┴───────────────┐
              │                               │
         already set                     missing
              │                               │
              │                               ▼
              │                    uuid v4  →  xxxxxxxx-xxxx-...
              │                               │
              │                               ▼
              │                    keep the first 8 hex characters
              │                               │
              │                               ▼
              │                    id = "device-" + those 8 characters
              │                               │
              │                               ▼
              │                    write it back to localStorage
              │                               │
              └───────────────┬───────────────┘
                              ▼
                    return the same id
              on every later page load
```

`getDeviceId()` never mints a second id while that key exists. Refreshing the tab, closing the laptop, or coming back tomorrow returns the same string. A new id appears only when storage is empty: a different browser, a private window, a cleared site data store, or another phone.

The id format is deliberate and short enough to show in the device panel:

```text
device-  +  first 8 characters of a UUID v4
────────     ─────────────────────────────────
prefix       example: a1b2c3d4

full id      device-a1b2c3d4
```

UUID v4 is random. Taking eight characters keeps the label readable in the UI and in Firebase paths, while the `device-` prefix marks it as a node id rather than a wallet or a block hash.

### How the name is created

```text
        localStorage["blockchain-device-name"]
                         │
            ┌────────────┴────────────┐
            │                         │
       already set                missing
            │                         │
            │                         ▼
            │              pick one word at random
            │              Miner · Node · Validator · Blockchain
            │              Crypto · Hash · Chain · Block
            │                         │
            │                         ▼
            │              append "-" and a number from 1 to 999
            │                         │
            │                         ▼
            │              example:  Validator-88
            │                         │
            └────────────┬────────────┘
                         ▼
                  show it in Your Device
```

The name does not change on its own. It stays with the browser that created it, next to the id.

### How the wallet is created

```text
   localStorage["blockchain-device-wallet"]
                    │
         ┌──────────┴──────────┐
         │                     │
    already set             missing
         │                     │
         │                     ▼
         │            start with "0x"
         │                     │
         │                     ▼
         │            append 40 random characters
         │            A–Z, a–z, 0–9
         │                     │
         │                     ▼
         │            save the address locally
         │                     │
         └──────────┬──────────┘
                    ▼
            wallet ready for this device
```

### Registration on the network

After the three local values exist, `registerCurrentDevice()` publishes the node. The device id is the Firebase key, so the same browser updates one record instead of spawning duplicates.

```text
  Browser                              Firebase  /devices
  ───────                              ──────────────────

  id, name, wallet
        │
        ▼
  get /devices/{id}
        │
        ├──── record missing ───►  write
        │                          {
        │                            id,
        │                            name,
        │                            walletAddress,
        │                            createdAt
        │                          }
        │
        └──── record exists ───►  keep the network wallet
                                  if it differs, copy it
                                  back into localStorage
```

Other clients subscribe to `/devices` and receive the full list whenever a node joins or its record changes.

### Where the id shows up later

The same id is stamped onto work this browser produces, so the chain can say who submitted a transfer and who mined a block.

```text
        device-a1b2c3d4
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
   Your Device panel    transaction.deviceId    block.minerId
   name + id            who created it          who found the hash
```

Clearing site data for this origin drops the local id, name, and wallet. The next visit runs the creation flow again and registers a new node. The old Firebase record remains as history of the previous device.

---

## Mining flow

When you press **Mine Block**, or when auto-mine fires, this device turns pending transfers into the next link in the chain.

```text
  pendingTransactions.length == 0 ?     stop
                 │
                 ▼ no
  already mining?                       stop
                 │
                 ▼ no
  take the first 3 pending transactions
                 │
                 ▼
  previousHash = tip.hash   or   "0" if the chain is empty
  index        = current block count
  difficulty   = 2
  nonce        = 0
                 │
                 ▼
        ┌────────────────────┐
        │ nonce = nonce + 1  │
        │ hash  = H(index,   │
        │          time,     │
        │          prev,     │
        │          nonce)    │
        └─────────┬──────────┘
                  │
                  ▼
        hash starts with "00" ?
              │           │
             no          yes
              │           │
              └── loop    ▼
                      write block
                      id, index, time,
                      transactions,
                      previousHash, hash,
                      nonce, difficulty,
                      minerId = this device
                              │
                              ▼
                      push to /blocks
                              │
                              ▼
                      every listener redraws
                      the chain, latest block lit
```

Auto-mine wraps that path in a five-second interval. It only runs while auto-mine is on and the pending pool is not empty. A manual mine and an in-progress mine will not overlap: `isMining` blocks a second attempt until the current one finishes.

```text
  Start Auto-Mine
        │
        ▼
  every 5 seconds
        │
        ├── pool empty ──────────────► wait
        │
        └── pool has transfers ──────► Mine Block flow above
                                              │
                                              ▼
                                       Stop Auto-Mine
                                       clears the interval
```

---

## Multi-device agreement

```text
   Phone                  Laptop                 Second browser
   device-91ab22c0        device-c0ffee12        device-44d19a07
        │                      │                       │
        └──────────┬───────────┴───────────┬───────────┘
                   ▼                       ▼
            /pendingTransactions         /blocks
                   │                       │
                   └───────────┬───────────┘
                               ▼
                    one shared chain on screen
                    miner id shows who won
```

---

## Architecture

```text
┌─────────────────────────────────────────────────────────┐
│  Browser                                                │
│  Next.js 16  ·  React 19  ·  TypeScript                 │
│                                                         │
│  page.tsx          stats, mining, chain view           │
│  TransactionForm   create transfers                     │
│  BlockVisualization   linked blocks                     │
│  DeviceInfo · SmartContractStatus · StatusIndicator    │
└───────────────────────────┬─────────────────────────────┘
                            │  live listeners
                            ▼
┌─────────────────────────────────────────────────────────┐
│  Firebase Realtime Database                            │
│  /blocks   /pendingTransactions   /devices             │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  Ethereum Sepolia                                       │
│  Contract  0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6   │
└─────────────────────────────────────────────────────────┘
```

| Layer | Choice |
| --- | --- |
| App | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Icons | Lucide |
| Sync | Firebase Realtime Database |
| Chain | Proof of work, hash-linked blocks, difficulty 2 |
| Contract | Solidity on Ethereum Sepolia |
| Hosting | Vercel (`vercel.json`) |

Core types and chain logic live in `src/lib/blockchain.ts`. The home screen is `src/app/page.tsx`.

---

## Quick start

**Requirements:** Node.js 18+, npm, and a Firebase project with Realtime Database enabled.

```bash
git clone <your-repo-url>
cd blockchain-tracker
npm install
```

1. Create a Firebase project and turn on Realtime Database.
2. Put your Firebase config in `src/lib/firebase.ts`.
3. Import `firebase-database-structure.json` if you want a starting dataset.
4. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Use it

1. Generate wallet addresses and submit a transaction.
2. Watch it appear under **Pending Transactions** on every connected device.
3. Press **Mine Block**, or **Start Auto-Mine** to seal a block about every five seconds.
4. Follow the new block on the chain. The latest block is highlighted, and the miner is the device that found the hash.

Open a second window or a phone on the same database. Create a transaction on one and mine it on the other. Both views stay aligned.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Deploy

The repo includes `vercel.json` (API timeout tuned for the app).

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add the same Firebase configuration the app expects.
4. Deploy.

After deploy, confirm database rules allow the clients you intend to sync, then open the live URL on two devices and run a mine.

More detail: `FIREBASE_SETUP.md`, `DEPLOYMENT.md`, `BLOCKCHAIN_EXPLANATION.md`, `SMART_CONTRACT_INTEGRATION.md`, `MULTI_DEVICE_EXPLANATION.md`, `PROJECT_OVERVIEW.md`.

---

## Project layout

```text
blockchain-tracker/
├── src/
│   ├── app/                  # layout and home page
│   ├── components/
│   │   ├── blockchain/       # transactions and block cards
│   │   └── ui/               # status, device, contract, panels
│   └── lib/
│       ├── blockchain.ts     # chain, mining, Firebase sync
│       └── firebase.ts       # Firebase client
├── firebase-database-structure.json
├── vercel.json
└── package.json
```

---

## License

MIT. See [LICENSE](LICENSE).

<div align="center">

Built with Next.js, Tailwind CSS, Framer Motion, Firebase, and Ethereum Sepolia.

</div>
