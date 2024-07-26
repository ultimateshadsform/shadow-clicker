import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      cookies: useStorage('cookies', 0),
      clickMultiplier: useStorage('clickMultiplier', 1),

      autoClickers: useStorage('autoClickers', 0),
      autoClickerMultiplier: useStorage('autoClickerMultiplier', 0),
      autoClickerCost: useStorage('autoClickerCost', 15),
    };
  },
  actions: {
    incrementCookie() {
      this.cookies += this.clickMultiplier;
    },

    addCookies(amount: number) {
      this.cookies += amount;
    },

    changeMultiplier(multiplier: number) {
      this.clickMultiplier = multiplier;
    },

    resetGame() {
      localStorage.clear();
      this.$reset();
    },
  },
});
