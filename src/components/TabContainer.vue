<script setup>
import { ref, nextTick, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  tabs: { type: Array, required: true },
  activeTab: { type: [String, Number], default: '' },
  enableDrag: { type: Boolean, default: false },
  highlightedTabId: { type: String, default: '' },
})

const emit = defineEmits(['tab-change'])

const containerRef = ref(null)
const tabItems = ref([])
const activeId = ref(props.activeTab || (props.tabs.length > 0 ? props.tabs[0].id : ''))
const sliderLeft = ref(0)
const sliderWidth = ref(0)

function tabSelected(item) {
  if (activeId.value === item.id) return
  emit('tab-change', item)
}

const updateSlider = () => {
  nextTick(() => {
    const activeIndex = props.tabs.findIndex(tab => tab.id === activeId.value)
    if (activeIndex === -1 || !tabItems.value[activeIndex]) return

    const tabRect = tabItems.value[activeIndex].getBoundingClientRect()
    const containerRect = containerRef.value.getBoundingClientRect()

    if (containerRect.width === 0 || tabRect.width === 0) {
      setTimeout(updateSlider, 50)
      return
    }

    sliderLeft.value = tabRect.left - containerRect.left + containerRef.value.scrollLeft
    sliderWidth.value = tabRect.width
  })
}

let isDown = false, startX = 0, scrollLeft = 0

function onMouseDown(e) {
  if (!props.enableDrag) return
  isDown = true; startX = e.pageX - containerRef.value.offsetLeft
  scrollLeft = containerRef.value.scrollLeft
  containerRef.value.classList.add('dragging')
}

function onMouseLeave() {
  if (!props.enableDrag) return
  isDown = false; containerRef.value.classList.remove('dragging')
}

function onMouseUp() {
  if (!props.enableDrag) return
  isDown = false; containerRef.value.classList.remove('dragging')
}

function onMouseMove(e) {
  if (!props.enableDrag || !isDown) return
  e.preventDefault()
  containerRef.value.scrollLeft = scrollLeft - (e.pageX - containerRef.value.offsetLeft - startX)
}

watch(() => props.activeTab, (newVal) => {
  activeId.value = newVal; nextTick(updateSlider)
})

onMounted(() => {
  nextTick(updateSlider)
  window.addEventListener('resize', updateSlider)
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', updateSlider)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlider)
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', updateSlider)
  }
})
</script>

<template>
  <div class="tab-container" ref="containerRef" @mousedown="onMouseDown" @mouseleave="onMouseLeave"
    @mouseup="onMouseUp" @mousemove="onMouseMove">
    <div v-for="(item, index) in tabs" :key="item.id"
      :class="{
        active: activeId === item.id,
        highlighted: item.id === highlightedTabId && activeId !== item.id
      }"
      class="tab-item" @click="tabSelected(item)" :ref="el => { if (el) tabItems[index] = el }">
      {{ item.label }}
    </div>
    <div class="tab-slider" :style="{ left: sliderLeft + 'px', width: sliderWidth + 'px' }"></div>
  </div>
</template>

<style scoped>
.tab-container {
  position: relative;
  height: 85px;
  background: var(--bg-color-primary);
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0px 12px;
  box-sizing: border-box;
  width: 100%;
  max-width: 100vw;
  transition: background-color 0.2s ease;
}

.tab-container::-webkit-scrollbar { display: none; }
.tab-container.dragging { cursor: grabbing; }

.tab-item {
  height: 40px;
  font-size: 16px;
  color: var(--text-color-secondary);
  cursor: pointer;
  background: transparent;
  border-radius: 999px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  flex-shrink: 0;
  user-select: none;
  padding: 0 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  position: relative;
  z-index: 2;
}

.tab-item:hover {
  background: var(--bg-color-secondary);
  color: var(--text-color-primary);
}

@media (hover: none) {
  .tab-item:hover {
    background: transparent;
    color: var(--text-color-secondary);
  }
  .tab-item.active:hover { color: var(--text-color-primary); }
}

.tab-item.active {
  color: var(--text-color-primary);
  font-weight: bold;
  background: transparent;
}

.tab-item.highlighted {
  color: var(--primary-color);
  font-weight: 600;
  position: relative;
}

.tab-item.highlighted::after {
  content: '';
  position: absolute;
  top: 4px;
  right: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-color);
  animation: hot-dot-pulse 1.5s ease-in-out infinite;
}

@keyframes hot-dot-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

.tab-slider {
  position: absolute;
  height: 40px;
  border-radius: 20px;
  background: var(--bg-color-secondary);
  transition: left 0.25s ease-out, width 0.25s ease-out, background-color 0.2s ease;
  z-index: 1;
  bottom: 22.5px;
}
</style>