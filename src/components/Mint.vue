<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col items-center">
    <h1 class="mb-4 text-2xl">Mint New NFT</h1>
    <input
      type="file"
      @change="handleFileUpload"
      placeholder="Select file"
      class="px-4 py-2 mb-4 border rounded-lg"
    />
    <button
      @click="mintNFT"
      class="px-6 py-3 text-white bg-green-500 rounded-lg"
    >
      Mint NFT
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { ethers } from "ethers";
import contractABI from "@/../ContractABI.json";

export default {
  data() {
    return {
      selectedFile: null,
      metadataUrl: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async mintNFT() {
      const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS

      if (!this.selectedFile) {
        alert("Please select a file!");
        return;
      }

      const backendUrl = process.env.VUE_APP_BACKEND_URL;

      try {
        // Step 1: Upload the file to the backend (which uploads it to Pinata/IPFS)
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        const response = await axios.post(`${backendUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const ipfsHash = response.data.IpfsHash;
        this.metadataUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

        // Step 2: Mint the NFT by interacting with the smart contract
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log({ contract });

        const transaction = await contract.mintNFT(this.metadataUrl);
        await transaction.wait();
        console.log({ transaction });
        alert("NFT successfully minted!");
      } catch (error) {
        console.error("Error minting NFT:", error);
        alert("An error occurred while minting the NFT.");
      }
    },
  },
};
</script>
