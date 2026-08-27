import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')

  const compactMode = ref(false)

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  const unitName = computed(() => {
    return unit.value === 'celsius' ? '섭씨' : '화씨'
  })

  const toggleUnit = () => {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  const toggleCompactMode = () => {
    compactMode.value = !compactMode.value
  }

  return {
    unit,
    compactMode,

    unitSymbol,
    unitName,

    toggleUnit,
    toggleCompactMode,
  }
})
