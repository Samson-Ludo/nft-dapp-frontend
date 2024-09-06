<template>
  <div class="flex flex-col items-center justify-center h-auto">
    <button
      v-if="!account"
      @click="connectWallet"
      class="px-6 py-3 text-white bg-blue-500 rounded-lg"
    >
      Connect to MetaMask
    </button>

    <div v-if="account" class="p-2 text-white bg-green-500 rounded-lg">
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
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const walletAddress = await signer.getAddress();
          this.account = walletAddress;
          this.$emit("wallet-connected", walletAddress);
        } catch (error) {
          console.error("Error initializing provider:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    },
    disconnectWallet() {
      localStorage.removeItem("walletAddress");
      this.account = null;
    },
  },
};
</script>
