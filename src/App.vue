<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGameStore } from '@/stores/game.store';
import DevMenu from '@/components/DevMenu.vue';
import Shop from '@/components/Shop.vue';

const isDev = import.meta.env.DEV;

const cookieRef = ref<HTMLElement | null>(null);

const gameStore = useGameStore();

const cookieDisplay = computed(() => {
  return gameStore.cookies;
});

const addCookie = () => {
  gameStore.incrementCookie();

  if (cookieRef.value) {
    cookieRef.value.classList.add('shake');
    setTimeout(() => {
      cookieRef.value?.classList.remove('shake');
    }, 100);
  }
};

// Create a timer/interval that will add cookies automatically based on the autoClickerMultiplier. (Only if the player has auto clickers)
setInterval(() => {
  if (gameStore.autoClickers > 0) {
    gameStore.addCookies(
      gameStore.autoClickers * gameStore.autoClickerMultiplier
    );
  }
}, 1000);
</script>

<template>
  <div class="page flex flex-col items-center justify-center">
    <h1
      ref="cookieRef"
      class="font-LilitaOne text-3xl font-semibold text-black custom-shadow"
    >
      {{ Math.floor(cookieDisplay).toLocaleString('en-US') }}
    </h1>
    <img
      @click="addCookie"
      class="cursor-pointer active:scale-90 transition-transform w-80 h-80 object-contain select-none"
      draggable="false"
      src="./assets/images/ball.png"
      alt="Shadow Cookie"
    />
    <DevMenu v-if="isDev" />
    <Shop />
  </div>
</template>

<style lang="scss" scoped>
.custom-shadow {
  text-shadow: 0 0 0.5rem #ff0000, 0 0 0.5rem #ff0000, 0 0 0.5rem #ff0000;
}

.shake {
  animation: shake 0.5s;
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
}
</style>
