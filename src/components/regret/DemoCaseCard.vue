<script setup>
defineProps({
  caseData: { type: Object, required: true },
})
defineEmits(['click'])
</script>

<template>
  <div class="demo-case-card" @click="$emit('click')">
    <div class="card-emoji">{{ caseData.emoji }}</div>
    <div class="card-info">
      <div class="card-title">{{ caseData.title }}</div>
      <div class="card-summary">{{ caseData.summary }}</div>
    </div>
    <div class="card-go">→</div>
  </div>
</template>

<style scoped>
.demo-case-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  background: var(--bg-color-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--border-color-secondary);
}

.demo-case-card:hover {
  background: var(--bg-color-tertiary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.card-emoji {
  font-size: 32px;
  line-height: 1;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: 4px;
}

.card-summary {
  font-size: 13px;
  color: var(--text-color-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-go {
  font-size: 18px;
  color: var(--text-color-quaternary);
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.demo-case-card:hover .card-go {
  transform: translateX(4px);
  color: var(--primary-color);
}
</style>