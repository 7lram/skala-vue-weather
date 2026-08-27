<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found-page">
    <h1>404</h1>

    <h2>페이지를 찾을 수 없습니다.</h2>

    <p>요청하신 주소가 존재하지 않습니다.</p>

    <button @click="router.push('/')">홈으로 돌아가기</button>
  </div>
</template>

<style scoped>
.not-found-page {
  padding: 80px 20px;

  text-align: center;
}

.not-found-page h1 {
  margin: 0;

  font-size: 80px;

  color: #42b883;
}

button {
  margin-top: 20px;
  padding: 10px 18px;

  cursor: pointer;
}
</style>
