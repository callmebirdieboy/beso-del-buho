<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const funcionesConReservas = ref([])

const cargarReservaciones = async () => {
  try {
    const showtimesSnapshot = await getDocs(collection(db, 'showtimes'))
    const reservationsSnapshot = await getDocs(collection(db, 'reservations'))

    const funciones = showtimesSnapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data()
    }))

    const reservaciones = reservationsSnapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data()
    }))

    funcionesConReservas.value = funciones.map((funcion) => {
      const reservasDeFuncion = reservaciones.filter(
        (reserva) => reserva.movieId === funcion.id
      )

      return {
        ...funcion,
        reservas: reservasDeFuncion
      }
    })
  } catch (error) {
    console.error('Error cargando reservaciones:', error)
    alert('Ocurrió un error al cargar las reservaciones.')
  }
}

const contarAsientos = (selectedSeats) => {
  if (!selectedSeats) return 0

  return selectedSeats
    .split(',')
    .map((seat) => seat.trim())
    .filter(Boolean).length
}

onMounted(() => {
  cargarReservaciones()
})
</script>

<template>
  <div class="min-h-screen bg-dark text-white p-8">
    <h1 class="text-3xl font-playfair mb-8">
      Reservaciones por función
    </h1>

    <router-link
      to="/admin"
      class="inline-block mb-8 bg-primary px-4 py-2 rounded hover:opacity-90 transition"
    >
      ← Volver al panel administrativo
    </router-link>

    <div class="grid gap-8">
      <section
        v-for="funcion in funcionesConReservas"
        :key="funcion.id"
        class="bg-[#1E1E1E] p-6 rounded-lg ring-1 ring-[#2a2a2a]"
      >
        <div class="mb-4">
          <h2 class="text-2xl font-playfair">
            {{ funcion.title }}
          </h2>

          <p class="text-gray-400">
            Horario: {{ funcion.datetime }}
          </p>

          <p class="text-sm text-gray-500">
            Reservaciones registradas: {{ funcion.reservas.length }}
          </p>
        </div>

        <div
          v-if="funcion.reservas.length"
          class="overflow-x-auto"
        >
          <table class="w-full text-sm text-left border-collapse">
            <thead>
              <tr class="border-b border-[#333] text-gray-300">
                <th class="py-2 pr-4">Nombre</th>
                <th class="py-2 pr-4">Lugares</th>
                <th class="py-2 pr-4">Asientos</th>
                <th class="py-2 pr-4">Correo</th>
                <th class="py-2 pr-4">Teléfono</th>
                <th class="py-2 pr-4">Fecha</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="reserva in funcion.reservas"
                :key="reserva.id"
                class="border-b border-[#2a2a2a]"
              >
                <td class="py-3 pr-4">
                  {{ reserva.nombre }}
                </td>

                <td class="py-3 pr-4">
                  {{ contarAsientos(reserva.selectedSeats) }}
                </td>

                <td class="py-3 pr-4">
                  {{ reserva.selectedSeats }}
                </td>

                <td class="py-3 pr-4">
                  {{ reserva.correo }}
                </td>

                <td class="py-3 pr-4">
                  {{ reserva.telefono }}
                </td>

                <td class="py-3 pr-4">
                  {{ reserva.fecha ? new Date(reserva.fecha).toLocaleString() : 'Sin fecha' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p
          v-else
          class="text-gray-500 text-sm"
        >
          Esta función aún no tiene reservaciones registradas.
        </p>
      </section>
    </div>
  </div>
</template>