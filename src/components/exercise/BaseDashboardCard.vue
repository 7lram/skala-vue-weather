<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="dashboard-card">
    <h2>{{ title }}</h2>

    <div class="card-content">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 25px;
  padding: 22px;

  background: white;

  border: 1px solid #ddd;
  border-radius: 12px;
}

.dashboard-card h2 {
  margin-top: 0;
  margin-bottom: 18px;
}

.card-content {
  width: 100%;
}
</style>
