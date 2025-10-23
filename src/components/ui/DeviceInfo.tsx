'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getDeviceId, getDeviceName } from '@/lib/blockchain';
import { Smartphone, Users, Hash } from 'lucide-react';

export default function DeviceInfo() {
  const [deviceId, setDeviceId] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setDeviceId(getDeviceId());
    setDeviceName(getDeviceName());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-auto sm:max-w-sm z-30"
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
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Your Device</h3>
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
        </motion.button>

        {/* Device Details */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Name:</span>
                <span className="text-sm font-medium text-white">{deviceName}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">ID:</span>
                <span className="text-xs font-mono text-gray-400">{deviceId}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-700">
              <div className="text-xs text-gray-400">
                This device will be identified when mining blocks and creating transactions
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
