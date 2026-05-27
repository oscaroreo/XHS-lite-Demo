<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button class="regret-pill" @click="emit('click')">
    <span class="pill-emoji">🌀</span>
    <span class="pill-text">看看平行世界的我</span>
  </button>
</template>

<style scoped>
.regret-pill {
  position: fixed;
  bottom: 88px;
  right: 24px;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--primary-color), #d91a3a);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 36, 66, 0.35);
  transition: all 0.3s ease;
  animation: pill-breathe 2.5s ease-in-out infinite;
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.regret-pill:hover {
  transform: scale(1.06);
  box-shadow: 0 6px 28px rgba(255, 36, 66, 0.5);
}

.regret-pill:active {
  transform: scale(0.96);
}

.pill-emoji {
  font-size: 20px;
  line-height: 1;
}

.pill-text {
  line-height: 1;
}

@keyframes pill-breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 20px rgba(255, 36, 66, 0.35);
  }
  50% {
    transform: scale(1.04);
    box-shadow: 0 6px 28px rgba(255, 36, 66, 0.5);
  }
}

/* Mobile: smaller */
@media (max-width: 640px) {
  .regret-pill {
    bottom: 72px;
    right: 16px;
    padding: 10px 16px;
    font-size: 13px;
  }
  .pill-emoji {
    font-size: 17px;
  }
}
</style>