<script setup>
const functions = [
  { id: 1, title: "Twinless",              datetime: "Viernes 20:00 h",  poster: "/twinless.jpg", capacity: 30, reserved: 12 },
  { id: 2, title: "The History of Sound",  datetime: "Sábado 18:00 h",   poster: "/history.jpg", capacity: 30, reserved: 29 },
  { id: 3, title: "Sentimental Value",     datetime: "Domingo 17:00 h",  poster: "/sentimental.jpg", capacity: 25, reserved: 25 },
  { id: 4, title: "Bugonia",               datetime: "Jueves 19:00 h",   poster: "/bugonia.jpg", capacity: 20, reserved: 3  },
  { id: 5, title: "Marty Supreme",         datetime: "Miércoles 21:00 h",poster: "/marty.jpg", capacity: 40, reserved: 33 },
  { id: 6, title: "The Smashing Machine",  datetime: "Lunes 17:00 h",    poster: "/smashing.jpg", capacity: 35, reserved: 0  },
];

// Reglas: soldout si reserved >= capacity; few si reserved >= 0.8 * capacity; disponible en otro caso
const getStatus = (f) => {
  if (f.reserved >= f.capacity) return 'soldout';
  if (f.reserved >= 0.8 * f.capacity) return 'few';
  return 'available';
};

// Función para compartir la cartelera
const shareProgram = () => {
  const url = window.location.origin; 
  const title = "Cartelera semanal | El Beso del Búho";
  const text = "Checa la programación completa de El Beso del Búho 📽️✨";

  if (navigator.share) {
    navigator.share({ title, text, url }).catch(() => {});
  } else {
    // Fallback: copiar enlace
    try {
      navigator.clipboard?.writeText(url);
      alert('Enlace de la programación copiado. ¡Listo para compartir!');
    } catch {
      alert(`Copia y comparte este enlace: ${url}`);
    }
  }
};
</script>

<template>
  <div class="min-h-screen bg-dark text-textMain flex flex-col">
    <!-- Header -->
    <header class="py-8 text-center flex flex-col items-center gap-4">
      <img src="/logo.png" alt="El Beso del Búho" class="w-full max-w-sm h-auto" />
      <h1 class="text-3xl font-playfair text-textMain">Cartelera semanal</h1>

      <!-- Botón compartir -->
      <button
        @click="shareProgram"
        class="mt-2 px-6 py-2 bg-secondary text-white font-inter rounded hover:opacity-90 transition"
      >
        📤 Comparte nuestra programación
      </button>
    </header>

    <!-- Grid cartelera -->
    <main class="flex-grow px-6 pb-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <article
          v-for="f in functions"
          :key="f.id"
          class="bg-dark rounded-lg p-4 shadow-sm ring-1 ring-[#2a2a2a] flex flex-col items-center"
        >
          <router-link :to="`/pelicula/${f.id}`">
            <img :src="f.poster" :alt="f.title" class="w-full h-64 object-contain bg-black/20 rounded" />
          </router-link>
          <router-link :to="`/pelicula/${f.id}`">
            <h3 class="mt-3 text-lg font-playfair text-center leading-snug">{{ f.title }}</h3>
          </router-link>
          <p class="text-textSecondary font-inter text-sm">{{ f.datetime }}</p>

          <router-link
  v-if="f.reserved < f.capacity"
  :to="`/reserva/${f.id}`"
  class="mt-4 px-4 py-2 font-inter rounded bg-primary text-white hover:opacity-90 transition text-center block"
>
  Reservar
</router-link>

<button
  v-else
  class="mt-4 px-4 py-2 font-inter rounded bg-dark text-textSecondary cursor-not-allowed ring-1 ring-[#2a2a2a] block"
  disabled
>
  Agotada
</button>

        </article>
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-4 text-center text-textSecondary text-sm border-t border-[#1e1e1e]">
      Espacio independiente de cine alternativo en Culiacán
    </footer>
  </div>
</template>
