<script setup>
import { useRoute } from 'vue-router'
import { functions } from '../data/functions.js' // 👈 importa la lista real

const route = useRoute()
const id = parseInt(route.params.id) // id dinámico desde la URL

// Buscar la película por id en el dataset
const movie = functions.find(f => f.id === id)

// Reglas de disponibilidad
const isSoldOut = movie.reserved >= movie.capacity
</script>

<template>
  <div class="min-h-screen bg-dark text-textMain flex flex-col">
    <!-- Header -->
    <header class="py-8 text-center flex flex-col items-center gap-4">
      <img src="/logo.png" alt="El Beso del Búho" class="w-full max-w-sm h-auto" />

      <!-- Botón regresar -->
      <router-link
        to="/"
        class="px-4 py-2 bg-primary text-white text-sm rounded hover:opacity-90 transition"
      >
        ← Regresar a cartelera
      </router-link>
    </header>

    <!-- Contenido principal -->
    <main
      class="flex-grow px-6 pb-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
    >
      <!-- Póster -->
      <div class="flex justify-center">
        <img
          :src="movie.poster"
          :alt="movie.title"
          class="w-full max-w-md object-contain rounded"
        />
      </div>

      <!-- Info -->
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-playfair">{{ movie.title }}</h1>

        <p class="text-textSecondary font-inter">
          Dirigida por {{ movie.director || 'Director por definir' }}
        </p>

        <p class="text-textSecondary font-inter">
          {{ movie.country || 'País' }} •
          {{ movie.year || 'Año' }} •
          {{ movie.duration || 'Duración' }} •
          {{ movie.genre || 'Género' }}
        </p>

        <p class="mt-4 text-base font-inter leading-relaxed">
          {{ movie.synopsis || 'Sinopsis próximamente.' }}
        </p>

        <!-- Horario + Botón -->
        <div class="mt-6">
          <p class="text-lg font-bold text-textSecondary">
            Horario: {{ movie.datetime }}
          </p>

       <router-link
  v-if="!isSoldOut"
  :to="`/reserva/${movie.id}`"
  class="mt-3 px-4 py-2 font-inter rounded bg-primary text-white hover:opacity-90 transition text-center inline-block"
>
  Reservar
</router-link>

<button
  v-else
  class="mt-3 px-4 py-2 font-inter rounded bg-dark text-textSecondary cursor-not-allowed ring-1 ring-[#2a2a2a]"
  disabled
>
  Agotada
</button>

        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="py-4 text-center text-textSecondary text-sm border-t border-[#1e1e1e]"
    >
      Espacio independiente de cine alternativo en Culiacán
    </footer>
  </div>
</template>
