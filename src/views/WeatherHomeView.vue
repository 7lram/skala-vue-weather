<script setup>
import { ref, computed, onMounted } from 'vue'

import axios from 'axios'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useConfigStore } from '@/stores/configStore'

const router = useRouter()
const configStore = useConfigStore()

const { compactMode } = storeToRefs(configStore)

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const searchQuery = ref('')

const selectedCityInfo = ref('도시를 선택해 주세요.')

const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const defaultCities = [
  {
    name: '서울',
    query: 'Seoul,kr',
  },
  {
    name: '수원',
    query: 'Suwon,kr',
  },
  {
    name: '부산',
    query: 'Busan,kr',
  },
  {
    name: '제주',
    query: 'Jeju,kr',
  },
]

/*
  REST Countries API
  국가 코드로 국가명 / 국기 조회
*/
const fetchCountryInfo = async (countryCode) => {
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)

  const country = response.data[0]

  return {
    countryName: country.name.common,

    flag: country.flags.svg,
  }
}

/*
  OpenWeatherMap API
  날씨 + REST Countries 국가정보 결합
*/
const fetchWeather = async (query, displayName = null) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: query,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  const data = response.data

  let countryInfo = {
    countryName: data.sys.country,
    flag: '',
  }

  /*
    기타 외부 API 호출
  */
  try {
    countryInfo = await fetchCountryInfo(data.sys.country)
  } catch (error) {
    console.error('국가 정보 조회 실패:', error)
  }

  return {
    id: String(data.id),

    name: displayName || data.name,

    query,

    temp: data.main.temp,

    feelsLike: data.main.feels_like,

    status: data.weather[0].description,

    humidity: data.main.humidity,

    wind: data.wind.speed,

    pressure: data.main.pressure,

    icon: data.weather[0].icon,

    country: data.sys.country,

    /*
      REST Countries 데이터
    */
    countryName: countryInfo.countryName,

    flag: countryInfo.flag,
  }
}

/*
  기본 도시 4개 조회
*/
const loadDefaultWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const requests = defaultCities.map((city) => fetchWeather(city.query, city.name))

    weatherList.value = await Promise.all(requests)

    selectedCityInfo.value = '기본 도시의 실시간 날씨를 불러왔습니다.'
  } catch (error) {
    console.error('기본 날씨 조회 실패:', error)

    errorMessage.value = error.response?.data?.message || '날씨 정보를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

/*
  사용자 입력 도시 검색
*/
const searchCityWeather = async () => {
  const keyword = searchQuery.value.trim()

  if (!keyword) {
    errorMessage.value = '검색할 도시명을 입력해 주세요.'

    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const searchedWeather = await fetchWeather(keyword)

    weatherList.value = [searchedWeather]

    selectedCityInfo.value = `${searchedWeather.name}의 날씨를 검색했습니다.`
  } catch (error) {
    console.error('도시 검색 실패:', error)

    if (error.response?.status === 404) {
      errorMessage.value = '해당 도시를 찾을 수 없습니다.'
    } else if (error.response?.status === 401) {
      errorMessage.value = 'OpenWeatherMap API Key 인증에 실패했습니다.'
    } else {
      errorMessage.value = '날씨 정보를 불러오지 못했습니다.'
    }
  } finally {
    isLoading.value = false
  }
}

const filteredWeatherList = computed(() => {
  return weatherList.value
})

/*
  ℃ / ℉ 변환
*/
const getDisplayTemp = (temp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return Math.round(temp)
}

const handleSelectCard = (weather) => {
  selectedCityInfo.value = `${weather.name}이 선택되었습니다.`
}

/*
  상세페이지 이동
*/
const handleDetail = (weather) => {
  router.push({
    path: '/weather',
    query: {
      city: weather.query,
      name: weather.name,
    },
  })
}

/*
  기본 목록 복원
*/
const resetWeather = async () => {
  searchQuery.value = ''

  await loadDefaultWeather()
}

onMounted(() => {
  loadDefaultWeather()
})
</script>

<template>
  <div class="weather-page">
    <main class="weather-container">
      <!-- 제목 -->
      <div class="page-title">
        <h1>🌤 실시간 Weather Dashboard</h1>

        <p>OpenWeatherMap + REST Countries API</p>
      </div>

      <!-- 검색 -->
      <el-card class="search-card">
        <template #header>
          <div class="search-header">
            <div>
              <strong> 🔍 도시 검색 </strong>

              <div class="api-info">날씨 + 국가 정보를 함께 조회합니다.</div>
            </div>

            <el-tag effect="plain" round>
              {{ compactMode ? '간단 모드' : '일반 모드' }}
            </el-tag>
          </div>
        </template>

        <div class="search-row">
          <el-input
            v-model="searchQuery"
            placeholder="도시명 입력 (예: Tokyo, Daejeon, Paris)"
            clearable
            size="large"
            @keyup.enter="searchCityWeather"
          />

          <el-button type="primary" size="large" @click="searchCityWeather"> 🔍 검색 </el-button>

          <el-button size="large" @click="resetWeather"> 기본 도시 </el-button>
        </div>

        <p class="search-help">영문 도시명으로 검색하면 더 정확합니다.</p>
      </el-card>

      <!-- 오류 -->
      <el-alert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        show-icon
        :closable="false"
        class="message"
      />

      <!-- Loading -->
      <div v-if="isLoading" class="weather-grid">
        <el-card v-for="n in 4" :key="n">
          <el-skeleton :rows="6" animated />
        </el-card>
      </div>

      <!-- 날씨 목록 -->
      <div v-else-if="filteredWeatherList.length" class="weather-grid">
        <el-card
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          class="weather-card"
          :class="{
            'compact-card': compactMode,
          }"
          shadow="hover"
          @click="handleSelectCard(weather)"
        >
          <template #header>
            <div class="card-header">
              <div>
                <div class="city-name">
                  {{ weather.name }}
                </div>

                <!-- REST Countries API 결과 -->
                <div class="country-info">
                  <img
                    v-if="weather.flag"
                    :src="weather.flag"
                    :alt="`${weather.countryName} 국기`"
                    class="country-flag"
                  />

                  <span>
                    {{ weather.countryName }}
                  </span>
                </div>
              </div>

              <el-tag :type="weather.temp >= 25 ? 'danger' : 'primary'" effect="light" round>
                {{ weather.temp >= 25 ? '🔥 더움' : '❄️ 선선함' }}
              </el-tag>
            </div>
          </template>

          <div class="weather-body">
            <img
              class="weather-icon"
              :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`"
              alt="날씨 아이콘"
            />

            <div class="temperature">
              {{ getDisplayTemp(weather.temp) }}

              <span class="unit">
                {{ configStore.unitSymbol }}
              </span>
            </div>

            <p class="weather-status">
              ☁️
              {{ weather.status }}
            </p>

            <!-- 일반 모드 -->
            <div v-if="!compactMode" class="detail-info">
              <div class="info-row">
                <span> 🌡 체감 온도 </span>

                <strong>
                  {{ getDisplayTemp(weather.feelsLike) }}
                  {{ configStore.unitSymbol }}
                </strong>
              </div>

              <div class="info-row">
                <span> 💧 습도 </span>

                <strong> {{ weather.humidity }}% </strong>
              </div>

              <div class="info-row">
                <span> 💨 풍속 </span>

                <strong>
                  {{ weather.wind }}
                  m/s
                </strong>
              </div>

              <div class="info-row">
                <span> 📊 기압 </span>

                <strong>
                  {{ weather.pressure }}
                  hPa
                </strong>
              </div>
            </div>

            <el-button
              type="primary"
              plain
              round
              class="detail-button"
              @click.stop="handleDetail(weather)"
            >
              상세보기
            </el-button>
          </div>
        </el-card>
      </div>

      <el-empty v-else description="날씨 데이터가 없습니다." />

      <div class="status-bar">
        📍
        {{ selectedCityInfo }}
      </div>
    </main>
  </div>
</template>

<style scoped>
.weather-page {
  width: 100%;
  min-height: 100vh;

  padding: 42px 20px 60px;

  box-sizing: border-box;

  background: linear-gradient(180deg, #f5f8fc 0%, #eef3f8 100%);
}

.weather-container {
  width: 92%;
  max-width: 1100px;

  margin: 0 auto;
}

.page-title {
  margin-bottom: 30px;

  text-align: center;
}

.page-title h1 {
  margin: 0;

  color: #303133;

  font-size: 30px;
  font-weight: 750;
}

.page-title p {
  margin-top: 8px;

  color: #909399;
}

.search-card {
  margin-bottom: 25px;

  border-radius: 14px;
}

.search-header {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.api-info {
  margin-top: 5px;

  color: #909399;

  font-size: 12px;
}

.search-row {
  display: flex;

  gap: 10px;
}

.search-help {
  margin: 12px 0 0;

  color: #909399;

  font-size: 12px;
}

.message {
  margin-bottom: 20px;
}

.weather-grid {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 20px;
}

.weather-card {
  cursor: pointer;

  border-radius: 14px;

  transition: transform 0.2s ease;
}

.weather-card:hover {
  transform: translateY(-4px);
}

.card-header {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.city-name {
  font-size: 20px;
  font-weight: 700;

  color: #303133;
}

/* REST Countries */

.country-info {
  display: flex;

  align-items: center;

  gap: 6px;

  margin-top: 6px;

  color: #606266;

  font-size: 12px;
}

.country-flag {
  width: 24px;
  height: 16px;

  object-fit: cover;

  border: 1px solid #ebeef5;
  border-radius: 3px;
}

.weather-body {
  text-align: center;
}

.weather-icon {
  width: 95px;
  height: 95px;
}

.temperature {
  margin: -5px 0 7px;

  color: #409eff;

  font-size: 42px;
  font-weight: 750;
}

.unit {
  font-size: 22px;
}

.weather-status {
  margin: 0 0 18px;

  color: #606266;

  font-size: 16px;
  font-weight: 600;
}

.detail-info {
  margin: 15px 0 20px;

  padding: 15px 17px;

  background: #f7f9fc;

  border-radius: 11px;
}

.info-row {
  display: flex;

  justify-content: space-between;

  padding: 7px 0;

  color: #606266;

  font-size: 14px;
}

.info-row strong {
  color: #303133;
}

.detail-button {
  width: 100%;
}

.compact-card .weather-icon {
  width: 75px;
  height: 75px;
}

.compact-card .temperature {
  font-size: 35px;
}

.status-bar {
  margin-top: 25px;

  padding: 14px;

  text-align: center;

  color: #356859;

  background: #e8f6ef;

  border: 1px solid #c9ead9;

  border-radius: 12px;

  font-weight: 650;
}

@media (max-width: 750px) {
  .weather-grid {
    grid-template-columns: 1fr;
  }

  .search-row {
    flex-direction: column;
  }
}
</style>
