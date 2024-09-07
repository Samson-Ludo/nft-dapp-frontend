<!-- App.vue or another parent component -->
<template>
  <div class="w-full">
    <!-- Navigation or header section -->
    <header class="flex justify-between p-4 text-white bg-gray-900">
      <h1 class="text-xl">My NFT DApp</h1>
      <ConnectWallet @wallet-connected="handleWalletConnected" />
    </header>
    <main>
      <div class="flex w-full h-auto flex-col md:flex-row">
        <div class="w-full md:w-1/2 h-auto p-6 border border-gray-300">
          <MintNFT />
        </div>
        <div class="w-full md:w-1/2 h-auto p-6 border border-gray-300">
          <TransferAssets />
        </div>
      </div>
      <Gallery :walletAddress="walletAddress" />
    </main>
  </div>
</template>

<script>
import ConnectWallet from "@/components/ConnectWallet.vue";
import Gallery from "@/components/Gallery.vue";
import MintNFT from "@/components/Mint.vue";
import TransferAssets from "@/components/Transfer.vue";

export default {
  components: {
    ConnectWallet,
    Gallery,
    MintNFT,
    TransferAssets,
  },
  data() {
    return {
      walletAddress: null,
    };
  },
  methods: {
    handleWalletConnected(address) {
      this.walletAddress = address;
    },
  },
};
</script>

<style>
/* Add any styling as needed */
</style>
