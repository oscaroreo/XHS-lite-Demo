<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DetailCard from '@/components/DetailCard.vue'
import { mockNotes } from '@/utils/mockData'

const route = useRoute()
const router = useRouter()

const noteId = computed(() => route.query.id)
const item = ref(null)
const notFound = ref(false)

onMounted(() => {
  const found = mockNotes.find(n => n.id === noteId.value)
  if (found) {
    item.value = { ...found }
  } else {
    notFound.value = true
  }
})

function goBack() {
  router.push('/')
}
</script>

<template>
  <div v-if="notFound" class="not-found">
    <p>笔记不存在</p>
    <button @click="goBack">返回首页</button>
  </div>
  <DetailCard
    v-else-if="item"
    :item="item"
    :pageMode="true"
    @close="goBack"
  />
</template>

<style scoped>
.not-found {
  padding: 80px 20px;
  text-align: center;
}

.not-found p {
  font-size: 16px;
  color: var(--text-color-secondary);
  margin-bottom: 16px;
}

.not-found button {
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  background: var(--primary-color);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}
</style>