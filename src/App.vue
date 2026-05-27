<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDark) {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<template>
  <router-view @toggle-theme="toggleTheme" />
</template>

<style>
*,
*::before,
*::after {
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
</style>