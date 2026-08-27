<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="about-page">
    <div class="about-card">
      <h1>🌤 Weather Service</h1>

      <p>Vue.js와 Vue Router를 활용하여 제작한 날씨 대시보드입니다.</p>

      <p>도시별 날씨 조회와 상세 정보 페이지 이동 기능을 제공합니다.</p>

      <button @click="router.push('/')">메인 대시보드로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: 50px 20px;
}

.about-card {
  max-width: 700px;

  margin: 0 auto;
  padding: 35px;

  text-align: center;

  border: 1px solid #ddd;
  border-radius: 14px;

  background: white;
}

button {
  margin-top: 20px;
  padding: 10px 18px;

  cursor: pointer;
}
</style>
