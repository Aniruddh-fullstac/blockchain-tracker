'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Info, X, Zap, Users, Shield, Link, Code } from 'lucide-react';

export default function InfoPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Proof of Work Mining",
      description: "Real computational work required to mine blocks. Each block must find a hash starting with '00' by incrementing the nonce value.",
      color: "text-yellow-400"
    },
    {
      icon: <Link className="w-6 h-6" />,
      title: "Hash Chaining",
      description: "Each block contains the hash of the previous block, creating an immutable chain. Tampering with any block breaks the entire chain.",
      color: "text-blue-400"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Device Consensus",
      description: "When multiple devices mine simultaneously, the first to find a valid hash wins. All devices accept the winning block and sync in real-time.",
      color: "text-green-400"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Cryptographic Security",
      description: "All transactions and blocks are cryptographically hashed. The blockchain is immutable and secure against tampering.",
      color: "text-purple-400"
    }
  ];

  return (
    <>
      {/* Info Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <Info className="w-6 h-6" />
      </motion.button>

      {/* Info Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-x-4 bottom-20 max-w-2xl mx-auto z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">🔗 How This Blockchain Works</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg"
                    >
                      <div className={`${feature.color} mt-1`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Multi-Device Explanation */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Multi-Device Mining
                  </h3>
                  <div className="text-gray-300 text-sm space-y-2">
                    <p>🌐 <strong>Deploy & Share:</strong> Open this app on multiple devices</p>
                    <p>⛏️ <strong>Competitive Mining:</strong> All devices mine simultaneously</p>
                    <p>🏆 <strong>Winner Takes All:</strong> First device to find valid hash wins</p>
                    <p>🔄 <strong>Real-Time Sync:</strong> All devices update instantly</p>
                    <p>🤝 <strong>Consensus:</strong> Everyone accepts the winning block</p>
                  </div>
                </div>

                {/* Smart Contract Details */}
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Smart Contract Integration
                  </h3>
                  <div className="text-gray-300 text-sm space-y-2">
                    <p>📜 <strong>Contract:</strong> Deployed on Ethereum Sepolia Testnet</p>
                    <p>🔗 <strong>Address:</strong> 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6</p>
                    <p>⚡ <strong>Language:</strong> Solidity (Production-ready)</p>
                    <p>🌐 <strong>Network:</strong> Decentralized Ethereum Network</p>
                    <p>🛡️ <strong>Security:</strong> Immutable on-chain transactions</p>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">🔧 Technical Implementation</h3>
                  <div className="text-gray-300 text-sm space-y-2">
                    <p><strong>Difficulty:</strong> 2 leading zeros (configurable)</p>
                    <p><strong>Hash Function:</strong> Custom cryptographic hashing</p>
                    <p><strong>Block Time:</strong> ~5 seconds (vs Bitcoin's 10 minutes)</p>
                    <p><strong>Database:</strong> Firebase Realtime Database</p>
                    <p><strong>Consensus:</strong> Proof of Work (simplified Bitcoin)</p>
                    <p><strong>Smart Contract:</strong> Solidity on Ethereum Sepolia</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
