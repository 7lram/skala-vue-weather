<script setup>
import { RouterLink, RouterView } from 'vue-router'

import UnitToggler from '@/components/common/UnitToggler.vue'
</script>

<template>
  <div class="app">
    <header class="navigation">
      <div class="logo">🌤 SKALA Weather</div>

      <div class="nav-right">
        <nav>
          <RouterLink to="/"> 날씨 </RouterLink>

          <RouterLink to="/about"> 서비스 소개 </RouterLink>

          <RouterLink to="/tips"> 날씨 팁 </RouterLink>
        </nav>

        <UnitToggler />
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 18px 40px;

  background: white;

  border-bottom: 1px solid #ddd;
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: #444;
  text-decoration: none;
  font-weight: 600;
}

nav a.router-link-active {
  color: #42b883;
}
</style>
