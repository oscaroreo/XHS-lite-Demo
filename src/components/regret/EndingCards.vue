<script setup>
defineProps({
  endings: { type: Array, required: true },
})
const emit = defineEmits(['restart', 'go-home'])
</script>

<template>
  <div class="ending-cards">
    <div class="ending-header">
      <h2>你的预演结果</h2>
      <p>根据和你选了同样标签的人的反馈...</p>
    </div>

    <div class="endings-list">
      <div
        v-for="(ending, i) in endings"
        :key="ending.type"
        class="ending-card"
        :class="{ primary: i === 0 }"
        :style="i === 0 ? { '--accent': ending.color } : {}"
      >
        <div class="ending-emoji">{{ ending.emoji }}</div>
        <div class="ending-type">{{ ending.type }}</div>
        <div class="ending-summary">{{ ending.summary }}</div>
        <div class="ending-bar">
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{ width: ending.recommendationRate + '%', background: ending.color }"
            ></div>
          </div>
          <span class="bar-label">{{ ending.recommendationRate }}%</span>
        </div>
      </div>
    </div>

    <div class="ending-actions">
      <button class="action-btn secondary" @click="emit('restart')">
        重新选择
      </button>
      <button class="action-btn primary" @click="emit('go-home')">
        返回首页
      </button>
    </div>
  </div>
</template>

<style scoped>
.ending-cards {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 20px;
}

.ending-header {
  text-align: center;
  margin-bottom: 28px;
}

.ending-header h2 {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 0 8px;
}

.ending-header p {
  font-size: 14px;
  color: var(--text-color-tertiary);
  margin: 0;
}

.endings-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 28px;
}

.ending-card {
  padding: 18px;
  border-radius: 14px;
  background: var(--bg-color-secondary);
  border: 1px solid var(--border-color-secondary);
  transition: all 0.2s;
}

.ending-card.primary {
  background: var(--bg-color-primary);
  border-color: var(--accent, var(--primary-color));
  border-width: 2px;
  box-shadow: 0 4px 20px var(--shadow-color);
}

.ending-emoji {
  font-size: 36px;
  margin-bottom: 6px;
}

.ending-type {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: 4px;
}

.ending-summary {
  font-size: 13px;
  color: var(--text-color-secondary);
  margin-bottom: 12px;
}

.ending-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bar-track {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: var(--bg-color-tertiary);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.bar-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color-primary);
  min-width: 40px;
  text-align: right;
}

.ending-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 13px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.action-btn.primary {
  background: var(--primary-color);
  color: #fff;
}

.action-btn.primary:hover {
  background: var(--primary-color-dark);
}

.action-btn.secondary {
  background: var(--bg-color-secondary);
  color: var(--text-color-secondary);
  border: 1px solid var(--border-color-primary);
}

.action-btn.secondary:hover {
  background: var(--bg-color-tertiary);
  color: var(--text-color-primary);
}
</style>