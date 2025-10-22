<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Campos del formulario
const nombre = ref('')
const correo = ref('')
const telefono = ref('')

// Recuperamos datos desde la selección de asientos
const movieId = route.query.movieId
const selectedSeats = route.query.selectedSeats

// Errores
const errores = ref({
  nombre: '',
  correo: '',
  telefono: ''
})

// Validar campos
const validarFormulario = () => {
  errores.value = { nombre: '', correo: '', telefono: '' }
  let valido = true

  if (!nombre.value.trim()) {
    errores.value.nombre = 'Por favor, ingresa tu nombre.'
    valido = false
  }

  if (!correo.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
    errores.value.correo = 'Ingresa un correo válido.'
    valido = false
  }

  if (!telefono.value.trim() || !/^[0-9]{10}$/.test(telefono.value)) {
    errores.value.telefono = 'Ingresa un número de 10 dígitos.'
    valido = false
  }

  return valido
}

// Enviar formulario
const enviarFormulario = () => {
  if (validarFormulario()) {
    router.push({
      name: 'confirmacion',
      query: {
        nombre: nombre.value,
        correo: correo.value,
        telefono: telefono.value,
        movieId: movieId,
        selectedSeats: selectedSeats
      }
    })
  }
}
</script>

<template>
  <div class="min-h-screen bg-dark text-textMain flex flex-col">
    <!-- Header -->
    <header class="py-8 text-center flex flex-col items-center gap-4">
      <img src="/logo.png" alt="El Beso del Búho" class="w-full max-w-sm h-auto" />
      <h1 class="text-3xl font-playfair">Registro de reserva</h1>
    </header>

    <!-- Formulario -->
    <main class="flex-grow flex flex-col items-center px-6">
      <form
        class="w-full max-w-md flex flex-col gap-6 bg-[#1E1E1E] p-6 rounded-xl ring-1 ring-[#2a2a2a]"
        @submit.prevent="enviarFormulario"
      >
        <div class="flex flex-col">
          <label class="font-inter text-sm mb-2">Nombre completo</label>
          <input
            v-model="nombre"
            type="text"
            class="px-3 py-2 rounded bg-dark text-white ring-1 ring-[#2a2a2a] focus:ring-[#4B3F72] outline-none"
            placeholder="Ej. Fausto García"
          />
          <span v-if="errores.nombre" class="text-[#8C1C13] text-xs mt-1">{{ errores.nombre }}</span>
        </div>

        <div class="flex flex-col">
          <label class="font-inter text-sm mb-2">Correo electrónico</label>
          <input
            v-model="correo"
            type="email"
            class="px-3 py-2 rounded bg-dark text-white ring-1 ring-[#2a2a2a] focus:ring-[#4B3F72] outline-none"
            placeholder="ejemplo@correo.com"
          />
          <span v-if="errores.correo" class="text-[#8C1C13] text-xs mt-1">{{ errores.correo }}</span>
        </div>

        <div class="flex flex-col">
          <label class="font-inter text-sm mb-2">Teléfono</label>
          <input
            v-model="telefono"
            type="tel"
            class="px-3 py-2 rounded bg-dark text-white ring-1 ring-[#2a2a2a] focus:ring-[#4B3F72] outline-none"
            placeholder="10 dígitos"
          />
          <span v-if="errores.telefono" class="text-[#8C1C13] text-xs mt-1">{{ errores.telefono }}</span>
        </div>

        <button
          type="submit"
          class="mt-2 bg-primary text-white py-2 rounded font-inter hover:opacity-90 transition"
        >
          Confirmar datos
        </button>
      </form>

      <!-- Volver -->
      <router-link
        :to="`/reserva/${movieId || 1}`"
        class="mt-6 text-textSecondary text-sm underline hover:text-white transition"
      >
        ← Volver a selección de asientos
      </router-link>
    </main>

    <!-- Footer -->
    <footer class="py-4 text-center text-textSecondary text-sm border-t border-[#1e1e1e] mt-8">
      Espacio independiente de cine alternativo en Culiacán
    </footer>
  </div>
</template>
