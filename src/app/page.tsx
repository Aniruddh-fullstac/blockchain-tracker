'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Blockchain, listenToBlockchainUpdates, mineBlock, addBlockToFirebase } from '@/lib/blockchain';
import AnimatedCard from '@/components/ui/AnimatedCard';
import GlowingButton from '@/components/ui/GlowingButton';
import BlockVisualization from '@/components/blockchain/BlockVisualization';
import TransactionCard from '@/components/blockchain/TransactionCard';
import TransactionForm from '@/components/blockchain/TransactionForm';
import InfoPanel from '@/components/ui/InfoPanel';
import StatusIndicator from '@/components/ui/StatusIndicator';
import DeviceInfo from '@/components/ui/DeviceInfo';
import SmartContractStatus from '@/components/ui/SmartContractStatus';
import { 
  Activity, 
  Blocks, 
  Clock, 
  TrendingUp, 
  Zap,
  Play,
  Pause,
  Network
} from 'lucide-react';

export default function Home() {
  const [blockchain, setBlockchain] = useState<Blockchain>({
    blocks: [],
    pendingTransactions: [],
    difficulty: 2
  });
  const [isMining, setIsMining] = useState(false);
  const [autoMine, setAutoMine] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToBlockchainUpdates(setBlockchain);
    return unsubscribe;
  }, []);

  // Auto-mining effect
  useEffect(() => {
    if (!autoMine || blockchain.pendingTransactions.length === 0) return;

    const interval = setInterval(() => {
      if (blockchain.pendingTransactions.length > 0) {
        handleMineBlock();
      }
    }, 5000); // Mine every 5 seconds

    return () => clearInterval(interval);
  }, [autoMine, blockchain.pendingTransactions.length]);

  const handleMineBlock = async () => {
    if (blockchain.pendingTransactions.length === 0 || isMining) return;

    setIsMining(true);
    try {
      const transactions = blockchain.pendingTransactions.slice(0, 3); // Take up to 3 transactions
      const previousHash = blockchain.blocks.length > 0 
        ? blockchain.blocks[blockchain.blocks.length - 1].hash 
        : '0';
      
      const newBlock = mineBlock(transactions, previousHash, blockchain.blocks.length);
      await addBlockToFirebase(newBlock);
    } catch (error) {
      console.error('Error mining block:', error);
    } finally {
      setIsMining(false);
    }
  };


  const totalTransactions = blockchain.blocks.reduce((sum, block) => sum + block.transactions.length, 0);
  const totalValue = blockchain.blocks.reduce((sum, block) => 
    sum + block.transactions.reduce((blockSum, tx) => blockSum + tx.amount, 0), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 bg-opacity-20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 bg-opacity-20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Blockchain Tracker
          </h1>
          <p className="text-xl text-gray-300">
            Real-time blockchain visualization with beautiful animations
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <AnimatedCard delay={0.1}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg">
                <Blocks className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{blockchain.blocks.length}</div>
                <div className="text-sm text-gray-300">Total Blocks</div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalTransactions}</div>
                <div className="text-sm text-gray-300">Transactions</div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 bg-opacity-20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{blockchain.pendingTransactions.length}</div>
                <div className="text-sm text-gray-300">Pending</div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalValue.toFixed(4)}</div>
                <div className="text-sm text-gray-300">Total BTC</div>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Blockchain Network Status */}
        <AnimatedCard delay={0.5} className="mb-8 bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-green-400" />
              Blockchain Network Status
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Ethereum Sepolia</div>
              <div className="text-sm text-gray-400">Test Network</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">0x742d35...8b6</div>
              <div className="text-sm text-gray-400">Smart Contract</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">PoW</div>
              <div className="text-sm text-gray-400">Consensus Algorithm</div>
            </div>
          </div>
        </AnimatedCard>

        {/* Mining Controls */}
        <AnimatedCard delay={0.6} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Mining Controls</h3>
              <p className="text-gray-300">Control the blockchain mining process</p>
            </div>
            <div className="flex gap-4">
              <GlowingButton
                onClick={() => setAutoMine(!autoMine)}
                variant={autoMine ? 'secondary' : 'primary'}
                className="flex items-center gap-2"
              >
                {autoMine ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {autoMine ? 'Stop Auto-Mine' : 'Start Auto-Mine'}
              </GlowingButton>
              <GlowingButton
                onClick={handleMineBlock}
                disabled={blockchain.pendingTransactions.length === 0 || isMining}
                className="flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {isMining ? 'Mining...' : 'Mine Block'}
              </GlowingButton>
            </div>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction Form */}
          <AnimatedCard delay={0.6}>
            <TransactionForm />
          </AnimatedCard>

          {/* Pending Transactions */}
          <AnimatedCard delay={0.7}>
            <h3 className="text-xl font-bold text-white mb-4">Pending Transactions</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {blockchain.pendingTransactions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No pending transactions
                </div>
              ) : (
                blockchain.pendingTransactions.map((transaction, index) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                  />
                ))
              )}
            </div>
          </AnimatedCard>
        </div>

        {/* Blockchain Visualization */}
        <AnimatedCard delay={0.8} className="mt-8">
          <h3 className="text-xl font-bold text-white mb-6">Blockchain</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {blockchain.blocks.length === 0 ? (
              <div className="text-center py-12 text-gray-400 w-full">
                No blocks mined yet. Create a transaction and mine a block to get started!
              </div>
            ) : (
              blockchain.blocks.map((block, index) => (
                <BlockVisualization
                  key={block.id}
                  block={block}
                  index={index}
                  isLatest={index === blockchain.blocks.length - 1}
                />
              ))
            )}
          </div>
        </AnimatedCard>
      </div>

      {/* Device Info */}
      <DeviceInfo />

      {/* Status Indicator */}
      <StatusIndicator 
        isMining={isMining}
        autoMine={autoMine}
        pendingCount={blockchain.pendingTransactions.length}
        blockCount={blockchain.blocks.length}
      />

      {/* Smart Contract Status */}
      <SmartContractStatus />

      {/* Info Panel */}
      <InfoPanel />
    </div>
  );
}