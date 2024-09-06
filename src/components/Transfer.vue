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
      @click="transferNFT"
      class="px-6 py-3 text-white bg-red-500 rounded-lg"
    >
      Transfer NFT
    </button>
  </div>
</template>

<script>
import { ethers } from "ethers";
import contractABI from "@/../ContractABI.json";

const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS

export default {
  data() {
    return {
      toAddress: "",
      tokenId: "",
    };
  },
  methods: {
    async transferNFT() {
      if (!this.toAddress || !this.tokenId)
        return alert("Please provide a valid address and token ID");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        // validate address
        if (!ethers.isAddress(this.toAddress)) {
          alert("Address might be invalid!");
          return;
        }

        const tx = await contract.transferFrom(
          signer.getAddress(),
          this.toAddress,
          this.tokenId
        );
        await tx.wait();
        alert("NFT Transferred Successfully!");
      } catch (err) {
        console.error(err);
        alert("Error transferring NFT. Check Address and Token ID");
      }
    },
  },
};
</script>
