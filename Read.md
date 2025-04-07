# Blockchain Traceability System

A decentralized application (DApp) for tracking agricultural products using blockchain technology, smart contracts, and QR codes.

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (Node Package Manager)
- Git

## Project Structure

```
blockchain-traceability/
├── blockchain/           # Smart contract & Hardhat configuration
├── backend/             # Express.js server
└── traceability-frontend/ # React frontend application
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd blockchain-traceability
```

### 2. Smart Contract Setup (Blockchain Directory)

```bash
cd blockchain
npm install
```

### 3. Backend Setup

```bash
cd ../backend
npm install
```

### 4. Frontend Setup

```bash
cd ../traceability-frontend
npm install
```

## Running the Application

### 1. Start Local Blockchain Network
First, start the Hardhat local network:
```bash
cd blockchain
npx hardhat node
```
Keep this terminal running.

### 2. Deploy Smart Contract
In a new terminal:
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```
Note: Save the deployed contract address that appears in the console.

### 3. Configure Backend
Update the contract address in `backend/index.js`:
```javascript
const contractAddress = '<YOUR_DEPLOYED_CONTRACT_ADDRESS>';
```

### 4. Start Backend Server
In a new terminal:
```bash
cd backend
node index.js
```
The backend will run on http://localhost:5000

### 5. Start Frontend Application
In a new terminal:
```bash
cd traceability-frontend
npm start
```
The frontend will run on http://localhost:3000

## Using the Application

### Home Page (http://localhost:3000)
- Add new products with name, farm location, and harvest date
- Generate QR codes for products
- Download generated QR codes

### Admin Dashboard (http://localhost:3000/admin)
- View all products
- Update product status (Harvested/Shipped/Delivered)
- Search products
- Export product data to CSV

## Smart Contract Functions

```solidity
function addProduct(string memory _name, string memory _farmLocation, uint256 _harvestDate) public
function updateStatus(uint256 _id, string memory _status) public
function products(uint256) public view returns (string memory name, string memory farmLocation, uint256 harvestDate, string memory status)
function productCount() public view returns (uint256)
```

## API Endpoints

- `POST /add-product`: Add a new product
- `GET /generate-qr/:id`: Generate QR code for a product
- `GET /product-count`: Get total number of products
- `GET /admin/products`: Get all products
- `POST /admin/update-status`: Update product status

## Troubleshooting

1. If the backend fails to connect:
   - Ensure Hardhat node is running
   - Verify contract address in backend configuration

2. If transactions fail:
   - Check if you're using the correct network in MetaMask
   - Ensure you have sufficient test ETH

3. If QR generation fails:
   - Verify product ID exists
   - Check backend console for specific errors

## Development Notes

- The smart contract is deployed on a local Hardhat network
- Test accounts are provided by Hardhat
- Default admin account private key is pre-configured
- Frontend uses React Router for navigation
- Backend uses Express.js and ethers.js