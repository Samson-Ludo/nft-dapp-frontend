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
      <p>No NFTs found for this account.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nfts: [],
    };
  },
  async mounted() {
    const account = ""; /* The account you fetched earlier */
    // Example: Using OpenSea API to get NFTs
    const response = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=${account}`
    );
    const data = await response.json();
    this.nfts =
      data?.assets?.length > 0
        ? data?.assets?.map((nft) => ({
            id: nft.id,
            image: nft.image_url,
            name: nft.name,
          }))
        : [];
  },
};
</script>
