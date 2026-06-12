<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

let lenis: Lenis | null = null
let lenisFrame = 0
let cursorFrame = 0

const scrollToTop = () => {
  if (lenis) {
    lenis.scrollTo(0)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  const progress = document.getElementById('scroll-progress')
  const cursor = document.getElementById('cursor')
  const follower = document.getElementById('follower')
  const spotlight = document.querySelector('.spotlight') as HTMLElement | null

  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    lenisFrame = requestAnimationFrame(raf)
  }

  lenisFrame = requestAnimationFrame(raf)

  window.addEventListener('scroll', () => {
    if (!progress) return

    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progressWidth = (scrollTop / docHeight) * 100

    progress.style.width = `${progressWidth}%`
  })

  let mx = 0
  let my = 0
  let fx = 0
  let fy = 0
  let sx = window.innerWidth / 2
  let sy = window.innerHeight / 2

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX
    my = e.clientY
  })

  const animateCursor = () => {
    if (cursor && follower) {
      cursor.style.left = `${mx - 6}px`
      cursor.style.top = `${my - 6}px`

      fx += (mx - fx) * 0.08
      fy += (my - fy) * 0.08

      follower.style.left = `${fx - 20}px`
      follower.style.top = `${fy - 20}px`
    }

    if (spotlight) {
      sx += (mx - sx) * 0.06
      sy += (my - sy) * 0.06

      spotlight.style.left = `${sx}px`
      spotlight.style.top = `${sy}px`
    }

    cursorFrame = requestAnimationFrame(animateCursor)
  }

  animateCursor()
})

onUnmounted(() => {
  cancelAnimationFrame(lenisFrame)
  cancelAnimationFrame(cursorFrame)
  lenis?.destroy()
})
</script>

<template>
  <div class="spotlight"></div>
  <div class="noise"></div>
  <div id="cursor" class="cursor"></div>
  <div id="follower" class="cursor-follower"></div>
  <div id="scroll-progress"></div>

  <nav class="site-nav">
    <RouterLink to="/" class="logo" @click="scrollToTop">
      <img src="/images/jobuniversity-logo.png" alt="JobUniversity" />
    </RouterLink>

    <ul class="nav-links">
      <li><RouterLink to="/b2c">Azubis</RouterLink></li>
      <li><RouterLink to="/b2b">Unternehmen</RouterLink></li>
      <li><RouterLink to="/advantages">Vorteile</RouterLink></li>
      <li><RouterLink to="/contact">Kontakt</RouterLink></li>
    </ul>

    <RouterLink to="/contact" class="nav-cta">
      Jetzt starten →
    </RouterLink>
  </nav>

  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>