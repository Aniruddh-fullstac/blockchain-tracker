# 🚀 Blockchain Tracker

A beautiful, real-time blockchain visualization application built with Next.js, Firebase, and Framer Motion. Watch blockchain transactions and mining in action with stunning animations!

## ✨ Features

- **Real-time Blockchain Visualization**: Watch blocks being mined and transactions being processed in real-time
- **Beautiful Animations**: Smooth, engaging animations powered by Framer Motion
- **Interactive Mining**: Control the mining process with manual and auto-mining options
- **Transaction Creation**: Create new transactions with generated wallet addresses
- **Responsive Design**: Beautiful UI that works on all devices
- **Firebase Integration**: Real-time data synchronization across all clients

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Firebase Realtime Database
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with Realtime Database enabled

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blockchain-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Realtime Database
   - Copy your Firebase config to `src/lib/firebase.ts`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How to Use

1. **Create Transactions**: Use the transaction form to create new transactions
2. **Generate Addresses**: Click the refresh button to generate random wallet addresses
3. **Mine Blocks**: Use the "Mine Block" button to manually mine blocks or enable auto-mining
4. **Watch the Blockchain**: See your transactions being added to blocks in real-time
5. **Real-time Updates**: All changes are synchronized across all connected clients

## 🔧 Blockchain Implementation

This project implements a simplified blockchain with:

- **Transactions**: From/to addresses, amounts, timestamps, and hashes
- **Blocks**: Index, timestamp, transactions, previous hash, nonce, and difficulty
- **Mining**: Simple proof-of-work algorithm with configurable difficulty
- **Hashing**: Custom hash function for demonstration purposes

## 🎨 Design Features

- **Glass Morphism**: Beautiful glass-like cards with backdrop blur
- **Gradient Backgrounds**: Dynamic gradient backgrounds with animated elements
- **Smooth Animations**: Framer Motion animations for all interactions
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Dark Theme**: Modern dark theme with vibrant accent colors

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click!

The app is configured for Vercel deployment with the included `vercel.json` file.

## 📱 Screenshots

The app features:
- Real-time blockchain visualization
- Interactive transaction creation
- Beautiful animated blocks and transactions
- Responsive design for all devices
- Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Powered by [Firebase](https://firebase.google.com/)
- Deployed on [Vercel](https://vercel.com/)