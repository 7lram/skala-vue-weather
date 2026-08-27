<script setup>
import { computed } from 'vue'

import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.weather.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})

const handleSelect = () => {
  emit('select-card', props.weather)
}

const handleDetail = () => {
  emit('click-detail', props.weather)
}
</script>

<template>
  <div class="weather-card" @click="handleSelect">
    <div>
      <h3>
        {{ weather.name }}
      </h3>

      <p>
        현재 기온:

        <strong>
          {{ displayTemp }}
          {{ configStore.unitSymbol }}
        </strong>
      </p>

      <p v-if="!configStore.compactMode">날씨: {{ weather.status }}</p>

      <p v-if="!configStore.compactMode">습도: {{ weather.humidity }}%</p>

      <span v-if="weather.temp >= 25" class="hot"> 🔥 더움 </span>

      <span v-else class="cool"> ❄️ 선선함 </span>
    </div>

    <button @click.stop="handleDetail">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
  padding: 22px 25px;

  border: 1px solid #ddd;
  border-radius: 10px;

  cursor: pointer;
}

.hot,
.cool {
  display: inline-block;

  padding: 6px 10px;

  color: white;

  border-radius: 6px;
}

.hot {
  background: #ff7675;
}

.cool {
  background: #74b9ff;
}

button {
  padding: 9px 15px;

  border: 1px solid #aaa;
  border-radius: 6px;

  background: white;

  cursor: pointer;
}
</style>
