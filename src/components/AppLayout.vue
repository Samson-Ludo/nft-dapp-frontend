<template>
  <div class="app-layout">
    <header class="bg-gray-800 text-white p-4">
      <h1>NFT DApp</h1>
      <ConnectWallet />
    </header>
    <nav class="bg-gray-700 text-white p-4">
      <router-link to="/" class="cursor-pointer">Gallery</router-link> |
      <router-link to="/mint">Mint</router-link> |
      <router-link to="/transfer">Transfer</router-link>
    </nav>
    <main class="p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import ConnectWallet from "@/components/ConnectWallet.vue";

export default {
  components: {
    ConnectWallet,
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header,
nav {
  padding: 1rem;
}

main {
  flex-grow: 1;
}
</style>
