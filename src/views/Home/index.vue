<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import TabContainer from '@/components/TabContainer.vue'
import WaterfallFlow from '@/components/WaterfallFlow.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import DetailCard from '@/components/DetailCard.vue'
import DemoCaseCard from '@/components/regret/DemoCaseCard.vue'
import DecisionEntry from '@/components/regret/DecisionEntry.vue'
import RegretPill from '@/components/regret/RegretPill.vue'
import { channels, mockNotes } from '@/utils/mockData'
import { decisionCases, isDecisionQuestion } from '@/utils/regretData'

const router = useRouter()
const activeChannel = ref('recommend')
const refreshKey = ref(0)
const isChannelLoading = ref(false)
const showDetailCard = ref(false)
const selectedItem = ref(null)
const clickPosition = ref({ x: 0, y: 0 })

// Search
const showSearch = ref(false)
const searchText = ref('')

// Regret pill overlay
const showOverlay = ref(false)
const analyzing = ref(false)
const inferredCase = ref(null)

const filteredNotes = computed(() => {
  if (!searchText.value.trim()) return mockNotes
  const kw = searchText.value.toLowerCase()
  return mockNotes.filter(n =>
    n.title.toLowerCase().includes(kw) ||
    n.content.toLowerCase().includes(kw) ||
    n.tags.some(t => t.includes(kw))
  )
})

const showDecisionEntry = computed(() => {
  return searchText.value.trim() && isDecisionQuestion(searchText.value)
})

function handleTabChange(item) {
  if (activeChannel.value === item.id) return
  activeChannel.value = item.id
  isChannelLoading.value = true
  refreshKey.value++
  setTimeout(() => {
    isChannelLoading.value = false
  }, 700)
}

function handleCardClick(item, event) {
  clickPosition.value = { x: event.clientX, y: event.clientY }
  selectedItem.value = { ...item }
  showDetailCard.value = true
}

function closeDetail() {
  showDetailCard.value = false
  selectedItem.value = null
}

function handleSearch(e) {
  if (e.key === 'Enter') {
    // Already filtered via computed
  }
}

// Regret navigation
function navigateToSim(caseId) {
  router.push({ path: '/regret-sim', query: { caseId } })
}

function startSimulation(caseId) {
  navigateToSim(caseId)
}

// ---- Regret Pill ----
function handlePillClick() {
  showOverlay.value = true
  analyzing.value = true
  inferredCase.value = null

  // Simulate analysis: infer a decision case from "user browsing history"
  setTimeout(() => {
    analyzing.value = false
    // Pick the first decision case as the "inferred" one
    inferredCase.value = decisionCases[0]
  }, 1800)
}

function closeOverlay() {
  showOverlay.value = false
  analyzing.value = false
  inferredCase.value = null
}

function confirmRegret() {
  if (inferredCase.value) {
    showOverlay.value = false
    navigateToSim(inferredCase.value.id)
  }
}

// Close overlay on Escape key
function onKeydown(e) {
  if (e.key === 'Escape' && showOverlay.value) closeOverlay()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="explore-container">
    <!-- Header -->
    <header class="app-header">
      <div class="header-inner">
        <div class="logo" @click="activeChannel = 'recommend'; refreshKey++">
          <span class="logo-icon">
            <SvgIcon name="home" width="20" height="20" color="var(--button-text-color)" />
          </span>
        </div>
        <div class="search-bar" :class="{ expanded: showSearch }">
          <input
            v-model="searchText"
            type="text"
            placeholder="搜索笔记..."
            @focus="showSearch = true"
            @blur="setTimeout(() => showSearch = false, 200)"
            @keypress="handleSearch"
          />
          <SvgIcon name="search" class="search-icon" width="18" height="18" />
        </div>
        <div class="header-actions">
          <button class="theme-toggle" @click="$emit('toggle-theme')">
            <SvgIcon name="sun" width="20" height="20" />
          </button>
        </div>
      </div>
    </header>

    <!-- Channel tabs -->
    <div class="channel-wrapper">
      <TabContainer
        :tabs="channels"
        :activeTab="activeChannel"
        :enableDrag="true"
        @tab-change="handleTabChange"
      />
    </div>

    <!-- Loading indicator -->
    <LoadingSpinner v-if="isChannelLoading" />

    <!-- Main content -->
    <div class="explore-main" :class="{ 'with-loading': isChannelLoading }">
      <!-- Search results -->
      <div v-if="searchText.trim()" class="search-results">
        <DecisionEntry
          v-if="showDecisionEntry"
          :search-text="searchText"
          @start-simulation="startSimulation"
          @select-case="navigateToSim"
        />
        <div class="search-header">
          搜索 "{{ searchText }}" 共 {{ filteredNotes.length }} 条结果
        </div>
        <div v-if="filteredNotes.length === 0" class="empty-state">
          没有找到相关内容
        </div>
        <div v-else class="search-grid">
          <div
            v-for="item in filteredNotes"
            :key="item.id"
            class="search-card"
            @click="handleCardClick(item, $event)"
          >
            <img :src="item.image" :alt="item.title" />
            <div class="search-card-info">
              <div class="search-card-title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 瞬息小红薯频道 -->
      <div v-else-if="activeChannel === 'regret'" class="regret-channel">
        <div class="channel-intro">
          <h2 class="channel-title">🌀 瞬息小红薯</h2>
          <p class="channel-desc">在做决定前，看看平行世界里的你。基于社区真实经验的平行生活预演器。</p>
        </div>
        <div class="channel-cases">
          <DemoCaseCard
            v-for="dc in decisionCases"
            :key="dc.id"
            :case-data="dc"
            @click="navigateToSim(dc.id)"
          />
        </div>
        <div class="channel-footer">
          <p class="footer-text">选择你想预演的决策，看看平行世界里的你</p>
        </div>
      </div>

      <!-- Waterfall (default) -->
      <WaterfallFlow
        v-else
        :key="'wf-' + activeChannel"
        :refreshKey="refreshKey"
        :category="activeChannel === 'recommend' ? null : activeChannel"
        @card-click="handleCardClick"
      />
    </div>

    <!-- Detail modal -->
    <Teleport to="body">
      <DetailCard
        v-if="showDetailCard && selectedItem"
        :item="selectedItem"
        :click-position="clickPosition"
        @close="closeDetail"
      />
    </Teleport>

    <!-- Regret Pill FAB -->
    <RegretPill @click="handlePillClick" />

    <!-- Analysis overlay -->
    <Teleport to="body">
      <div v-if="showOverlay" class="overlay-mask" @click.self="closeOverlay">
        <div class="overlay-card" @click.stop>
          <!-- Analyzing state -->
          <template v-if="analyzing">
            <div class="overlay-analyzing">
              <div class="analyzing-icon">🌀</div>
              <div class="analyzing-title">正在分析你的浏览记录...</div>
              <div class="analyzing-spinner">
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
              </div>
            </div>
          </template>

          <!-- Result state -->
          <template v-else-if="inferredCase">
            <div class="overlay-result">
              <div class="result-badge">根据你的浏览记录</div>
              <p class="result-hint">我们注意到你最近看了很多相关的内容</p>
              <p class="result-question">你是不是在考虑...</p>
              <div class="result-subtitle">看看平行世界里的你，做了这个选择后会怎样</div>
              <div class="result-case">
                <span class="result-emoji">{{ inferredCase.emoji }}</span>
                <span class="result-title">{{ inferredCase.title }}</span>
              </div>
              <div class="result-actions">
                <button class="action-btn primary" @click="confirmRegret">
                  🌀 看看平行世界的我
                </button>
                <button class="action-btn secondary" @click="closeOverlay">
                  算了
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.explore-container {
  padding-top: 60px;
  min-height: 100vh;
  background: var(--bg-color-primary);
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  transition: background-color 0.2s ease;
}

/* Header */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;
  background: var(--bg-color-primary);
  border-bottom: 1px solid var(--border-color-primary);
}

.header-inner {
  max-width: 1500px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.search-bar {
  flex: 1;
  max-width: 480px;
  position: relative;
}

.search-bar input {
  width: 100%;
  height: 38px;
  border-radius: 19px;
  border: none;
  background: var(--bg-color-secondary);
  padding: 0 38px 0 16px;
  font-size: 14px;
  color: var(--text-color-primary);
  outline: none;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
}

.search-bar input::placeholder {
  color: var(--text-color-quaternary);
}

.search-bar input:focus {
  background: var(--bg-color-tertiary);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color-quaternary);
  pointer-events: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-secondary);
  transition: background 0.2s;
}

.theme-toggle:hover {
  background: var(--bg-color-secondary);
  color: var(--text-color-primary);
}

/* Channel wrapper */
.channel-wrapper {
  width: 100%;
}

/* Explore main */
.explore-main {
  padding-bottom: 20px;
  transition: margin-top 0.3s ease;
}

.explore-main.with-loading {
  margin-top: 40px;
}

/* Search results */
.search-results {
  padding: 16px;
}

.search-header {
  font-size: 14px;
  color: var(--text-color-tertiary);
  margin-bottom: 16px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-color-tertiary);
  font-size: 15px;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.search-card {
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-color-primary);
  border: 1px solid var(--border-color-secondary);
  transition: transform 0.2s;
}

.search-card:hover {
  transform: translateY(-2px);
}

.search-card img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  display: block;
}

.search-card-title {
  padding: 8px 10px;
  font-size: 13px;
  color: var(--text-color-primary);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

/* regret channel */
.channel-intro {
  text-align: center;
  padding: 32px 20px 16px;
}

.channel-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 0 8px;
}

.channel-desc {
  font-size: 14px;
  color: var(--text-color-tertiary);
  margin: 0;
}

.channel-cases {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 0 16px;
}

.channel-footer {
  text-align: center;
  padding: 32px 20px;
}

.footer-text {
  font-size: 13px;
  color: var(--text-color-quaternary);
  margin: 0;
}

/* Overlay */
.overlay-mask {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: mask-in 0.3s ease;
}

@keyframes mask-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.overlay-card {
  background: var(--bg-color-primary);
  border-radius: 20px;
  padding: 36px 32px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: card-in 0.35s ease;
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Analyzing state */
.overlay-analyzing {
  text-align: center;
  padding: 12px 0;
}

.analyzing-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: pulse-icon 1.5s ease-in-out infinite;
}

@keyframes pulse-icon {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}

.analyzing-title {
  font-size: 17px;
  font-weight: 500;
  color: var(--text-color-primary);
  margin-bottom: 20px;
}

.analyzing-spinner {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.spinner-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary-color);
  animation: dot-bounce 1.2s ease-in-out infinite;
}

.spinner-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.spinner-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-12px); opacity: 1; }
}

/* Result state */
.overlay-result {
  text-align: center;
}

.result-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  background: var(--bg-color-secondary);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-color-tertiary);
  margin-bottom: 12px;
}

.result-hint {
  font-size: 14px;
  color: var(--text-color-secondary);
  margin: 0 0 4px;
}

.result-question {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-color-primary);
  margin: 0 0 4px;
}

.result-subtitle {
  font-size: 12px;
  color: var(--text-color-tertiary);
  margin: 0 0 20px;
}

.result-case {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 20px;
  border-radius: 14px;
  background: var(--bg-color-secondary);
  border: 1px solid var(--border-color-secondary);
  margin-bottom: 24px;
}

.result-emoji {
  font-size: 28px;
}

.result-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color-primary);
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  padding: 13px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.action-btn.primary {
  background: linear-gradient(135deg, var(--primary-color), #d91a3a);
  color: #fff;
  box-shadow: 0 4px 16px rgba(255, 36, 66, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(255, 36, 66, 0.4);
}

.action-btn.secondary {
  background: transparent;
  color: var(--text-color-tertiary);
}

.action-btn.secondary:hover {
  color: var(--text-color-secondary);
}
</style>