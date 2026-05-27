<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  isLoaded: { type: Boolean, default: false },
})

const emit = defineEmits(['card-click', 'image-loaded', 'avatar-loaded'])

function handleClick(event) {
  emit('card-click', props.item, event)
}

function onImageLoad() {
  emit('image-loaded', props.item.id)
}

function onAvatarLoad() {
  emit('avatar-loaded', props.item.id)
}

function imgError(e) {
  e.target.src = `https://via.placeholder.com/300x400?text=加载失败`
}
</script>

<template>
  <div class="note-card" :data-item-id="item.id" @click="handleClick">
    <div class="card-image">
      <img
        v-if="isLoaded"
        :src="item.image"
        :alt="item.title"
        @load="onImageLoad"
        @error="imgError"
      />
      <div v-else class="image-skeleton"></div>
    </div>
    <div class="card-title">{{ item.title }}</div>
    <div class="card-footer">
      <img
        v-if="isLoaded"
        :src="item.avatar"
        :alt="item.author"
        class="author-avatar"
        @load="onAvatarLoad"
        @error="imgError"
      />
      <div v-else class="avatar-skeleton"></div>
      <span class="author-name">{{ item.author }}</span>
      <div class="like-count">
        <svg class="heart-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span>{{ item.likeCount }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-card {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--bg-color-primary);
  cursor: pointer;
  transition: transform 0.2s ease;
  border: 1px solid var(--border-color-secondary);
}

.note-card:hover {
  transform: translateY(-2px);
}

.card-image {
  width: 100%;
  overflow: hidden;
  background-color: var(--bg-color-tertiary);
}

.card-image img {
  width: 100%;
  display: block;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.card-image img:hover {
  filter: brightness(0.7);
}

.image-skeleton {
  width: 100%;
  aspect-ratio: 3/4;
  background: linear-gradient(90deg, var(--bg-color-secondary) 25%, var(--bg-color-tertiary) 50%, var(--bg-color-secondary) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.card-title {
  margin: 6px 10px 0;
  font-size: 14px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  color: var(--text-color-primary);
}

.card-footer {
  display: flex;
  align-items: center;
  padding: 8px 10px 10px;
  gap: 6px;
}

.author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
}

.avatar-skeleton {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(90deg, var(--bg-color-secondary) 25%, var(--bg-color-tertiary) 50%, var(--bg-color-secondary) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.author-name {
  font-size: 12px;
  color: var(--text-color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.like-count {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: var(--text-color-tertiary);
  flex-shrink: 0;
}

.heart-icon {
  color: var(--text-color-tertiary);
}
</style>