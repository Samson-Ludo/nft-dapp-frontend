<template>
  <div class="flex flex-col items-center justify-center h-auto">
    <button
      @click="connectWallet"
      class="px-6 py-3 text-white bg-blue-500 rounded-lg"
    >
      Connect to MetaMask 
    </button>
    <div v-if="account" class="mt-4">
      <p>Connected Account: {{ account }}</p>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";

export default {
  data() {
    return {
      account: null,
    };
  },
  methods: {
    async connectWallet() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log("Connected address:", address);
        } catch (error) {
          console.error("Error initializing provider:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    },
  },
};
</script>
