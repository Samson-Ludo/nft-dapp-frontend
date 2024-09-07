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
      v-if="!isLoading"
      @click="mintNFT"
      class="px-6 py-3 text-white bg-green-500 rounded-lg"
    >
      Mint NFT
    </button>
    <p v-if="isLoading">Minting...</p>
  </div>
</template>

<script>
import axios from "axios";
import { ethers } from "ethers";
import contractABI from "@/../ContractABI.json";

export default {
  data() {
    return {
      isLoading: false,
      selectedFile: null,
      metadataUrl: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async mintNFT() {
      const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;

      if (!this.selectedFile) {
        alert("Please select a file!");
        return;
      }

      const backendUrl = process.env.VUE_APP_BACKEND_URL;

      try {
        // Step 1: Upload the file to the backend (which uploads it to Pinata/IPFS)
        this.isLoading = true;
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

        const transaction = await contract.mintNFT(this.metadataUrl);
        await transaction.wait();
        alert("NFT successfully minted!");
        this.isLoading = false;
      } catch (error) {
        alert(
          `An error occurred while minting the NFT.\n Error message: ${error.shortMessage}`
        );
        this.isLoading = false;
      }
    },
  },
};
</script>
