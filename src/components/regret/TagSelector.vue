<script setup>
import { ref, computed } from 'vue'
import { getTagsForCase } from '@/utils/regretData'

const props = defineProps({
  caseData: { type: Object, required: true },
  existingSelections: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['confirm', 'back'])

const tags = computed(() => getTagsForCase(props.caseData.id))
const selections = ref({ ...props.existingSelections })

function toggle(groupId, optionId) {
  if (selections.value[groupId] === optionId) return
  selections.value[groupId] = optionId
}

const canStart = computed(() => {
  return tags.value.every(tg => selections.value[tg.id])
})

function start() {
  if (!canStart.value) return
  emit('confirm', { ...selections.value })
}
</script>

<template>
  <div class="tag-selector">
    <button class="back-btn" @click="emit('back')">
      ← 返回
    </button>

    <div class="selector-header">
      <span class="case-emoji">{{ caseData.emoji }}</span>
      <h1 class="case-title">{{ caseData.title }}</h1>
      <p class="case-subtitle">选择你的标签，来看看你的结局</p>
    </div>

    <div class="tag-groups">
      <div v-for="tg in tags" :key="tg.id" class="tag-group">
        <div class="group-label">{{ tg.label }}</div>
        <div class="group-options">
          <button
            v-for="opt in tg.options"
            :key="opt.id"
            class="tag-pill"
            :class="{ selected: selections[tg.id] === opt.id }"
            @click="toggle(tg.id, opt.id)"
          >
            <span class="pill-emoji">{{ opt.emoji }}</span>
            <span class="pill-label">{{ opt.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <button class="start-btn" :class="{ disabled: !canStart }" :disabled="!canStart" @click="start">
      开始预演 →
    </button>
  </div>
</template>

<style scoped>
.tag-selector {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 20px;
}

.back-btn {
  background: none;
  border: none;
  color: var(--text-color-secondary);
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
  margin-bottom: 20px;
}

.back-btn:hover {
  color: var(--text-color-primary);
}

.selector-header {
  text-align: center;
  margin-bottom: 32px;
}

.case-emoji {
  font-size: 48px;
  display: block;
  margin-bottom: 8px;
}

.case-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 0 8px;
}

.case-subtitle {
  font-size: 14px;
  color: var(--text-color-tertiary);
  margin: 0;
}

.tag-groups {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

.tag-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.group-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-secondary);
}

.group-options {
  display: flex;
  gap: 12px;
}

.tag-pill {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 999px;
  border: 1.5px solid var(--border-color-primary);
  background: var(--bg-color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;
}

.tag-pill:hover {
  border-color: var(--text-color-quaternary);
}

.tag-pill.selected {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: #fff;
}

.pill-emoji { font-size: 18px; }
.pill-label { font-weight: 500; }

.start-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: var(--primary-color);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.start-btn:hover:not(.disabled) {
  background: var(--primary-color-dark);
  transform: translateY(-1px);
}

.start-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>