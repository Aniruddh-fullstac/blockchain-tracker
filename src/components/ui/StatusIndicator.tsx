'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Users, Clock, CheckCircle } from 'lucide-react';

interface StatusIndicatorProps {
  isMining: boolean;
  autoMine: boolean;
  pendingCount: number;
  blockCount: number;
}

export default function StatusIndicator({ isMining, autoMine, pendingCount, blockCount }: StatusIndicatorProps) {
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('Ready to mine');

  useEffect(() => {
    if (isMining) {
      setStatus('mining');
      setStatusMessage('Mining block...');
    } else if (autoMine && pendingCount > 0) {
      setStatus('auto-mining');
      setStatusMessage('Auto-mining active');
    } else if (pendingCount > 0) {
      setStatus('pending');
      setStatusMessage(`${pendingCount} transactions pending`);
    } else if (blockCount > 0) {
      setStatus('ready');
      setStatusMessage('Blockchain active');
    } else {
      setStatus('idle');
      setStatusMessage('Ready to mine');
    }
  }, [isMining, autoMine, pendingCount, blockCount]);

  const getStatusColor = () => {
    switch (status) {
      case 'mining':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'auto-mining':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'pending':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'ready':
        return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'mining':
        return <Zap className="w-4 h-4" />;
      case 'auto-mining':
        return <Users className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'ready':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30 max-w-xs"
    >
      <div className={`
        flex items-center gap-3 px-4 py-2 rounded-lg border backdrop-blur-lg
        ${getStatusColor()}
      `}>
        <motion.div
          animate={status === 'mining' ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: status === 'mining' ? Infinity : 0, ease: "linear" }}
        >
          {getStatusIcon()}
        </motion.div>
        <div>
          <div className="text-sm font-medium">{statusMessage}</div>
          <div className="text-xs opacity-75">
            {blockCount} blocks • {pendingCount} pending
          </div>
        </div>
      </div>
    </motion.div>
  );
}
