<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import NoteCard from '@/components/NoteCard.vue'
import { mockNotes } from '@/utils/mockData'

const props = defineProps({
  refreshKey: { type: Number, default: 0 },
  category: { type: String, default: null },
})

const emit = defineEmits(['card-click', 'load-more'])

const items = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const hasMore = ref(true)
const loadedIds = ref(new Set())
const columnCount = ref(2)
const columnGap = ref(10)
const columns = ref([])

function updateColumnCount() {
  const w = window.innerWidth
  if (w >= 1420) { columnCount.value = 5; columnGap.value = 16 }
  else if (w >= 900) { columnCount.value = 4; columnGap.value = 15 }
  else if (w >= 600) { columnCount.value = 3; columnGap.value = 12 }
  else { columnCount.value = 2; columnGap.value = 10 }
}

function initColumns() {
  columns.value = Array.from({ length: columnCount.value }, () => [])
}

function getShortestColumnIndex() {
  let minIdx = 0
  for (let i = 1; i < columns.value.length; i++) {
    if (columns.value[i].length < columns.value[minIdx].length) {
      minIdx = i
    }
  }
  return minIdx
}

function distributeItems(newItems) {
  newItems.forEach(item => {
    const idx = getShortestColumnIndex()
    columns.value[idx].push(item)
  })
}

function loadInitial() {
  loading.value = true
  const data = props.category
    ? mockNotes.filter(n => n.tags.some(t => t.includes(props.category)))
    : mockNotes

  items.value = data.slice(0, 12)
  loadedIds.value = new Set(items.value.map(i => i.id))
  updateColumnCount()
  initColumns()
  distributeItems(items.value)

  setTimeout(() => { loading.value = false }, 300)
  hasMore.value = data.length > 12
}

function loadMore() {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true

  const data = props.category
    ? mockNotes.filter(n => n.tags.some(t => t.includes(props.category)))
    : mockNotes

  const start = items.value.length
  const batch = data.slice(start, start + 8)
  if (batch.length === 0) {
    hasMore.value = false
    loadingMore.value = false
    return
  }

  items.value.push(...batch)
  distributeItems(batch)

  hasMore.value = items.value.length < data.length
  loadingMore.value = false
}

let scrollTimer = null
function handleScroll() {
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const docHeight = document.documentElement.scrollHeight

    if (scrollTop + windowHeight >= docHeight - 300) {
      loadMore()
    }
  }, 200)
}

let resizeTimer = null
function handleResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    const old = columnCount.value
    updateColumnCount()
    if (old !== columnCount.value) {
      initColumns()
      distributeItems(items.value)
    }
  }, 300)
}

function onCardClick(item, event) {
  emit('card-click', item, event)
}

watch(() => props.refreshKey, () => loadInitial())
watch(() => props.category, () => loadInitial())

onMounted(() => {
  loadInitial()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  if (scrollTimer) clearTimeout(scrollTimer)
  if (resizeTimer) clearTimeout(resizeTimer)
})
</script>

<template>
  <!-- Loading skeleton -->
  <div v-if="loading" class="waterfall-skeleton">
    <div v-for="col in columnCount" :key="'skel-' + col" class="skeleton-column"
      :style="{ gap: columnGap + 'px' }">
      <div v-for="i in 3" :key="i" class="skeleton-card">
        <div class="sk-img"></div>
        <div class="sk-line sk-title"></div>
        <div class="sk-footer">
          <div class="sk-avatar"></div>
          <div class="sk-line sk-name"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Waterfall layout -->
  <div v-else class="waterfall-container">
    <div class="waterfall-columns" :style="{ gap: columnGap + 'px' }">
      <div v-for="(col, ci) in columns" :key="ci" class="waterfall-column"
        :style="{ gap: columnGap + 'px' }">
        <NoteCard
          v-for="item in col"
          :key="item.id"
          :item="item"
          :isLoaded="true"
          @card-click="onCardClick"
        />
      </div>
    </div>

    <div class="load-more-bar">
      <div v-if="loadingMore" class="loading-text">加载中...</div>
      <div v-else-if="!hasMore" class="no-more">
        <span class="no-more-text">没有更多内容了</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.waterfall-skeleton {
  display: flex;
  gap: 16px;
  padding: 16px 16px 0;
  width: 100%;
  box-sizing: border-box;
}

.skeleton-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.skeleton-card {
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-color-primary);
  border: 1px solid var(--border-color-secondary);
}

.sk-img {
  width: 100%;
  aspect-ratio: 3/4;
  background: linear-gradient(90deg, var(--bg-color-secondary) 25%, var(--bg-color-tertiary) 50%, var(--bg-color-secondary) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.sk-line {
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--bg-color-secondary) 25%, var(--bg-color-tertiary) 50%, var(--bg-color-secondary) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.sk-title {
  margin: 10px 10px 0;
  width: 80%;
}

.sk-footer {
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 6px;
}

.sk-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--bg-color-secondary) 25%, var(--bg-color-tertiary) 50%, var(--bg-color-secondary) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  flex-shrink: 0;
}

.sk-name {
  flex: 1;
  width: 50%;
}

.waterfall-container {
  width: 100%;
  position: relative;
  padding: 0 16px;
  box-sizing: border-box;
}

.waterfall-columns {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.load-more-bar {
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-text {
  color: var(--text-color-secondary);
  font-size: 14px;
}

.no-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

.no-more-text {
  color: var(--text-color-tertiary);
  font-size: 12px;
}

.no-more-text::before,
.no-more-text::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40px;
  height: 1px;
  background: var(--border-color-secondary);
}

.no-more-text::before { right: 100%; margin-right: 10px; }
.no-more-text::after { left: 100%; margin-left: 10px; }
</style>