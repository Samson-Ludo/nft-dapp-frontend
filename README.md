# NFT DApp

## Overview
This project is a decentralized application (DApp) that allows users to interact with the Ethereum blockchain. Users can connect their Ethereum wallet (e.g., MetaMask), view their owned NFTs, mint new NFTs by interacting with a smart contract, and transfer NFTs to other addresses. The application is built with Vue.js for the front end, with blockchain interaction facilitated using `ethers.js`.

## Technologies Used
- **Vue.js**: For building the front-end user interface.
- **Tailwind CSS**: For styling and responsive design.
- **JavaScript**: Core scripting language for front-end logic.
- **ethers.js**: For blockchain interaction, including wallet connection, transaction signing, and smart contract interaction.
- **MetaMask**: Used to connect to the user's Ethereum wallet.
- **Netlify**: For deploying the front-end of the DApp.

## Application Architecture
1. **Front-End**: Built using Vue.js and styled with Tailwind CSS, the front-end allows users to interact with their wallet, view their NFTs, and perform minting/transfer actions.
2. **Blockchain Interaction**: The front-end communicates with Ethereum through the `ethers.js` library, enabling wallet connections, contract interaction, and transactions.
3. **Smart Contract**: The app interacts with an ERC-721 (NFT) smart contract deployed on Ethereum, enabling users to mint and transfer tokens.
4. **API Calls**: Optional external API (e.g., OpenSea) can be used to fetch NFTs owned by the user.

## Assumptions & Decisions
- **Ethereum Blockchain**: The application uses the Ethereum Sepolia Testnet for development. In production, this can be switched to Ethereum Mainnet or another network.
- **Smart Contract**: Assumes an ERC-721 compatible contract is deployed and available for minting and transferring NFTs.
- **MetaMask**: Assumes MetaMask is installed in the user's browser for wallet interaction.
- **NFT Gallery**: For displaying owned NFTs, an external API such as OpenSea is used. However, users can also directly fetch NFTs from the blockchain by interacting with the contract.
- **Deployment**: The front-end is deployed using Netlify, while the smart contract deployment is handled separately.

## Setup Instructions
Follow these steps to set up and run the application locally.

### Prerequisites
- Node.js (v14 or above)
- MetaMask browser extension
- Ethereum Sepolia Testnet wallet with some ETH (for testing)
- Access to a deployed ERC-721 smart contract on the Sepolia Testnet

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Samson-Ludo/nft-dapp-frontend.git
   cd nft-dapp-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the project root directory and add your contract address:
   ```bash
   VITE_CONTRACT_ADDRESS=your_contract_address
   ```

4. **Run the Application**
   Start the development server using:
   ```bash
   npm run dev
   ```

5. **Open the App**
   Visit `http://localhost:3000` in your browser, where you can connect your MetaMask wallet and interact with the app.

### Deployment Instructions

#### 1. **Deploy to GitHub**
   - Push your code to a GitHub repository:
     ```bash
     git add .
     git commit -m "Initial commit"
     git push origin main
     ```
   - Ensure that your repository has a `README.md`, `.gitignore`, and other necessary files.

#### 2. **Deploy to Netlify**
   - Go to [Netlify](https://www.netlify.com/).
   - Connect your GitHub repository.
   - In the deployment settings, specify the following build settings:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
   - Click **Deploy** to deploy your DApp.

#### 3. **Environment Variables on Netlify**
   - In your Netlify dashboard, go to **Site Settings > Build & Deploy > Environment**.
   - Add the `VITE_CONTRACT_ADDRESS` environment variable and set it to your smart contract address.

### Notes on Deployment
- The front-end is deployed to Netlify and can be easily accessed via the provided Netlify URL.
- The Ethereum contract should be deployed separately on a compatible blockchain network (e.g., Sepolia Testnet).
- MetaMask should be configured to use the correct network (Sepolia for testing).

## Assumptions & Decisions
- **MetaMask** is required for wallet integration.
- **Sepolia Testnet** is used for testing, but you can switch to Ethereum Mainnet for production.
- **OpenSea API** or any other API can be used to fetch owned NFTs, though direct smart contract interaction is possible.

## Future Improvements
- Add error handling for transaction failures.
- Support multiple wallet providers (e.g., WalletConnect).
- Improve NFT gallery UI and add pagination.
