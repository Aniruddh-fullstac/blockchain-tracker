'use client';

import { motion } from 'framer-motion';
import { Transaction } from '@/lib/blockchain';
import { ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  index: number;
}

export default function TransactionCard({ transaction, index }: TransactionCardProps) {
  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'confirmed':
        return 'border-green-400 border-opacity-30 bg-green-500 bg-opacity-10';
      case 'pending':
        return 'border-yellow-400 border-opacity-30 bg-yellow-500 bg-opacity-10';
      case 'failed':
        return 'border-red-400 border-opacity-30 bg-red-500 bg-opacity-10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`
        border rounded-lg p-4 backdrop-blur-sm
        ${getStatusColor()}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-semibold capitalize text-white">
            {transaction.status}
          </span>
        </div>
        <div className="text-xs text-gray-400">
          {new Date(transaction.timestamp).toLocaleTimeString()}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <div className="text-xs text-gray-300 mb-1">From:</div>
          <div className="font-mono text-sm text-blue-300 truncate">
            {transaction.from}
          </div>
        </div>
        
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="mx-4"
        >
          <ArrowRight className="w-5 h-5 text-purple-400" />
        </motion.div>
        
        <div className="flex-1">
          <div className="text-xs text-gray-300 mb-1">To:</div>
          <div className="font-mono text-sm text-green-300 truncate">
            {transaction.to}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-300">Amount:</div>
          <div className="text-lg font-bold text-white">
            {transaction.amount} BTC
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Hash:</div>
          <div className="font-mono text-xs text-gray-400 truncate max-w-[120px]">
            {transaction.hash}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
