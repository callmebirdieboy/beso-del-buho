<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { functions } from '../data/functions.js'

const route = useRoute()
const router = useRouter()
const id = parseInt(route.params.id)
const movie = functions.find(f => f.id === id)

// Simulación de asientos (5x6)
const rows = 5
const cols = 6
const seats = ref(
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() < 0.2 ? 1 : 0))
  )
)
const selectedSeats = ref([]) // guardará los identificadores tipo "A1", "B3", etc.
const selectedCount = ref(0)

// Etiquetas de filas (A, B, C...)
const rowLabels = ['A', 'B', 'C', 'D', 'E']

const toggleSeat = (r, c) => {
  const current = seats.value[r][c]
  const seatId = `${rowLabels[r]}${c + 1}`

  if (current === 1) return // Ocupado, no hace nada

  if (current === 0) {
    seats.value[r][c] = 2 // Seleccionado
    selectedSeats.value.push(seatId)
    selectedCount.value++
  } else if (current === 2) {
    seats.value[r][c] = 0 // Des-seleccionado
    selectedSeats.value = selectedSeats.value.filter(s => s !== seatId)
    selectedCount.value--
  }
}

// Volver a cartelera
const goBack = () => router.push('/')

// Confirmar selección → ir al registro
const confirmSeats = () => {
  if (selectedCount.value === 0) {
    alert('Por favor selecciona al menos un asiento.')
    return
  }

  // Obtener los asientos seleccionados (por coordenadas o número)
  const seatsSelected = []
  seats.value.forEach((row, r) => {
    row.forEach((seat, c) => {
      if (seat === 2) seatsSelected.push(`F${r + 1}A${c + 1}`)
    })
  })

  // Redirigir al formulario con datos de la película y asientos
  router.push({
    name: 'registro',
    query: {
      movieId: movie.id,
      selectedSeats: seatsSelected.join(', ')
    }
  })
}

</script>

<template>
  <div class="min-h-screen bg-dark text-textMain flex flex-col items-center py-8 px-4">
    <!-- Logo -->
    <img src="/logo.png" alt="El Beso del Búho" class="w-full max-w-sm h-auto mb-6" />

    <!-- Título -->
    <h1 class="text-2xl md:text-3xl font-playfair mb-2 text-center leading-snug">
      Selección de asientos – {{ movie.title }}
    </h1>
    <p class="text-textSecondary text-sm md:text-base font-inter mb-8">
      {{ movie.datetime }}
    </p>

    <!-- Contenedor de asientos -->
    <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-md text-center w-full max-w-md md:max-w-lg lg:max-w-xl">
      <!-- Pantalla -->
      <div class="bg-[#2A2A2A] text-textSecondary font-inter py-1 px-4 mb-6 rounded text-sm md:text-base">
        PANTALLA
      </div>

      <!-- Grid de asientos -->
      <div
        class="grid gap-3 justify-center"
        :style="{ gridTemplateColumns: `repeat(${cols}, minmax(30px, 1fr))` }"
      >
        <div v-for="(row, r) in seats" :key="r" class="contents">
          <div
            v-for="(seat, c) in row"
            :key="c"
            @click="toggleSeat(r, c)"
            class="aspect-square rounded cursor-pointer transition-all flex items-center justify-center text-xs font-inter"
            :class="{
              'bg-[#2A2A2A] hover:opacity-80 hover:scale-110': seat === 0,
              'bg-[#1E1E1E] cursor-not-allowed text-[#555]': seat === 1,
              'bg-[#4B3F72] scale-105 text-white': seat === 2
            }"
          >
            {{ rowLabels[r] + (c + 1) }}
          </div>
        </div>
      </div>

      <!-- Contador -->
      <p class="mt-6 text-sm md:text-base text-textSecondary font-inter">
        Asientos seleccionados:
        <span class="text-white font-semibold">{{ selectedCount }}</span>
      </p>
    </div>

    <!-- Botones -->
    <div class="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        @click="goBack"
        class="px-6 py-2 rounded font-inter text-white border border-[#4B3F72] hover:bg-[#4B3F72]/20 transition text-sm md:text-base"
      >
        ← Volver
      </button>

      <button
        @click="confirmSeats"
        class="px-6 py-2 rounded font-inter text-white bg-[#8C1C13] hover:opacity-90 transition text-sm md:text-base"
        :disabled="selectedCount === 0"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>
