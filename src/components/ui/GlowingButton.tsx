'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function GlowingButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  type = 'button'
}: GlowingButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}
      `}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
