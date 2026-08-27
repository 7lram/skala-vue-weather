<script setup>
import { ref, computed, onMounted } from 'vue'

import axios from 'axios'

import { useRoute, useRouter } from 'vue-router'

import { useConfigStore } from '@/stores/configStore'

const route = useRoute()

const router = useRouter()

const configStore = useConfigStore()

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const city = ref(null)

const isLoading = ref(false)

const errorMessage = ref('')

const displayTemp = computed(() => {
  if (!city.value) {
    return ''
  }

  const temp = city.value.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return Math.round(temp)
})

const displayFeelsLike = computed(() => {
  if (!city.value) {
    return ''
  }

  const temp = city.value.feelsLike

  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return Math.round(temp)
})

const fetchWeatherDetail = async () => {
  /*
      HomeView에서 전달한
      URL Query String
    */
  const cityQuery = route.query.city

  const cityName = route.query.name

  if (!cityQuery) {
    errorMessage.value = '도시 정보가 없습니다.'

    return
  }

  isLoading.value = true

  errorMessage.value = ''

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: cityQuery,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    const data = response.data

    city.value = {
      name: cityName || data.name,

      country: data.sys.country,

      temp: data.main.temp,

      feelsLike: data.main.feels_like,

      status: data.weather[0].description,

      humidity: data.main.humidity,

      wind: data.wind.speed,

      pressure: data.main.pressure,

      icon: data.weather[0].icon,
    }
  } catch (error) {
    console.error('상세 날씨 조회 실패:', error)

    if (error.response?.status === 404) {
      errorMessage.value = '해당 도시를 찾을 수 없습니다.'
    } else if (error.response?.status === 401) {
      errorMessage.value = 'API Key 인증에 실패했습니다.'
    } else {
      errorMessage.value = '상세 날씨 정보를 불러오지 못했습니다.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchWeatherDetail()
})
</script>

<template>
  <div class="detail-page">
    <el-card class="detail-card">
      <!-- Loading -->
      <el-skeleton v-if="isLoading" :rows="6" animated />

      <!-- Error -->
      <div v-else-if="errorMessage">
        <el-alert :title="errorMessage" type="error" show-icon :closable="false" />

        <el-button type="primary" class="back-button" @click="router.push('/')">
          메인으로
        </el-button>
      </div>

      <!-- 날씨 -->
      <div v-else-if="city">
        <h1>
          🌤
          {{ city.name }}
          상세 날씨
        </h1>

        <p class="country">
          {{ city.country }}
        </p>

        <img
          class="weather-icon"
          :src="`https://openweathermap.org/img/wn/${city.icon}@2x.png`"
          alt="날씨 아이콘"
        />

        <div class="temperature">
          {{ displayTemp }}
          {{ configStore.unitSymbol }}
        </div>

        <p class="status">
          ☁️
          {{ city.status }}
        </p>

        <el-descriptions :column="1" border class="weather-description">
          <el-descriptions-item label="체감 온도">
            {{ displayFeelsLike }}
            {{ configStore.unitSymbol }}
          </el-descriptions-item>

          <el-descriptions-item label="습도"> {{ city.humidity }}% </el-descriptions-item>

          <el-descriptions-item label="풍속">
            {{ city.wind }}
            m/s
          </el-descriptions-item>

          <el-descriptions-item label="기압">
            {{ city.pressure }}
            hPa
          </el-descriptions-item>
        </el-descriptions>

        <el-button type="primary" round class="back-button" @click="router.push('/')">
          ← 메인으로 돌아가기
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.detail-page {
  width: 100%;
  min-height: calc(100vh - 70px);

  padding: 50px 20px;

  box-sizing: border-box;

  background: #f5f7fa;
}

.detail-card {
  width: 90%;

  max-width: 700px;

  margin: 0 auto;

  border-radius: 14px;

  text-align: center;
}

.detail-card h1 {
  margin-bottom: 4px;
}

.country {
  margin-top: 0;

  color: #909399;
}

.weather-icon {
  width: 110px;

  height: 110px;
}

.temperature {
  margin: 5px 0 12px;

  color: #409eff;

  font-size: 52px;

  font-weight: 750;
}

.status {
  margin-bottom: 25px;

  color: #606266;

  font-size: 17px;

  font-weight: 600;
}

.weather-description {
  margin-top: 20px;

  text-align: left;
}

.back-button {
  margin-top: 25px;
}
</style>
