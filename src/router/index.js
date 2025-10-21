import { createRouter, createWebHistory } from 'vue-router'
import Cartelera from '../views/Cartelera.vue'
import DetallePelicula from '../views/DetallePelicula.vue'
import { functions } from '../data/functions'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cartelera',
      component: Cartelera,
      meta: { title: 'Cartelera semanal | El Beso del Búho' }
    },
    {
      path: '/pelicula/:id',
      name: 'pelicula',
      component: DetallePelicula,
      props: true,
      meta: { title: 'Detalle de película | El Beso del Búho' }
    },
    {
  path: '/reserva/:id',
  name: 'reserva',
  component: () => import('../views/SeatSelection.vue'),
  props: true,
  meta: { title: 'Selección de asientos | El Beso del Búho' }
}

  ]
})

// Hook global para actualizar título y metatags
router.afterEach((to) => {
  let title = to.meta.title || 'El Beso del Búho'
  let description = 'Espacio independiente de cine alternativo en Culiacán.'
  let image = '/logo.png' // fallback si la peli no tiene poster

  if (to.name === 'pelicula' && to.params.id) {
    const movie = functions.find(f => f.id === parseInt(to.params.id))
    if (movie) {
      title = `${movie.title} | El Beso del Búho`
      image = movie.poster
    }
  }

  // Title
  document.title = title

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', description)
  } else {
    metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    metaDesc.content = description
    document.head.appendChild(metaDesc)
  }

  // Función auxiliar para crear/actualizar tags
  const setMeta = (attr, value, key = 'property') => {
    let tag = document.querySelector(`meta[${key}='${attr}']`)
    if (tag) {
      tag.setAttribute('content', value)
    } else {
      tag = document.createElement('meta')
      tag.setAttribute(key, attr)
      tag.setAttribute('content', value)
      document.head.appendChild(tag)
    }
  }

  // Open Graph
  setMeta('og:title', title)
  setMeta('og:description', description)
  setMeta('og:image', image)
  setMeta('og:type', 'website')
  setMeta('og:url', window.location.href)

  // Twitter Card
  setMeta('twitter:card', 'summary_large_image', 'name')
  setMeta('twitter:title', title, 'name')
  setMeta('twitter:description', description, 'name')
  setMeta('twitter:image', image, 'name')
})

export default router
