<template>
  <div class="bg-dark rounded-lg flex flex-col items-center p-4 w-full">
    <img :src="func.poster" :alt="func.title" class="w-full h-64 object-cover rounded" />
    <h3 class="mt-3 text-textMain font-playfair text-lg text-center">{{ func.title }}</h3>
    <p class="text-textSecondary font-inter text-sm">{{ func.datetime }}</p>
    <button
      class="mt-4 px-4 py-2 bg-primary text-white font-inter rounded hover:opacity-90 transition"
    >
      Reservar
    </button>
  </div>
</template>

<script setup>
defineProps({
  func: Object
})
</script>
