<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const { unit, unitSymbol, compactMode } = storeToRefs(configStore)

const { toggleUnit, toggleCompactMode } = configStore
</script>

<template>
  <div class="weather-settings">
    <!-- 온도 단위 -->
    <div class="setting-item">
      <span class="setting-label"> 온도 </span>

      <el-button class="setting-button" round @click="toggleUnit">
        <span class="button-icon"> 🌡️ </span>

        {{ unitSymbol }}

        <span class="change-text">
          →
          {{ unit === 'celsius' ? '℉' : '℃' }}
        </span>
      </el-button>
    </div>

    <div class="divider"></div>

    <!-- 간단 모드 -->
    <div class="setting-item">
      <span class="setting-label"> 보기 </span>

      <el-button
        class="setting-button"
        :type="compactMode ? 'primary' : 'default'"
        round
        @click="toggleCompactMode"
      >
        <span class="button-icon">
          {{ compactMode ? '▦' : '☷' }}
        </span>

        {{ compactMode ? '간단' : '일반' }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.weather-settings {
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 7px 10px;

  background: rgba(245, 247, 250, 0.9);

  border: 1px solid #e4e7ed;
  border-radius: 14px;
}

.setting-item {
  display: flex;
  align-items: center;

  gap: 7px;
}

.setting-label {
  font-size: 12px;
  font-weight: 600;

  color: #909399;
}

.setting-button {
  min-width: 82px;

  font-weight: 600;
}

.button-icon {
  margin-right: 4px;
}

.change-text {
  margin-left: 3px;

  font-size: 12px;

  opacity: 0.65;
}

.divider {
  width: 1px;
  height: 24px;

  background: #dcdfe6;
}

@media (max-width: 800px) {
  .setting-label {
    display: none;
  }

  .weather-settings {
    gap: 7px;

    padding: 6px 8px;
  }

  .divider {
    display: none;
  }
}
</style>
