# Blockchain Traceability System

## Overview
A decentralized application (DApp) for tracking agricultural products using blockchain technology, smart contracts, and QR codes.

## Technology Stack
- Solidity (Smart Contracts)
- Hardhat (Development Framework)
- Node.js/Express (Backend)
- React.js (Frontend)
- Ethereum (Blockchain)

## Smart Contract Features
- Product Addition
- Status Updates
- QR Code Generation
- Product Tracking
- Ownership Verification

## Project Structure
```
blockchain-traceability/
├── blockchain/           # Smart contract & Hardhat files
│   ├── contracts/       # Solidity contracts
│   ├── scripts/         # Deployment scripts
│   └── hardhat.config.js
├── backend/             # Express.js server
│   ├── index.js
│   └── package.json
└── traceability-frontend/ # React frontend
    ├── src/
    └── package.json
```

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/krishnabandewar/blockchain-traceability.git
cd blockchain-traceability
```

### 2. Smart Contract Setup
```bash
cd blockchain
npm install
npx hardhat node
# In new terminal
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Backend Setup
```bash
cd backend
npm install
node index.js
```

### 4. Frontend Setup
```bash
cd traceability-frontend
npm install
npm start
```

## API Endpoints
- POST /add-product - Add new product
- GET /generate-qr/:id - Generate QR code
- GET /product-count - Get total products
- GET /admin/products - List all products
- POST /admin/update-status - Update product status

## Smart Contract Functions
```solidity
function addProduct(string memory _name, string memory _farmLocation, uint256 _harvestDate)
function updateStatus(uint256 _id, string memory _status)
function products(uint256) returns (string, string, uint256, string)
function productCount() returns (uint256)
```

## Live Demo
- Frontend: [https://blockchain-traceability.vercel.app](https://blockchain-traceability.vercel.app)
- Contract: [View on Sepolia](https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS)

## Development
1. Start local blockchain node
2. Deploy contracts to local network
3. Configure backend with contract address
4. Start backend server
5. Launch frontend application

## Testing
```bash
cd blockchain
npx hardhat test
```

## Deployment
1. Deploy contract to Sepolia:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```
2. Deploy backend to Railway
3. Deploy frontend to Vercel

## Author
Krishna Bandewar

## Repository
[https://github.com/krishnabandewar/blockchain-traceability](https://github.com/krishnabandewar/blockchain-traceability)

## License
MIT