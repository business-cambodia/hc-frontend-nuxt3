<template>
  <nav aria-label="breadcrumb ">
    <ol class="breadcrumb text-white">
      <li v-for="(link, index) in links" :key="index" class="breadcrumb-item">
        <NuxtLink :to="link.link">{{ link.name }} </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
function defineProps<T>() {
  throw new Error('Function not implemented.');
}

defineProps<{
  links: Array<{ name: string; link: string }>;
}>();
</script>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  list-style: none;
  /* background-color: #f8f9fa; */
  border-radius: 0.375rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
  padding: 0 0.5rem;
}
</style>
