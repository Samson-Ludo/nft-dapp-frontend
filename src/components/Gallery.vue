<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full h-auto p-6">
    <div v-if="nfts.length" class="grid grid-cols-1 gap-6 p-4 md:grid-cols-3">
      <div v-for="nft in nfts" :key="nft.id" class="p-4 border">
        <img :src="nft.image" alt="NFT" class="w-full" />
        <h2 class="mt-2 text-lg">{{ nft.name }}</h2>
      </div>
    </div>
    <div class="text-center" v-else>
      <p>No NFTs found.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    walletAddress: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      nfts: [],
    };
  },
  watch: {
    walletAddress: "fetchNFTs",
  },
  methods: {
    async fetchNFTs() {
      if (!this.walletAddress) return;
      try {
        const account = this.walletAddress;
        // Using OpenSea API to get NFTs
        const response = await fetch(
          `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${account}/nfts`
        );
        const data = await response.json();

        this.nfts =
          data?.nfts?.length > 0
            ? data?.nfts?.map((nft) => ({
                id: nft.identifier,
                image: nft.image_url,
                name: nft.name,
              }))
            : [];
        alert("NFT fetched successfully!");
      } catch (error) {
        alert(`Error fetching NFTs/ Error message: ${error.shortMessage}`);
      }
    },
    async mounted() {
      this.fetchNFTs();
    },
  },
};
</script>
