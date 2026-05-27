<script setup>
import { ref, computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import TabContainer from '@/components/TabContainer.vue'
import WaterfallFlow from '@/components/WaterfallFlow.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import DetailCard from '@/components/DetailCard.vue'
import { channels, mockNotes } from '@/utils/mockData'

const activeChannel = ref('recommend')
const refreshKey = ref(0)
const isChannelLoading = ref(false)
const showDetailCard = ref(false)
const selectedItem = ref(null)
const clickPosition = ref({ x: 0, y: 0 })

// Search
const showSearch = ref(false)
const searchText = ref('')

const filteredNotes = computed(() => {
  if (!searchText.value.trim()) return mockNotes
  const kw = searchText.value.toLowerCase()
  return mockNotes.filter(n =>
    n.title.toLowerCase().includes(kw) ||
    n.content.toLowerCase().includes(kw) ||
    n.tags.some(t => t.includes(kw))
  )
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
</style>