<script setup lang="ts">
import { useGameStore } from '@/stores/game.store';
import { computed, ref } from 'vue';

const gameStore = useGameStore();

const showDevMenu = ref(false);

const clickMultiplier = computed(() => gameStore.clickMultiplier);
const autoClickerMultiplier = computed(() => gameStore.autoClickerMultiplier);
const autoClickerOwned = computed(() => gameStore.autoClickers);
</script>

<template>
  <!-- bottom center 50% width -->
  <div
    class="absolute bottom-0 z-50 bg-black bg-opacity-50 p-4 rounded-t-lg transition-transform"
    :style="{
      transform: showDevMenu ? 'translateY(0)' : 'translateY(100%)',
    }"
  >
    <div
      class="handle flex justify-center items-center cursor-pointer"
      @click="showDevMenu = !showDevMenu"
    />
    <div class="flex flex-col justify-center items-center gap-y-2">
      <h1 class="dev-title font-semibold text-xl font-LilitaOne">DevMenu</h1>
      <hr class="w-full rounded-full border-2 border-red-600" />
      <div class="flex gap-x-2 button-container">
        <button class="btn" @click="gameStore.resetGame">Reset Game</button>
        <button class="btn" @click="gameStore.addCookies(1000000)">
          Add 1000000 Cookies
        </button>
        <div class="flex flex-col items-center gap-y-1">
          <p>Click multiplier: {{ clickMultiplier }}</p>
          <p>
            Shadow multiplier: {{ autoClickerMultiplier }} Owned:
            {{ autoClickerOwned }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.handle {
  @apply absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-red-500 bg-opacity-25 rounded-t-lg;
}

.button-container {
  @apply flex gap-x-2;
}

.btn {
  @apply px-4 py-2 bg-red-600 text-white rounded-lg;
}

.dev-title {
  @apply relative z-0 overflow-hidden flex justify-center items-center;

  background: linear-gradient(
    90deg,
    black,
    #da2528,
    #3061e3,
    white,
    #f1b000,
    #fd95c6,
    black
  );
  background-clip: text;
  color: transparent;
  background-position: center;
  background-size: 400%;
  animation: spin 10s linear infinite;
  @keyframes spin {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }
}
</style>
