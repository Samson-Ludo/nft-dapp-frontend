<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col items-center">
    <h1 class="mb-4 text-2xl">Transfer NFT</h1>
    <div class="flex flex-row space-x-6">
      <input
        type="text"
        v-model="toAddress"
        placeholder="Recipient Address"
        class="px-4 py-2 mb-4 border rounded-lg"
      />
      <input
        type="text"
        v-model="tokenId"
        placeholder="Token ID"
        class="px-4 py-2 mb-4 border rounded-lg"
      />
    </div>
    <button
      v-if="!isLoading"
      @click="transferNFT"
      class="px-6 py-3 text-white bg-red-500 rounded-lg"
    >
      Transfer NFT
    </button>
    <p v-if="isLoading">Transfering...</p>
  </div>
</template>

<script>
import { ethers } from "ethers";
import contractABI from "@/../ContractABI.json";

const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;

export default {
  data() {
    return {
      isLoading: false,
      toAddress: "",
      tokenId: "",
    };
  },
  methods: {
    async transferNFT() {
      if (!this.toAddress || !this.tokenId)
        return alert("Please provide a valid address and token ID");

      try {
        this.isLoading = true;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        // validate address
        if (!ethers.isAddress(this.toAddress)) {
          alert("Address might be invalid!");
          this.isLoading = false;
          return;
        }

        const tx = await contract.transferFrom(
          signer.getAddress(),
          this.toAddress,
          this.tokenId
        );
        await tx.wait();
        alert("NFT Transferred Successfully!");
        this.isLoading = false;
      } catch (error) {
        alert(`Error transferring NFT.\nError message: ${error.shortMessage}`);
        this.isLoading = false;
      }
    },
  },
};
</script>
