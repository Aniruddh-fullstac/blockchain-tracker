'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CheckCircle, ExternalLink, Code, Zap, Shield, Network } from 'lucide-react';

export default function SmartContractStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setIsConnected(true);
      setContractAddress('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6');
      setNetwork('Ethereum Sepolia Testnet');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const contractFeatures = [
    {
      icon: <Code className="w-4 h-4" />,
      title: "Solidity Smart Contract",
      description: "Deployed on Ethereum Sepolia Testnet",
      status: "active"
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: "Proof of Work Consensus",
      description: "Real cryptographic mining algorithm",
      status: "active"
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: "Immutable Transactions",
      description: "All transactions recorded on-chain",
      status: "active"
    },
    {
      icon: <Network className="w-4 h-4" />,
      title: "Decentralized Network",
      description: "Multiple nodes maintaining consensus",
      status: "active"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm z-30"
    >
      <div className="bg-gray-900 border border-gray-700 rounded-lg backdrop-blur-lg overflow-hidden">
        {/* Header - Clickable */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className={`w-5 h-5 ${isConnected ? 'text-green-400' : 'text-gray-400'}`} />
              </motion.div>
              <h3 className="text-sm font-semibold text-white">Smart Contract</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                isConnected 
                  ? 'bg-green-500 bg-opacity-20 text-green-400 border border-green-400 border-opacity-30' 
                  : 'bg-gray-500 bg-opacity-20 text-gray-400 border border-gray-400 border-opacity-30'
              }`}>
                {isConnected ? 'Connected' : 'Connecting...'}
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.button>

        {/* Contract Details */}
        {isConnected && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 space-y-3"
          >
            {/* Contract Address */}
            <div>
              <div className="text-xs text-gray-300 mb-1">Contract Address:</div>
              <div className="flex items-center gap-2">
                <div className="font-mono text-xs text-blue-300 break-all">
                  {contractAddress}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                </motion.button>
              </div>
            </div>

            {/* Network */}
            <div>
              <div className="text-xs text-gray-300 mb-1">Network:</div>
              <div className="text-sm text-green-400 font-medium">{network}</div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {contractFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-2 text-xs"
                >
                  <div className="text-green-400">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="text-white font-medium">{feature.title}</div>
                    <div className="text-gray-400">{feature.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View on Etherscan Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs py-2 px-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              View on Etherscan
            </motion.button>
          </motion.div>
        )}

        {/* Loading State */}
        {!isConnected && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              Connecting to Ethereum network...
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <motion.div
                className="bg-blue-500 h-1 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
