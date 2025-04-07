const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const { ethers } = require('ethers');
const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from the React frontend
}));
app.use(express.json());

// Connect to the local Hardhat network
const provider = new ethers.JsonRpcProvider('http://localhost:8545');

// Use Hardhat Account #0's private key for signing transactions (for write operations)
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const wallet = new ethers.Wallet(privateKey, provider);

// Deployed contract address
const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

// ABI (Application Binary Interface) of the contract
const abi = [
    'function addProduct(string memory _name, string memory _farmLocation, uint256 _harvestDate) public',
    'function updateStatus(uint256 _id, string memory _status) public',
    'function products(uint256) public view returns (string memory name, string memory farmLocation, uint256 harvestDate, string memory status)',
    'function productCount() public view returns (uint256)',
];

// Create a contract instance with the wallet (for transactions)
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Add product (transaction)
app.post('/add-product', async (req, res) => {
    const { name, farmLocation, harvestDate } = req.body;
    try {
        const tx = await contract.addProduct(name, farmLocation, BigInt(harvestDate));
        await tx.wait();
        res.json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Add Product Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Generate QR code (call)
app.get('/generate-qr/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const contractWithProvider = new ethers.Contract(contractAddress, abi, provider);
        const product = await contractWithProvider.products(productId);
        // Convert BigInt to string for JSON serialization
        const formattedProduct = {
            name: product[0],
            farmLocation: product[1],
            harvestDate: product[2].toString(), // Convert BigInt to string
            status: product[3]
        };
        const qrData = JSON.stringify(formattedProduct);
        const qrCode = await QRCode.toDataURL(qrData);
        res.send({ qrCode });
    } catch (error) {
        console.error('Generate QR Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get product count (for dynamic QR generation or admin use)
app.get('/product-count', async (req, res) => {
    try {
        const contractWithProvider = new ethers.Contract(contractAddress, abi, provider);
        const count = await contractWithProvider.productCount();
        res.json({ count: count.toString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin endpoint to get all products
app.get('/admin/products', async (req, res) => {
    try {
        const contractWithProvider = new ethers.Contract(contractAddress, abi, provider);
        const count = await contractWithProvider.productCount();
        const products = [];

        // Loop through all product IDs from 1 to count
        for (let id = 1; id <= parseInt(count.toString()); id++) {
            const product = await contractWithProvider.products(id);
            products.push({
                id: id,
                name: product[0],
                farmLocation: product[1],
                harvestDate: product[2].toString(), // Convert BigInt to string
                status: product[3]
            });
        }

        res.json({ products });
    } catch (error) {
        console.error('Admin Products Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});