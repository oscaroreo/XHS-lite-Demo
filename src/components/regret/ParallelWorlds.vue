<script setup>
import { ref } from 'vue'

const props = defineProps({
  worlds: { type: Array, required: true },
  recommended: { type: Object, required: true },
})

const emit = defineEmits(['restart', 'go-home'])

const expandedWorld = ref(null)
const expandedSources = ref({})

function toggleWorld(worldId) {
  expandedWorld.value = expandedWorld.value === worldId ? null : worldId
}

function toggleSources(worldId) {
  expandedSources.value[worldId] = !expandedSources.value[worldId]
}

function scoreColor(score) {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#f5a623'
  return '#ef4444'
}

function thrillColor(level) {
  const map = { '高': '#22c55e', '中高': '#86efac', '中': '#f5a623', '低': '#9ca3af' }
  return map[level] || '#9ca3af'
}

function riskColor(level) {
  const map = { '低': '#22c55e', '中': '#f5a623', '中高': '#fb923c', '高': '#ef4444' }
  return map[level] || '#9ca3af'
}
</script>

<template>
  <div class="parallel-worlds">
    <!-- Header -->
    <div class="worlds-header">
      <div class="header-icon">🌀</div>
      <h2>你的平行宇宙</h2>
      <p>基于社区真实经验，为你合成 {{ worlds.length }} 种可能的生活分支</p>
    </div>

    <!-- Universe cards -->
    <div class="worlds-list">
      <div
        v-for="world in worlds"
        :key="world.id"
        class="world-card"
        :class="{
          recommended: world.id === recommended.id,
          expanded: expandedWorld === world.id,
        }"
        @click="toggleWorld(world.id)"
      >
        <div class="world-card-top">
          <div class="world-badge" v-if="world.id === recommended.id">最适合你</div>
          <div class="world-emoji">{{ world.emoji }}</div>
          <div class="world-name">{{ world.name }}</div>
          <div class="world-title">{{ world.title }}</div>
          <div class="world-scores-mini">
            <span class="mini-score" :style="{ color: thrillColor(world.scores.thrill) }">
              爽感 {{ world.scores.thrill }}
            </span>
            <span class="mini-divider">·</span>
            <span class="mini-score" :style="{ color: riskColor(world.scores.regretRisk) }">
              风险 {{ world.scores.regretRisk }}
            </span>
            <span class="mini-divider">·</span>
            <span class="mini-score fit" :style="{ color: scoreColor(world.scores.fitScore) }">
              匹配 {{ world.scores.fitScore }}%
            </span>
          </div>
        </div>

        <!-- Expanded content -->
        <div v-if="expandedWorld === world.id" class="world-expand" @click.stop>
          <p class="world-narrative">{{ world.narrative }}</p>

          <!-- Scoring detail -->
          <div class="score-detail">
            <div class="score-row">
              <span class="score-label">爽感</span>
              <div class="score-bar-track">
                <div
                  class="score-bar-fill"
                  :style="{
                    width: world.scores.thrill === '高' ? '90%' : world.scores.thrill === '中高' ? '70%' : world.scores.thrill === '中' ? '50%' : '25%',
                    background: thrillColor(world.scores.thrill),
                  }"
                ></div>
              </div>
              <span class="score-value" :style="{ color: thrillColor(world.scores.thrill) }">{{ world.scores.thrill }}</span>
            </div>
            <div class="score-row">
              <span class="score-label">后悔风险</span>
              <div class="score-bar-track">
                <div
                  class="score-bar-fill"
                  :style="{
                    width: world.scores.regretRisk === '高' ? '90%' : world.scores.regretRisk === '中高' ? '70%' : world.scores.regretRisk === '中' ? '50%' : '25%',
                    background: riskColor(world.scores.regretRisk),
                  }"
                ></div>
              </div>
              <span class="score-value" :style="{ color: riskColor(world.scores.regretRisk) }">{{ world.scores.regretRisk }}</span>
            </div>
            <div class="score-row">
              <span class="score-label">适合你</span>
              <div class="score-bar-track">
                <div
                  class="score-bar-fill"
                  :style="{ width: world.scores.fitScore + '%', background: scoreColor(world.scores.fitScore) }"
                ></div>
              </div>
              <span class="score-value" :style="{ color: scoreColor(world.scores.fitScore) }">{{ world.scores.fitScore }}%</span>
            </div>
          </div>

          <!-- Collapsed sources -->
          <div class="sources-section">
            <button class="sources-toggle" @click="toggleSources(world.id)">
              <span>{{ expandedSources[world.id] ? '▼' : '▶' }}</span>
              <span>信息来源（{{ world.sources.length }}条真实经验）</span>
            </button>
            <div v-if="expandedSources[world.id]" class="sources-list">
              <div v-for="(src, si) in world.sources" :key="si" class="source-item">
                <img :src="src.avatar" class="source-avatar" :alt="src.username" />
                <div class="source-content">
                  <div class="source-meta">
                    <span class="source-name">{{ src.username }}</span>
                    <span class="source-type">{{ src.type === 'note' ? '笔记' : '评论' }}</span>
                  </div>
                  <p class="source-text">"{{ src.text }}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommendation -->
    <div class="recommendation">
      <div class="rec-icon">🎯</div>
      <div class="rec-content">
        <div class="rec-label">推荐进入</div>
        <div class="rec-title">{{ recommended.emoji }} {{ recommended.name }}：{{ recommended.title }}</div>
      </div>
    </div>

    <!-- Actions -->
    <div class="ending-actions">
      <button class="action-btn secondary" @click="emit('restart')">
        重新预演
      </button>
      <button class="action-btn primary" @click="emit('go-home')">
        返回首页
      </button>
    </div>
  </div>
</template>

<style scoped>
.parallel-worlds {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 20px;
}

.worlds-header {
  text-align: center;
  margin-bottom: 28px;
}

.header-icon {
  font-size: 42px;
  margin-bottom: 8px;
}

.worlds-header h2 {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 0 8px;
}

.worlds-header p {
  font-size: 14px;
  color: var(--text-color-tertiary);
  margin: 0;
}

.worlds-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.world-card {
  padding: 18px;
  border-radius: 14px;
  background: var(--bg-color-secondary);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.world-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--shadow-color);
}

.world-card.recommended {
  border-color: var(--primary-color);
  background: var(--bg-color-primary);
}

.world-card.expanded {
  border-color: var(--primary-color);
}

.world-card-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.world-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 10px;
  background: var(--primary-color);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 4px;
}

.world-emoji {
  font-size: 36px;
}

.world-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.world-title {
  font-size: 13px;
  color: var(--text-color-secondary);
  margin-bottom: 6px;
}

.world-scores-mini {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.mini-score {
  font-weight: 500;
}

.mini-divider {
  color: var(--text-color-quaternary);
}

/* Expanded content */
.world-expand {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color-secondary);
  animation: expand-in 0.3s ease;
}

@keyframes expand-in {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.world-narrative {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-color-secondary);
  margin: 0 0 16px;
}

/* Score detail */
.score-detail {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.score-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.score-label {
  font-size: 12px;
  color: var(--text-color-tertiary);
  min-width: 56px;
}

.score-bar-track {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--bg-color-tertiary);
  overflow: hidden;
}

.score-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.score-value {
  font-size: 12px;
  font-weight: 600;
  min-width: 32px;
  text-align: right;
}

/* Sources section */
.sources-section {
  margin-top: 12px;
}

.sources-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-color-tertiary);
  padding: 4px 0;
  transition: color 0.2s;
}

.sources-toggle:hover {
  color: var(--text-color-secondary);
}

.sources-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: expand-in 0.25s ease;
}

.source-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: var(--bg-color-tertiary);
}

.source-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}

.source-content {
  flex: 1;
  min-width: 0;
}

.source-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.source-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-color-primary);
}

.source-type {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--bg-color-secondary);
  color: var(--text-color-tertiary);
}

.source-text {
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-color-secondary);
  margin: 0;
}

/* Recommendation */
.recommendation {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255,36,66,0.08), rgba(249,115,22,0.08));
  border: 1px solid var(--primary-color);
  margin-bottom: 24px;
}

.rec-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.rec-content {
  flex: 1;
}

.rec-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--primary-color);
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rec-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color-primary);
}

/* Actions */
.ending-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 13px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.action-btn.primary {
  background: var(--primary-color);
  color: #fff;
}

.action-btn.primary:hover {
  background: var(--primary-color-dark);
}

.action-btn.secondary {
  background: var(--bg-color-secondary);
  color: var(--text-color-secondary);
  border: 1px solid var(--border-color-primary);
}

.action-btn.secondary:hover {
  background: var(--bg-color-tertiary);
  color: var(--text-color-primary);
}
</style>