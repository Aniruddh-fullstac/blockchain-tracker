'use client';

import { motion } from 'framer-motion';
import { Block } from '@/lib/blockchain';
import { CheckCircle, Clock, Hash, User } from 'lucide-react';

interface BlockVisualizationProps {
  block: Block;
  index: number;
  isLatest?: boolean;
}

export default function BlockVisualization({ block, index, isLatest = false }: BlockVisualizationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Connection line to next block */}
      {!isLatest && (
        <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 z-10" />
      )}
      
      <div className={`
        relative bg-gradient-to-br from-blue-500 from-opacity-20 to-purple-600 to-opacity-20 
        border-2 border-blue-400 border-opacity-30 rounded-xl p-4 min-w-[300px]
        ${isLatest ? 'ring-2 ring-green-400 ring-opacity-50 shadow-lg shadow-green-400 shadow-opacity-20' : ''}
      `}>
        {/* Block header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-white">Block #{block.index}</span>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6"
          >
            <CheckCircle className="w-6 h-6 text-green-400" />
          </motion.div>
        </div>

        {/* Block hash */}
        <div className="mb-3">
          <div className="text-xs text-gray-300 mb-1">Hash:</div>
          <div className="font-mono text-sm text-blue-300 break-all">
            {block.hash}
          </div>
        </div>

        {/* Previous hash */}
        <div className="mb-3">
          <div className="text-xs text-gray-300 mb-1">Previous Hash:</div>
          <div className="font-mono text-sm text-purple-300 break-all">
            {block.previousHash || 'Genesis Block'}
          </div>
        </div>

        {/* Block details */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div>
            <span className="text-gray-300">Nonce:</span>
            <div className="text-white font-mono">{block.nonce}</div>
          </div>
          <div>
            <span className="text-gray-300">Difficulty:</span>
            <div className="text-white">{block.difficulty}</div>
          </div>
        </div>

        {/* Miner info */}
        {block.minerId && (
          <div className="mb-3 p-2 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-300">Mined by:</span>
            </div>
            <div className="text-xs font-mono text-yellow-300">
              {block.minerId}
            </div>
          </div>
        )}

        {/* Transactions count */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-300">
            {block.transactions.length} transaction{block.transactions.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Mining animation for latest block */}
        {isLatest && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white via-opacity-10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  );
}
