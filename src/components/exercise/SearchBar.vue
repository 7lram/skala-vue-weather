<script setup>
defineProps({
  query: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])

const handleInput = (e) => {
  emit('update-query', e.target.value)
}
</script>

<template>
  <div class="search-area">
    <input type="text" :value="query" @input="handleInput" placeholder="도시명을 입력하세요" />

    <p>
      검색어:
      <strong>{{ query }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-area input {
  width: 100%;
  padding: 12px 14px;

  box-sizing: border-box;

  border: 1px solid #ccc;
  border-radius: 7px;

  font-size: 15px;
}
</style>
