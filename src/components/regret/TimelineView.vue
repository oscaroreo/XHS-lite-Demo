<script setup>
import { ref, computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  days: { type: Array, required: true },
  matchedUserCount: { type: Number, default: 0 },
})
const emit = defineEmits(['show-note', 'view-endings'])

const activeDay = ref(0)
const currentDay = computed(() => props.days[activeDay.value] || null)

function goNext() {
  if (activeDay.value < props.days.length - 1) activeDay.value++
}

function goPrev() {
  if (activeDay.value > 0) activeDay.value--
}
</script>

<template>
  <div class="timeline-view">
    <div class="timeline-header">
      <div class="day-tabs">
        <button
          v-for="(day, i) in days"
          :key="day.day"
          class="day-tab"
          :class="{ active: activeDay === i }"
          @click="activeDay = i"
        >
          Day {{ day.day }}
        </button>
      </div>
      <div class="matched-info" v-if="matchedUserCount > 0">
        基于 {{ matchedUserCount }} 篇相关经验帖
      </div>
    </div>

    <div class="timeline-content" v-if="currentDay">
      <div class="day-title">{{ currentDay.title }}</div>
      <p class="day-narrative">{{ currentDay.narrative }}</p>

      <div class="experience-list">
        <div
          v-for="(exp, i) in currentDay.experiences"
          :key="i"
          class="exp-card"
          :style="{ animationDelay: i * 0.15 + 's' }"
        >
          <div class="exp-avatar">
            <img :src="exp.avatar" :alt="exp.username" />
          </div>
          <div class="exp-body">
            <div class="exp-user">{{ exp.username }}</div>
            <div class="exp-text">"{{ exp.text }}"</div>
          </div>
        </div>
        <div v-if="currentDay.experiences.length === 0" class="no-exps">
          暂无匹配的经验帖
        </div>
      </div>
    </div>

    <div class="timeline-nav">
      <button class="nav-arrow" :class="{ hidden: activeDay === 0 }" @click="goPrev">
        <SvgIcon name="left" width="18" height="18" />
        前一天
      </button>
      <button class="nav-btn" @click="emit('view-endings')">
        看结局 →
      </button>
      <button class="nav-arrow right" :class="{ hidden: activeDay === days.length - 1 }" @click="goNext">
        后一天
        <SvgIcon name="right" width="18" height="18" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.timeline-view {
  max-width: 640px;
  margin: 0 auto;
  padding: 20px;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.day-tabs {
  display: flex;
  gap: 8px;
}

.day-tab {
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--border-color-primary);
  background: var(--bg-color-primary);
  color: var(--text-color-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.day-tab.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.day-tab:hover:not(.active) {
  border-color: var(--text-color-quaternary);
}

.matched-info {
  font-size: 12px;
  color: var(--text-color-quaternary);
}

.timeline-content {
  animation: fadeIn 0.3s ease;
}

.day-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: 10px;
}

.day-narrative {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-color-secondary);
  margin: 0 0 20px;
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.exp-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: var(--bg-color-secondary);
  animation: fadeIn 0.4s ease both;
}

.exp-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.exp-body {
  flex: 1;
}

.exp-user {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color-primary);
  margin-bottom: 4px;
}

.exp-text {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-color-secondary);
  font-style: italic;
}

.no-exps {
  text-align: center;
  padding: 30px;
  color: var(--text-color-quaternary);
  font-size: 14px;
}

.timeline-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;
}

.nav-arrow {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--text-color-secondary);
  font-size: 13px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-arrow:hover {
  background: var(--bg-color-secondary);
  color: var(--text-color-primary);
}

.nav-arrow.hidden {
  visibility: hidden;
}

.nav-arrow.right {
  flex-direction: row-reverse;
}

.nav-btn {
  padding: 10px 28px;
  border-radius: 999px;
  border: none;
  background: var(--primary-color);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: var(--primary-color-dark);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>