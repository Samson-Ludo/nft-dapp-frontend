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

const contractAddress = process.env.VITE_CONTRACT_ADDRESS;

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
      if (!this.selectedFile) {
        alert("Please select a file!");
        return;
      }

      try {
        // Step 1: Upload the file to the backend (which uploads it to Pinata/IPFS)
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        const response = await axios.post(
          `${process.env.VITE_PINATA_GATEWAY_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.metadataUrl = response.data.url; // Get the metadata URL from the backend
        console.log("File uploaded to:", this.metadataUrl);

        // Step 2: Mint the NFT by interacting with the smart contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const transaction = await contract.mintNFT(this.metadataUrl);
        await transaction.wait();
        alert("NFT successfully minted!");
      } catch (error) {
        console.error("Error minting NFT:", error);
        alert("An error occurred while minting the NFT.");
      }
    },
  },
};
</script>
