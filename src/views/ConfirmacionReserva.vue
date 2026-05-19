<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const router = useRouter()
const route = useRoute()

// Recuperar datos desde la query
const nombre = route.query.nombre || ''
const correo = route.query.correo || ''
const telefono = route.query.telefono || ''
const selectedSeats = route.query.selectedSeats || ''
const movieId = route.query.movieId

const movie = ref(null)

onMounted(async () => {

  try {

    const docRef = doc(db, 'showtimes', movieId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {

      movie.value = {
        id: docSnap.id,
        ...docSnap.data()
      }

      console.log('Datos de función cargados')

    } else {
      console.log('Película no encontrada')
    }

  } catch (error) {
    console.error('Error cargando función:', error)
  }

})

// Acción: volver a la cartelera
const volverACartelera = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-dark text-textMain flex flex-col items-center">
    <!-- Header -->
    <header class="py-8 text-center flex flex-col items-center gap-4">
      <img src="/logo.png" alt="El Beso del Búho" class="w-full max-w-sm h-auto" />
      <h1 class="text-3xl font-playfair">¡Reserva confirmada!</h1>
    </header>

    <!-- Contenido principal -->
    <main
     v-if="movie" class="flex-grow flex flex-col items-center justify-center px-6 text-center">
      <div class="bg-[#1E1E1E] ring-1 ring-[#2a2a2a] p-6 rounded-xl max-w-md w-full">
        <p class="font-inter text-base mb-4">
          Gracias, <strong>{{ nombre || 'Visitante' }}</strong>.<br />
          Tu reserva se ha registrado con éxito.
        </p>

        <!-- 🔹 Resumen de función -->
        <div class="text-left bg-[#121212] p-4 rounded mb-4 text-sm font-inter">
          <p><strong>Título:</strong> {{ movie?.title || 'Película no encontrada' }}</p>
          <p><strong>Día:</strong> {{ movie?.datetime?.split(' ')[0] }}</p>
          <p><strong>Horario:</strong> {{ movie?.datetime?.split(' ')[1] }}</p>
          <p><strong>Asientos:</strong> {{ selectedSeats || 'N/A' }}</p>
        </div>

        <!-- 🔹 Datos de contacto -->
        <div class="text-textSecondary text-sm space-y-1 mb-4">
          <p><strong>Correo:</strong> {{ correo || 'No especificado' }}</p>
          <p><strong>Teléfono:</strong> {{ telefono || 'No especificado' }}</p>
        </div>

        <p class="text-textSecondary text-sm mb-6">
          Recuerda llegar 10 minutos antes de la función.
        </p>

        <button
          class="mt-2 bg-primary text-white px-4 py-2 rounded font-inter hover:opacity-90 transition w-full"
          @click="volverACartelera"
        >
          ← Volver a cartelera
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-4 text-center text-textSecondary text-sm border-t border-[#1e1e1e] mt-8">
      Espacio independiente de cine alternativo en Culiacán
    </footer>
  </div>
</template>
