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
  steps.forEach((_, idx) => {
    setTimeout(() => {
      currentStep.value = idx
      if (idx === steps.length - 1) {
        setTimeout(() => emit('complete'), 800)
      }
    }, idx * 1200)
  })
}

onMounted(() => {
  setTimeout(startProgress, 400)
})
</script>

<template>
  <div class="ai-progress">
    <!-- Header -->
    <div class="progress-header">
      <div class="header-icon">🌀</div>
      <h2 class="header-title">瞬息小红薯</h2>
      <p class="header-subtitle">正在为你开启平行宇宙...</p>
    </div>

    <!-- Scene area -->
    <div class="scene-area">
      <Transition name="scene" mode="out-in">
        <!-- Step 0: Searching -->
        <div v-if="currentStep === 0" key="step-0" class="scene scene-search">
          <!-- Floating notes -->
          <div class="float-notes">
            <div
              v-for="i in 8"
              :key="i"
              class="note-card"
              :style="{ '--i': i, '--dx': (Math.random() * 160 - 80) + 'px', '--dy': (Math.random() * 120 - 60) + 'px', '--rot': (Math.random() * 40 - 20) + 'deg', '--delay': (i * 0.12) + 's' }"
            >
              <div class="note-card-line"></div>
              <div class="note-card-line short"></div>
            </div>
          </div>
          <div class="char-container">
            <div class="character char-search">
              <div class="char-head">
                <div class="char-hair"></div>
                <div class="char-face">
                  <div class="char-eye left"></div>
                  <div class="char-eye right"></div>
                  <div class="char-mouth smile"></div>
                  <div class="char-blush left"></div>
                  <div class="char-blush right"></div>
                </div>
              </div>
              <div class="char-arm left holding">🔍</div>
              <div class="char-arm right"></div>
              <div class="char-body"></div>
            </div>
          </div>
        </div>

        <!-- Step 1: Clustering -->
        <div v-else-if="currentStep === 1" key="step-1" class="scene scene-cluster">
          <div class="cluster-dots">
            <div
              v-for="i in 12"
              :key="i"
              class="c-dot"
              :style="{ '--i': i, '--color': ['#ff2442','#ff6b6b','#a855f7','#3b82f6','#f97316','#22c55e'][i % 6], '--delay': (i * 0.08) + 's' }"
            ></div>
          </div>
          <div class="char-container">
            <div class="character char-think">
              <div class="char-head">
                <div class="char-hair"></div>
                <div class="char-face">
                  <div class="char-eye left squint"></div>
                  <div class="char-eye right squint"></div>
                  <div class="char-mouth think"></div>
                  <div class="char-blush left"></div>
                  <div class="char-blush right"></div>
                </div>
              </div>
              <div class="char-arm left chin"></div>
              <div class="char-arm right"></div>
              <div class="char-body"></div>
            </div>
          </div>
        </div>

        <!-- Step 2: Matching -->
        <div v-else-if="currentStep === 2" key="step-2" class="scene scene-match">
          <div class="orbit-container">
            <div
              v-for="i in 6"
              :key="i"
              class="orbit-avatar"
              :style="{ '--i': i, '--delay': (i * 0.1) + 's', '--angle': (i * 60) + 'deg' }"
            >
              <span class="avatar-emoji">{{ ['😊','🧑','👩','👨','🤗','😎'][i-1] }}</span>
            </div>
          </div>
          <div class="char-container">
            <div class="character char-match">
              <div class="char-head">
                <div class="char-hair"></div>
                <div class="char-face">
                  <div class="char-eye left"></div>
                  <div class="char-eye right"></div>
                  <div class="char-mouth smile"></div>
                  <div class="char-blush left"></div>
                  <div class="char-blush right"></div>
                </div>
              </div>
              <div class="char-arm left open"></div>
              <div class="char-arm right open"></div>
              <div class="char-body"></div>
            </div>
          </div>
        </div>

        <!-- Step 3: Synthesizing -->
        <div v-else-if="currentStep === 3" key="step-3" class="scene scene-synth">
          <div class="portal-rings">
            <div class="portal-ring r1"></div>
            <div class="portal-ring r2"></div>
            <div class="portal-ring r3"></div>
          </div>
          <div class="world-glimmers">
            <div
              v-for="i in 4"
              :key="i"
              class="world-entry"
              :style="{ '--i': i, '--angle': (i * 90) + 'deg' }"
            >
              <span class="world-emoji">{{ ['🏙️','📷','🍳','🌿'][i-1] }}</span>
            </div>
          </div>
          <div class="char-container">
            <div class="character char-synth">
              <div class="char-head">
                <div class="char-hair"></div>
                <div class="char-face">
                  <div class="char-eye left"></div>
                  <div class="char-eye right"></div>
                  <div class="char-mouth wow"></div>
                  <div class="char-blush left"></div>
                  <div class="char-blush right"></div>
                </div>
              </div>
              <div class="char-arm left casting">✨</div>
              <div class="char-arm right casting">✨</div>
              <div class="char-body"></div>
            </div>
          </div>
        </div>

        <!-- Step 4: Complete -->
        <div v-else-if="currentStep === 4" key="step-4" class="scene scene-done">
          <div class="sparkles">
            <div
              v-for="i in 12"
              :key="i"
              class="sparkle"
              :style="{ '--i': i, '--x': (Math.random() * 300 - 150) + 'px', '--y': (Math.random() * 200 - 100) + 'px', '--delay': (i * 0.07) + 's' }"
            ></div>
          </div>
          <div class="char-container">
            <div class="character char-celebrate">
              <div class="char-head">
                <div class="char-hair"></div>
                <div class="char-face">
                  <div class="char-eye left happy"></div>
                  <div class="char-eye right happy"></div>
                  <div class="char-mouth big-smile"></div>
                  <div class="char-blush left"></div>
                  <div class="char-blush right"></div>
                </div>
              </div>
              <div class="char-arm left up">🎉</div>
              <div class="char-arm right up">✨</div>
              <div class="char-body"></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Step indicators -->
    <div class="step-indicators">
      <div
        v-for="(step, idx) in steps"
        :key="idx"
        class="step-dot-wrap"
      >
        <div
          class="step-dot"
          :class="{ active: currentStep === idx, done: currentStep > idx }"
        >
          <span v-if="currentStep > idx" class="dot-check">✓</span>
          <span v-else-if="currentStep === idx" class="dot-num">
            <div class="dot-spinner"></div>
          </span>
          <span v-else class="dot-num">{{ idx + 1 }}</span>
        </div>
        <div class="step-label" :class="{ active: currentStep >= idx }">
          {{ step.icon }} {{ step.title }}
        </div>
      </div>
    </div>

    <!-- Result text -->
    <Transition name="result-fade">
      <div v-if="currentStep >= 0 && steps[currentStep]?.doneText" class="result-text">
        {{ steps[currentStep].doneText }}
      </div>
    </Transition>

    <!-- Progress bar -->
    <div v-if="currentStep >= 0 && currentStep < steps.length - 1" class="progress-track">
      <div
        class="progress-fill"
        :style="{ width: ((currentStep + 1) / steps.length) * 100 + '%' }"
      ></div>
      <div class="progress-glow" :style="{ left: ((currentStep + 1) / steps.length) * 100 + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.ai-progress {
  max-width: 560px;
  margin: 0 auto;
  padding: 32px 24px 48px;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
.progress-header {
  text-align: center;
  margin-bottom: 24px;
}

.header-icon {
  font-size: 40px;
  margin-bottom: 8px;
  animation: header-pulse 2s ease-in-out infinite;
}

@keyframes header-pulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(8deg); }
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 0 4px;
}

.header-subtitle {
  font-size: 13px;
  color: var(--text-color-tertiary);
  margin: 0;
}

/* Scene area */
.scene-area {
  width: 100%;
  height: 260px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 36, 66, 0.04), rgba(255, 36, 66, 0.01));
}

.scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scene transitions */
.scene-enter-active {
  animation: scene-in 0.45s ease;
}

.scene-leave-active {
  animation: scene-out 0.3s ease;
}

@keyframes scene-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes scene-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
}

/* ===========================
   Character
   =========================== */
.char-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.character {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
  height: 160px;
}

/* Head */
.char-head {
  position: relative;
  width: 72px;
  height: 72px;
  z-index: 2;
}

/* Hair (small cute tuft) */
.char-hair {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 16px;
  background: #ff8a8a;
  border-radius: 12px 12px 0 0;
  z-index: 3;
}

/* Face */
.char-face {
  position: absolute;
  inset: 0;
}

.char-eye {
  position: absolute;
  top: 26px;
  width: 8px;
  height: 10px;
  background: #333;
  border-radius: 50%;
  transition: all 0.3s;
}

.char-eye.left { left: 17px; }
.char-eye.right { right: 17px; }

.char-eye.squint {
  width: 8px;
  height: 4px;
  border-radius: 4px;
  top: 30px;
}

.char-eye.happy {
  width: 10px;
  height: 10px;
  background: transparent;
  border: none;
  box-shadow: none;
}

.char-eye.happy::after {
  content: '✦';
  font-size: 10px;
  position: absolute;
  top: -2px;
  left: -1px;
  color: #ff2442;
}

.char-mouth {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border-radius: 0;
  transition: all 0.3s;
}

.char-mouth.smile {
  width: 14px;
  height: 7px;
  border-bottom: 2.5px solid #333;
  border-radius: 0 0 10px 10px;
}

.char-mouth.think {
  width: 10px;
  height: 3px;
  border-bottom: 2.5px solid #333;
  border-radius: 0 0 5px 5px;
  bottom: 18px;
}

.char-mouth.wow {
  width: 10px;
  height: 10px;
  border: 2.5px solid #333;
  border-radius: 50%;
  bottom: 15px;
}

.char-mouth.big-smile {
  width: 18px;
  height: 9px;
  border-bottom: 3px solid #333;
  border-radius: 0 0 12px 12px;
}

.char-blush {
  position: absolute;
  top: 36px;
  width: 14px;
  height: 8px;
  background: rgba(255, 150, 150, 0.5);
  border-radius: 50%;
}

.char-blush.left { left: 6px; }
.char-blush.right { right: 6px; }

/* Body (round red ball) */
.char-body {
  width: 72px;
  height: 72px;
  background: radial-gradient(circle at 40% 35%, #ff6b6b, #ff2442);
  border-radius: 50%;
  position: relative;
  z-index: 1;
  margin-top: -10px;
  box-shadow: 0 4px 16px rgba(255, 36, 66, 0.25);
  transition: transform 0.3s;
}

/* Arms */
.char-arm {
  position: absolute;
  width: 18px;
  height: 36px;
  background: #ff6b6b;
  border-radius: 10px;
  top: 48px;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.4s ease;
  line-height: 1;
}

.char-arm.left {
  left: 6px;
  transform-origin: top center;
}

.char-arm.right {
  right: 6px;
  transform-origin: top center;
}

/* Arm poses */
.char-search .char-arm.left.holding {
  transform: rotate(-30deg) translateX(-18px) translateY(-4px);
}

.char-think .char-arm.left.chin {
  transform: rotate(15deg) translateX(10px) translateY(-10px);
  height: 30px;
}

.char-match .char-arm.left.open {
  transform: rotate(-45deg) translateX(-20px);
}

.char-match .char-arm.right.open {
  transform: rotate(45deg) translateX(20px);
}

.char-synth .char-arm.left.casting {
  transform: rotate(-40deg) translateX(-24px) translateY(-8px);
}

.char-synth .char-arm.right.casting {
  transform: rotate(40deg) translateX(24px) translateY(-8px);
}

.char-celebrate .char-arm.left.up {
  transform: rotate(-60deg) translateX(-12px) translateY(-20px);
}

.char-celebrate .char-arm.right.up {
  transform: rotate(60deg) translateX(12px) translateY(-20px);
}

/* Character animations per step */
.char-search {
  animation: search-bob 1.5s ease-in-out infinite;
}

@keyframes search-bob {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-6px) rotate(2deg); }
}

.char-think {
  animation: think-nod 2s ease-in-out infinite;
}

@keyframes think-nod {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-3px) rotate(-1deg); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-3px) rotate(1deg); }
}

.char-match {
  animation: match-sway 1.8s ease-in-out infinite;
}

@keyframes match-sway {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-4px) rotate(3deg); }
}

.char-synth {
  animation: synth-hover 2s ease-in-out infinite;
}

@keyframes synth-hover {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.03); }
}

.char-celebrate {
  animation: celebrate-bounce 0.6s ease-in-out infinite alternate;
}

@keyframes celebrate-bounce {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-12px) scale(1.05); }
}

/* ===========================
   Step 0: Floating notes
   =========================== */
.float-notes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.note-card {
  position: absolute;
  width: 32px;
  height: 24px;
  background: #fff;
  border-radius: 4px;
  padding: 4px 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  opacity: 0;
  animation: note-float 2.5s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  top: 50%;
  left: 50%;
  transform: translate(
    calc(-50% + var(--dx, 0px)),
    calc(-50% + var(--dy, 0px))
  ) rotate(var(--rot, 0deg));
}

.note-card:nth-child(odd) {
  animation-direction: alternate;
}

.note-card-line {
  height: 3px;
  background: #eee;
  border-radius: 2px;
  margin-bottom: 3px;
}

.note-card-line.short {
  width: 60%;
}

@keyframes note-float {
  0%, 100% {
    opacity: 0;
    transform: translate(
      calc(-50% + var(--dx, 0px)),
      calc(-50% + var(--dy, 0px) + 20px)
    ) rotate(var(--rot, 0deg));
  }
  20%, 80% {
    opacity: 0.8;
  }
  50% {
    transform: translate(
      calc(-50% + var(--dx, 0px)),
      calc(-50% + var(--dy, 0px) - 10px)
    ) rotate(calc(var(--rot, 0deg) + 5deg));
  }
}

/* ===========================
   Step 1: Clustering dots
   =========================== */
.cluster-dots {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.c-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color, #ff2442);
  opacity: 0;
  animation: dot-cluster 2.2s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

.c-dot:nth-child(1) { --tx: -80px; --ty: -40px; }
.c-dot:nth-child(2) { --tx: 70px; --ty: -50px; }
.c-dot:nth-child(3) { --tx: 60px; --ty: 45px; }
.c-dot:nth-child(4) { --tx: -70px; --ty: 50px; }
.c-dot:nth-child(5) { --tx: -40px; --ty: -70px; }
.c-dot:nth-child(6) { --tx: 90px; --ty: 10px; }
.c-dot:nth-child(7) { --tx: -50px; --ty: 70px; }
.c-dot:nth-child(8) { --tx: 30px; --ty: -80px; }
.c-dot:nth-child(9) { --tx: 100px; --ty: -20px; }
.c-dot:nth-child(10) { --tx: -90px; --ty: 20px; }
.c-dot:nth-child(11) { --tx: 20px; --ty: 80px; }
.c-dot:nth-child(12) { --tx: -30px; --ty: -60px; }

@keyframes dot-cluster {
  0% {
    opacity: 0;
    transform: translate(var(--tx, 0px), var(--ty, 0px)) scale(0.3);
  }
  15% {
    opacity: 0.9;
  }
  45% {
    transform: translate(-15px, -8px) scale(1);
  }
  55% {
    transform: translate(-15px, -8px) scale(1.1);
    opacity: 0.9;
  }
  85% {
    transform: translate(calc(var(--tx, 0px) * -0.1), calc(var(--ty, 0px) * -0.1)) scale(0.9);
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx, 0px), var(--ty, 0px)) scale(0.3);
  }
}

/* ===========================
   Step 2: Matching orbit
   =========================== */
.orbit-container {
  position: absolute;
  width: 180px;
  height: 180px;
  pointer-events: none;
}

.orbit-avatar {
  position: absolute;
  width: 32px;
  height: 32px;
  top: 50%;
  left: 50%;
  margin: -16px 0 0 -16px;
  background: var(--bg-color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: orbit-rotate 3s linear infinite;
  animation-delay: var(--delay, 0s);
  opacity: 0;
  animation: orbit-appear 0.5s ease forwards, orbit-rotate 3s linear infinite;
  animation-delay: var(--delay, 0s), calc(var(--delay, 0s) + 0.5s);
}

.avatar-emoji {
  line-height: 1;
}

@keyframes orbit-appear {
  to { opacity: 1; }
}

@keyframes orbit-rotate {
  0% { transform: rotate(0deg) translateX(75px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(75px) rotate(-360deg); }
}

/* ===========================
   Step 3: Synthesizing portals
   =========================== */
.portal-rings {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.portal-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
  animation: ring-pulse 2s ease-in-out infinite;
}

.portal-ring.r1 {
  width: 160px;
  height: 160px;
  border-color: rgba(255, 36, 66, 0.15);
  animation-delay: 0s;
}

.portal-ring.r2 {
  width: 120px;
  height: 120px;
  border-color: rgba(168, 85, 247, 0.15);
  animation-delay: 0.3s;
}

.portal-ring.r3 {
  width: 80px;
  height: 80px;
  border-color: rgba(59, 130, 246, 0.15);
  animation-delay: 0.6s;
}

@keyframes ring-pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}

.world-glimmers {
  position: absolute;
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.world-entry {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  animation: world-glimmer 1.5s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.3s);
  opacity: 0;
}

@keyframes world-glimmer {
  0%, 100% {
    opacity: 0;
    transform: rotate(calc(var(--angle, 0deg))) translateY(-90px) rotate(calc(var(--angle, 0deg) * -1)) scale(0.5);
  }
  20%, 80% {
    opacity: 1;
  }
  50% {
    transform: rotate(calc(var(--angle, 0deg))) translateY(-90px) rotate(calc(var(--angle, 0deg) * -1)) scale(1.2);
  }
}

/* ===========================
   Step 4: Sparkles complete
   =========================== */
.sparkles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: #ff2442;
  border-radius: 50%;
  animation: sparkle-burst 1s ease-out infinite;
  animation-delay: var(--delay, 0s);
}

.sparkle:nth-child(3n) { background: #f97316; }
.sparkle:nth-child(3n+1) { background: #a855f7; }
.sparkle:nth-child(3n+2) { background: #3b82f6; }

@keyframes sparkle-burst {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(var(--x, 100px), var(--y, -50px)) scale(0.6);
  }
  100% {
    opacity: 0;
    transform: translate(var(--x, 100px), var(--y, -50px)) scale(0);
  }
}

/* ===========================
   Step indicators
   =========================== */
.step-indicators {
  display: flex;
  align-items: flex-start;
  gap: 0;
  width: 100%;
  margin-bottom: 16px;
}

.step-dot-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: relative;
}

.step-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  transition: all 0.3s;
  background: var(--bg-color-tertiary);
  color: var(--text-color-quaternary);
}

.step-dot.active {
  background: var(--primary-color);
  color: #fff;
  box-shadow: 0 0 0 4px rgba(255, 36, 66, 0.15);
}

.step-dot.done {
  background: #22c55e;
  color: #fff;
}

.dot-check {
  font-size: 12px;
}

.dot-spinner {
  width: 10px;
  height: 10px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: dot-spin 0.7s linear infinite;
}

@keyframes dot-spin {
  to { transform: rotate(360deg); }
}

.step-label {
  font-size: 10px;
  color: var(--text-color-quaternary);
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  transition: color 0.3s;
}

.step-label.active {
  color: var(--text-color-secondary);
}

/* Result text */
.result-text {
  font-size: 14px;
  color: var(--text-color-secondary);
  text-align: center;
  margin-bottom: 16px;
  padding: 10px 18px;
  background: var(--bg-color-secondary);
  border-radius: 10px;
  line-height: 1.4;
}

.result-fade-enter-active { animation: result-in 0.4s ease; }
.result-fade-leave-active { animation: result-out 0.2s ease; }

@keyframes result-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes result-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Progress bar */
.progress-track {
  width: 100%;
  max-width: 280px;
  height: 4px;
  border-radius: 2px;
  background: var(--bg-color-tertiary);
  overflow: visible;
  position: relative;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--primary-color), #f97316);
  transition: width 0.5s ease;
}

.progress-glow {
  position: absolute;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-color);
  box-shadow: 0 0 8px rgba(255, 36, 66, 0.6);
  transition: left 0.5s ease;
  animation: glow-pulse 1s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(255, 36, 66, 0.4); }
  50% { box-shadow: 0 0 16px rgba(255, 36, 66, 0.8); }
}
</style>