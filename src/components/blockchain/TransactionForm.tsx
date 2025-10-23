'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createTransaction, addTransactionToFirebase, generateWalletAddress } from '@/lib/blockchain';
import GlowingButton from '@/components/ui/GlowingButton';
import { Send, RefreshCw } from 'lucide-react';

export default function TransactionForm() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateAddress = (field: 'from' | 'to') => {
    const address = generateWalletAddress();
    if (field === 'from') {
      setFrom(address);
    } else {
      setTo(address);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !amount || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const transaction = createTransaction(from, to, parseFloat(amount));
      await addTransactionToFirebase(transaction);
      
      // Reset form
      setFrom('');
      setTo('');
      setAmount('');
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold text-white mb-4">Create New Transaction</h3>
      
      {/* From Address */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          From Address
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter sender address..."
            className="flex-1 px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGenerateAddress('from')}
            className="px-3 py-2 bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-lg text-blue-300 hover:bg-blue-500 hover:bg-opacity-30 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* To Address */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          To Address
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter recipient address..."
            className="flex-1 px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGenerateAddress('to')}
            className="px-3 py-2 bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-lg text-blue-300 hover:bg-blue-500 hover:bg-opacity-30 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Amount (BTC)
        </label>
        <input
          type="number"
          step="0.00000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00000000"
          className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <GlowingButton
        type="submit"
        disabled={!from || !to || !amount || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Creating Transaction...
          </motion.div>
        ) : (
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Transaction
          </div>
        )}
      </GlowingButton>
    </motion.form>
  );
}
