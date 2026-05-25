<script setup>
import { ref, onMounted } from 'vue'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../firebase'

const peliculas = ref([])
const editingId = ref(null)

const form = ref({
  title: '',
  director: '',
  genre: '',
  datetime: '',
  image: '',
  synopsis: '',
  country: '',
  year: '',
  duration: ''
})

const showtimesRef = collection(db, 'showtimes')

const resetForm = () => {
  form.value = {
    title: '',
    director: '',
    genre: '',
    datetime: '',
    image: '',
    synopsis: '',
    country: '',
    year: '',
    duration: ''
  }

  editingId.value = null
}

const loadMovies = async () => {
  try {
    const snapshot = await getDocs(showtimesRef)

    peliculas.value = snapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data()
    }))
  } catch (error) {
    console.error('Error cargando películas:', error)
    alert('Ocurrió un error al cargar las películas.')
  }
}

const saveMovie = async () => {
  try {
    if (!form.value.title.trim()) {
      alert('El título de la película es obligatorio.')
      return
    }

    if (editingId.value) {
      await updateDoc(doc(db, 'showtimes', editingId.value), {
        ...form.value
      })

      alert('Película actualizada correctamente.')
    } else {
      await addDoc(showtimesRef, {
        ...form.value
      })

      alert('Película agregada correctamente.')
    }

    resetForm()
    await loadMovies()
  } catch (error) {
    console.error('Error guardando película:', error)
    alert('Ocurrió un error al guardar la película.')
  }
}

const editMovie = (movie) => {
  editingId.value = movie.id

  form.value = {
    title: movie.title || '',
    director: movie.director || '',
    genre: movie.genre || '',
    datetime: movie.datetime || '',
    image: movie.image || '',
    synopsis: movie.synopsis || '',
    country: movie.country || '',
    year: movie.year || '',
    duration: movie.duration || ''
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const deleteMovie = async (id) => {
  const confirmDelete = confirm('¿Deseas eliminar esta película?')

  if (!confirmDelete) return

  try {
    await deleteDoc(doc(db, 'showtimes', id))

    alert('Película eliminada correctamente.')
    await loadMovies()
  } catch (error) {
    console.error('Error eliminando película:', error)
    alert('Ocurrió un error al eliminar la película.')
  }
}

onMounted(() => {
  loadMovies()
})
</script>

<template>
  <div class="min-h-screen bg-dark text-white p-8">
    <h1 class="text-3xl font-playfair mb-8">
      Panel administrativo
    </h1>

    <div class="bg-[#1E1E1E] p-6 rounded-lg max-w-2xl mb-10">
      <h2 class="text-xl mb-4">
        {{ editingId ? 'Editar película' : 'Agregar película' }}
      </h2>

      <div class="grid gap-4">
        <input v-model="form.title" placeholder="Título" class="p-2 rounded bg-[#2A2A2A]" />
        <input v-model="form.director" placeholder="Director" class="p-2 rounded bg-[#2A2A2A]" />
        <input v-model="form.genre" placeholder="Género" class="p-2 rounded bg-[#2A2A2A]" />
        <input v-model="form.datetime" placeholder="Horario" class="p-2 rounded bg-[#2A2A2A]" />
        <input v-model="form.image" placeholder="URL imagen" class="p-2 rounded bg-[#2A2A2A]" />
        <textarea v-model="form.synopsis" placeholder="Sinopsis" class="p-2 rounded bg-[#2A2A2A]"></textarea>
        <input v-model="form.country" placeholder="País" class="p-2 rounded bg-[#2A2A2A]" />
        <input v-model="form.year" placeholder="Año" class="p-2 rounded bg-[#2A2A2A]" />
        <input v-model="form.duration" placeholder="Duración" class="p-2 rounded bg-[#2A2A2A]" />

        <button
          @click="saveMovie"
          class="bg-primary text-white py-2 rounded hover:opacity-90 transition"
        >
          {{ editingId ? 'Actualizar película' : 'Agregar película' }}
        </button>

        <button
          v-if="editingId"
          @click="resetForm"
          class="bg-gray-700 text-white py-2 rounded hover:opacity-90 transition"
        >
          Cancelar edición
        </button>
      </div>
    </div>

    <div>
      <h2 class="text-2xl mb-4">
        Películas registradas
      </h2>

      <div class="grid gap-4">
        <div
          v-for="movie in peliculas"
          :key="movie.id"
          class="bg-[#1E1E1E] p-4 rounded-lg flex items-center gap-4"
        >
          <img
            v-if="movie.image"
            :src="movie.image"
            :alt="movie.title"
            class="w-20 h-28 object-cover rounded"
          />

          <div class="flex-grow">
            <h3 class="text-lg">
              {{ movie.title }}
            </h3>

            <p class="text-sm text-gray-400">
              {{ movie.director }}
            </p>

            <p class="text-sm text-gray-500">
              {{ movie.datetime }}
            </p>
          </div>

          <button
            @click="editMovie(movie)"
            class="bg-blue-700 hover:bg-blue-800 transition px-4 py-2 rounded text-sm"
          >
            Editar
          </button>

          <button
            @click="deleteMovie(movie.id)"
            class="bg-red-700 hover:bg-red-800 transition px-4 py-2 rounded text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>