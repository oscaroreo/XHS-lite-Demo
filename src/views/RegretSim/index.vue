<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AIGenerationProgress from '@/components/regret/AIGenerationProgress.vue'
import TimelineView from '@/components/regret/TimelineView.vue'
import ParallelWorlds from '@/components/regret/ParallelWorlds.vue'
import DetailCard from '@/components/DetailCard.vue'
import { decisionCases, computeTimeline } from '@/utils/regretData'
import { mockNotes } from '@/utils/mockData'

const route = useRoute()
const router = useRouter()

const phase = ref('generating') // 'generating' | 'timeline' | 'worlds'
const timelineResult = ref(null)
const currentCase = ref(null)

// DetailCard
const showDetailCard = ref(false)
const selectedNote = ref(null)
const clickPosition = ref({ x: 0, y: 0 })

// Default tags (inferred from "user history")
const defaultTags = {
  chongqing: { gender: 'female', personality: 'introvert', budget: 'low', experience: 'novice' },
  camera: { gender: 'female', budget: 'low', passion: 'casual' },
  kitchen: { gender: 'female', cooking: 'sometimes', homeType: 'small' },
}

onMounted(() => {
  const q = route.query.q
  const caseId = route.query.caseId

  if (caseId) {
    currentCase.value = decisionCases.find(d => d.id === caseId) || decisionCases[0]
  } else if (q) {
    const matched = decisionCases.find(d =>
      ['重庆', '旅行', '相机', '摄影', '厨房', '装修'].some(k => q.includes(k))
    )
    currentCase.value = matched || decisionCases[0]
  } else {
    currentCase.value = decisionCases[0]
  }
})

function handleGenerationComplete() {
  const cid = currentCase.value.id
  const tags = defaultTags[cid] || defaultTags.chongqing
  timelineResult.value = computeTimeline(cid, tags)
  phase.value = 'timeline'
}

function handleViewWorlds() {
  phase.value = 'worlds'
}

function handleRestart() {
  phase.value = 'generating'
  timelineResult.value = null
}

function handleGoHome() {
  router.push('/')
}

function handleShowNote() {
  const note = mockNotes[Math.floor(Math.random() * mockNotes.length)]
  if (note) {
    selectedNote.value = { ...note }
    showDetailCard.value = true
  }
}

function closeDetail() {
  showDetailCard.value = false
  selectedNote.value = null
}
</script>

<template>
  <div class="regret-sim" v-if="currentCase">
    <!-- AI Generation Progress -->
    <AIGenerationProgress
      v-if="phase === 'generating'"
      :case-data="currentCase"
      @complete="handleGenerationComplete"
    />

    <!-- Timeline phase -->
    <TimelineView
      v-if="phase === 'timeline' && timelineResult"
      :days="timelineResult.days"
      :matched-user-count="timelineResult.matchedUserCount"
      @show-note="handleShowNote"
      @view-endings="handleViewWorlds"
    />

    <!-- Parallel Worlds phase -->
    <ParallelWorlds
      v-if="phase === 'worlds' && timelineResult"
      :worlds="timelineResult.worlds"
      :recommended="timelineResult.recommended"
      @restart="handleRestart"
      @go-home="handleGoHome"
    />

    <!-- DetailCard overlay -->
    <Teleport to="body">
      <DetailCard
        v-if="showDetailCard && selectedNote"
        :item="selectedNote"
        :click-position="clickPosition"
        @close="closeDetail"
      />
    </Teleport>
  </div>
</template>

<style scoped>
.regret-sim {
  min-height: 100vh;
  background: var(--bg-color-primary);
  padding-top: 20px;
  max-width: 1500px;
  margin: 0 auto;
}
</style>