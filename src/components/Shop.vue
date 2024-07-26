<script setup lang="ts">
import { useGameStore } from '@/stores/game.store';
import { computed } from 'vue';

const gameStore = useGameStore();

const shadowClickerCost = computed(() => {
  return gameStore.autoClickerCost;
});

const buyShadowClicker = () => {
  //   Check if the player has enough cookies to buy the auto clicker
  //   Cost of the first Cursor:

  // 15 * 1.15^0 = 15 cookies
  // Cost of the second Cursor:

  // 15 * 1.15^1 = 17.25 cookies
  // Cost of the third Cursor:

  // 15 * 1.15^2 ≈ 19.81 cookies
  if (gameStore.cookies >= gameStore.autoClickerCost) {
    gameStore.$patch((state) => {
      state.cookies -= state.autoClickerCost;
      state.autoClickerMultiplier += 0.1;
      state.autoClickers += 1;
      state.autoClickerCost = Math.round(
        15 * Math.pow(1.15, state.autoClickers)
      );
    });
  }
};
</script>

<template>
  <!-- Store -->
  <div class="bg-black bg-opacity-45 p-4 rounded-lg mt-4">
    <h2 class="text-center text-xl font-LilitaOne">Store</h2>
    <ul class="flex flex-col items-center gap-y-2">
      <li class="flex flex-col items-center gap-y-2 p-2 rounded-lg">
        <h3>Shadow Clicker</h3>
        <button
          @click="buyShadowClicker"
          class="btn buy-btn w-full"
          :disabled="gameStore.cookies < shadowClickerCost"
        >
          {{
            shadowClickerCost.toLocaleString('en-US', {
              minimumFractionDigits: 0,
            })
          }}
        </button>
        <p>Owned: {{ gameStore.autoClickers }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  @apply font-bold py-2 px-4 rounded transition-colors disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-red-500;
}

.buy-btn {
  @apply relative overflow-hidden rounded-full;
  &:enabled {
    background: radial-gradient(transparent 50%, red);
  }
  &:before {
    @apply absolute w-[200%] h-[200%] content-[''] -z-20 disabled:hidden;
    background: conic-gradient(from 90deg, red, black);
    top: -50%;
    left: -50%;
    animation: spin 2s linear infinite;
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }

  &:after {
    @apply absolute w-[96%] h-[90%] content-[''] top-[4%] left-[2%] rounded-full -z-20 bg-red-500;
  }
}
</style>
