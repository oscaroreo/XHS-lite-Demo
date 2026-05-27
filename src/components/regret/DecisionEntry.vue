<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { decisionCases, matchCase } from '@/utils/regretData'

const props = defineProps({ searchText: { type: String, default: '' } })
const emit = defineEmits(['start-simulation', 'select-case'])

const matchedCase = computed(() => matchCase(props.searchText))
</script>

<template>
  <div class="decision-entry" v-if="matchedCase">
    <div class="entry-header">
      <SvgIcon name="magic" width="20" height="20" color="var(--primary-color)" />
      <span>检测到你的问题是一个生活选择</span>
    </div>
    <div class="entry-prompt">
      "{{ matchedCase.title }}"
    </div>
    <button class="entry-btn" @click="emit('start-simulation', matchedCase.id)">
      <SvgIcon name="magic" width="18" height="18" />
      预演未来 — 看看做了之后会发生什么
    </button>
    <div class="entry-others" v-if="false">
      <span>或者试试：</span>
      <span v-for="dc in decisionCases" :key="dc.id" class="other-tag" @click="emit('select-case', dc.id)">
        {{ dc.emoji }} {{ dc.title.slice(0, 8) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.decision-entry {
  background: linear-gradient(135deg, rgba(255, 36, 66, 0.06), rgba(255, 36, 66, 0.02));
  border: 1px solid rgba(255, 36, 66, 0.15);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-color-tertiary);
  margin-bottom: 8px;
}

.entry-prompt {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: 14px;
  padding-left: 28px;
}

.entry-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: var(--primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.entry-btn:hover {
  background: var(--primary-color-dark);
  transform: translateY(-1px);
}
</style>