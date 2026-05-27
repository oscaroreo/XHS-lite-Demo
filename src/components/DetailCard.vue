<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  item: { type: Object, required: true },
  clickPosition: { type: Object, default: () => ({ x: 0, y: 0 }) },
})

const emit = defineEmits(['close'])

const currentImageIndex = ref(0)
const isAnimating = ref(true)
const showContent = ref(false)
const isClosing = ref(false)
const isLiked = ref(props.item.liked || false)
const isCollected = ref(props.item.collected || false)
const likeCount = ref(props.item.likeCount || 0)
const collectCount = ref(props.item.collectCount || 0)

const imageList = computed(() => {
  return props.item.images && props.item.images.length > 0
    ? props.item.images
    : [props.item.image]
})

const hasMultipleImages = computed(() => imageList.value.length > 1)

function prevImage() {
  if (currentImageIndex.value > 0) currentImageIndex.value--
}

function nextImage() {
  if (currentImageIndex.value < imageList.value.length - 1) currentImageIndex.value++
}

function goToImage(index) {
  currentImageIndex.value = index
}

function handleAnimationEnd(event) {
  if (event.target.classList.contains('detail-card')) {
    if (isClosing.value) {
      emit('close')
    } else {
      isAnimating.value = false
      showContent.value = true
    }
  }
}

function closeModal() {
  if (isClosing.value) return
  isClosing.value = true
  showContent.value = false
}

function toggleLike() {
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
}

function toggleCollect() {
  isCollected.value = !isCollected.value
  collectCount.value += isCollected.value ? 1 : -1
}

function handleShare() {
  navigator.clipboard?.writeText(`【${props.item.title}】分享自XHS-lite-Demo`)
}

function handleOverlayClick(e) {
  if (e.target === e.currentTarget) closeModal()
}

function handleKeydown(e) {
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  setTimeout(() => {
    if (!showContent.value) showContent.value = true
  }, 400)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    class="detail-overlay"
    :class="{ 'closing': isClosing }"
    @click="handleOverlayClick"
  >
    <button class="close-btn" @click="closeModal">
      <SvgIcon name="close" width="20" height="20" color="#fff" />
    </button>

    <div
      class="detail-card"
      :class="{
        'scale-in': isAnimating && !isClosing,
        'scale-out': isClosing,
      }"
      @animationend="handleAnimationEnd"
    >
      <div class="detail-content">
        <!-- Image section -->
        <div class="image-section">
          <div class="image-container">
            <div
              class="image-slider"
              :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }"
            >
              <img
                v-for="(img, idx) in imageList"
                :key="idx"
                :src="img"
                :alt="item.title"
                class="slider-image"
              />
            </div>

            <div v-if="hasMultipleImages" class="image-nav">
              <button
                class="nav-btn prev"
                :class="{ hidden: currentImageIndex === 0 }"
                @click.stop="prevImage"
              >
                <SvgIcon name="left" width="16" height="16" color="#fff" />
              </button>
              <button
                class="nav-btn next"
                :class="{ hidden: currentImageIndex === imageList.length - 1 }"
                @click.stop="nextImage"
              >
                <SvgIcon name="right" width="16" height="16" color="#fff" />
              </button>
              <div class="image-counter">
                {{ currentImageIndex + 1 }}/{{ imageList.length }}
              </div>
            </div>

            <div v-if="hasMultipleImages" class="mobile-dots">
              <span
                v-for="(img, idx) in imageList"
                :key="idx"
                class="dot"
                :class="{ active: idx === currentImageIndex }"
                @click="goToImage(idx)"
              ></span>
            </div>
          </div>
        </div>

        <!-- Content section -->
        <div class="content-section">
          <!-- Author -->
          <div class="author-bar">
            <img :src="item.avatar" :alt="item.author" class="author-avatar" />
            <div class="author-info">
              <span class="author-name">{{ item.author }}</span>
              <span class="author-time">{{ item.createTime }}</span>
            </div>
          </div>

          <div class="scrollable-content">
            <!-- Post body -->
            <div class="post-body">
              <h2 class="post-title">{{ item.title }}</h2>
              <p class="post-text">{{ item.content }}</p>
              <div class="post-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">#{{ tag }}</span>
              </div>
              <div class="post-meta">
                <span>{{ item.createTime }}</span>
                <span v-if="item.location">{{ item.location }}</span>
              </div>
            </div>

            <div class="divider"></div>

            <!-- Comments -->
            <div class="comments-section">
              <div class="comments-header">共 {{ item.commentCount }} 条评论</div>
              <div v-for="comment in item.comments" :key="comment.id" class="comment-item">
                <img :src="comment.avatar" :alt="comment.username" class="comment-avatar" />
                <div class="comment-body">
                  <div class="comment-user">{{ comment.username }}</div>
                  <div class="comment-text">{{ comment.content }}</div>
                  <div class="comment-footer">
                    <span class="comment-time">{{ comment.time }}</span>
                    <span class="comment-likes">
                      <SvgIcon name="like" width="12" height="12" />
                      {{ comment.likes }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom action bar -->
          <div class="action-bar">
            <div class="action-btn" :class="{ active: isLiked }" @click="toggleLike">
              <SvgIcon :name="isLiked ? 'liked' : 'like'" width="22" height="22" />
              <span>{{ likeCount }}</span>
            </div>
            <div class="action-btn" :class="{ active: isCollected }" @click="toggleCollect">
              <SvgIcon :name="isCollected ? 'collected' : 'collect'" width="22" height="22" />
              <span>{{ collectCount }}</span>
            </div>
            <div class="action-btn">
              <SvgIcon name="chat" width="22" height="22" />
              <span>{{ item.commentCount }}</span>
            </div>
            <div class="action-btn" @click="handleShare">
              <SvgIcon name="share" width="22" height="22" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--overlay-bg);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  animation: overlayIn 0.3s ease;
}

.detail-overlay.closing {
  animation: overlayOut 0.2s ease forwards;
}

@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes overlayOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.close-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.detail-card {
  display: flex;
  background: var(--bg-color-primary);
  border-radius: 16px;
  overflow: hidden;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.detail-card.scale-in {
  animation: scaleIn 0.35s ease;
}

.detail-card.scale-out {
  animation: scaleOut 0.25s ease forwards;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes scaleOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.92); }
}

.detail-content {
  display: flex;
  height: 100%;
  max-height: 90vh;
}

/* Image section */
.image-section {
  width: 50%;
  max-width: 600px;
  min-width: 350px;
  background: #000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.image-slider {
  display: flex;
  height: 100%;
  transition: transform 0.3s ease;
}

.slider-image {
  min-width: 100%;
  height: 100%;
  object-fit: contain;
  flex-shrink: 0;
}

.image-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.6);
}

.nav-btn.hidden {
  display: none;
}

.nav-btn.prev { left: 12px; }
.nav-btn.next { right: 12px; }

.image-counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 13px;
  padding: 3px 10px;
  border-radius: 12px;
  pointer-events: none;
}

.mobile-dots {
  display: none;
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
}

.dot.active {
  background: #fff;
  width: 18px;
  border-radius: 3px;
}

/* Content section */
.content-section {
  width: 360px;
  display: flex;
  flex-direction: column;
  background: var(--bg-color-primary);
}

.author-bar {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 10px;
  border-bottom: 1px solid var(--border-color-secondary);
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.author-time {
  font-size: 12px;
  color: var(--text-color-tertiary);
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px;
  color: var(--text-color-primary);
}

.post-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color-secondary);
  margin: 0 0 12px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.tag {
  font-size: 13px;
  color: var(--text-color-tag);
  cursor: pointer;
}

.tag:hover {
  color: var(--primary-color);
}

.post-meta {
  font-size: 12px;
  color: var(--text-color-quaternary);
  display: flex;
  gap: 12px;
}

.divider {
  height: 1px;
  background: var(--border-color-secondary);
  margin: 16px 0;
}

.comments-header {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
  color: var(--text-color-primary);
}

.comment-item {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.comment-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
}

.comment-body {
  flex: 1;
}

.comment-user {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color-primary);
  margin-bottom: 3px;
}

.comment-text {
  font-size: 13px;
  color: var(--text-color-secondary);
  line-height: 1.4;
  margin-bottom: 4px;
}

.comment-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: var(--text-color-quaternary);
}

.comment-likes {
  display: flex;
  align-items: center;
  gap: 3px;
}

/* Action bar */
.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 16px;
  border-top: 1px solid var(--border-color-secondary);
  background: var(--bg-color-primary);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-color-secondary);
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
  border: none;
  background: transparent;
}

.action-btn:hover {
  background: var(--bg-color-secondary);
  color: var(--text-color-primary);
}

.action-btn.active {
  color: var(--primary-color);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .detail-card {
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .detail-content {
    flex-direction: column;
  }

  .image-section {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: 40vh;
  }

  .content-section {
    width: 100%;
    flex: 1;
    min-height: 0;
  }

  .mobile-dots {
    display: flex;
  }

  .image-nav .nav-btn {
    display: flex;
  }

  .close-btn {
    top: 12px;
    left: 12px;
  }
}
</style>