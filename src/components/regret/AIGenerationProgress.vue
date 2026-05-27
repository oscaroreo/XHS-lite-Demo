<script setup>
import { ref, onMounted } from 'vue'
import { getAISteps } from '@/utils/regretData'

const props = defineProps({
  caseData: { type: Object, required: true },
})

const emit = defineEmits(['complete'])

const currentStep = ref(-1)
const steps = getAISteps(props.caseData?.id)

function startProgress() {
  currentStep.value = 0
  const stepInterval = 1200

  steps.forEach((_, idx) => {
    setTimeout(() => {
      currentStep.value = idx
      if (idx === steps.length - 1) {
        setTimeout(() => emit('complete'), 800)
      }
    }, idx * stepInterval)
  })
}

onMounted(() => {
  setTimeout(startProgress, 400)
})
</script>

<template>
  <div class="ai-progress">
    <div class="progress-header">
      <div class="header-icon">🌀</div>
      <h2 class="header-title">瞬息小红薯 正在为你开启平行宇宙</h2>
      <p class="header-subtitle">检索社区真实经验，合成你决策后的多种可能</p>
    </div>

    <div class="steps-container">
      <div
        v-for="(step, idx) in steps"
        :key="idx"
        class="step-item"
        :class="{
          active: currentStep === idx,
          done: currentStep > idx,
          pending: currentStep < idx,
        }"
      >
        <div class="step-indicator">
          <div v-if="currentStep > idx" class="step-dot done-dot">✓</div>
          <div v-else-if="currentStep === idx" class="step-dot active-dot">
            <div class="spinner"></div>
          </div>
          <div v-else class="step-dot pending-dot">{{ idx + 1 }}</div>
        </div>
        <div class="step-content">
          <div class="step-title-row">
            <span class="step-icon">{{ step.icon }}</span>
            <span class="step-title">{{ step.title }}</span>
          </div>
          <div v-if="currentStep >= idx && step.doneText" class="step-result">
            {{ step.doneText }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentStep >= 0 && currentStep < steps.length - 1" class="progress-bar-track">
      <div
        class="progress-bar-fill"
        :style="{ width: ((currentStep + 1) / steps.length) * 100 + '%' }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.ai-progress {
  max-width: 520px;
  margin: 0 auto;
  padding: 40px 24px;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.progress-header {
  text-align: center;
  margin-bottom: 36px;
}

.header-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: pulse-icon 2s ease-in-out infinite;
}

@keyframes pulse-icon {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 0 8px;
}

.header-subtitle {
  font-size: 13px;
  color: var(--text-color-tertiary);
  margin: 0;
}

.steps-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 14px;
  transition: all 0.4s ease;
  opacity: 0.3;
  transform: translateX(-10px);
}

.step-item.active {
  opacity: 1;
  transform: translateX(0);
  background: var(--bg-color-secondary);
}

.step-item.done {
  opacity: 1;
  transform: translateX(0);
}

.step-item.pending {
  opacity: 0.3;
  transform: translateX(-10px);
}

.step-indicator {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.step-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.done-dot {
  background: #22c55e;
  color: #fff;
  font-size: 14px;
}

.active-dot {
  background: var(--primary-color);
}

.pending-dot {
  background: var(--bg-color-tertiary);
  color: var(--text-color-quaternary);
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.step-content {
  flex: 1;
  min-width: 0;
}

.step-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}

.step-icon {
  font-size: 16px;
}

.step-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-color-primary);
}

.step-result {
  font-size: 13px;
  color: var(--text-color-secondary);
  margin-top: 4px;
  padding-left: 24px;
  animation: result-fade 0.4s ease;
}

@keyframes result-fade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.progress-bar-track {
  width: 100%;
  max-width: 300px;
  height: 4px;
  border-radius: 2px;
  background: var(--bg-color-tertiary);
  margin-top: 32px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--primary-color), #f97316);
  transition: width 0.5s ease;
}
</style>