<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const progress = document.getElementById('scroll-progress')

window.addEventListener('scroll', () => {
  if (!progress) return

  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progressWidth = (scrollTop / docHeight) * 100

  progress.style.width = `${progressWidth}%`
})
  const cursor = document.getElementById('cursor')
  const follower = document.getElementById('follower')
  if (!cursor || !follower) return
  let mx = 0, my = 0, fx = 0, fy = 0
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY })
  const animate = () => {
    cursor.style.left = `${mx - 6}px`; cursor.style.top = `${my - 6}px`
    fx += (mx - fx) * 0.02;fy += (my - fy) * 0.02
    follower.style.left = `${fx - 20}px`; follower.style.top = `${fy - 20}px`
    requestAnimationFrame(animate)
  }
  animate()
})
</script>

<template>
  <div class="noise"></div>
  <div id="cursor" class="cursor"></div>
  <div id="follower" class="cursor-follower"></div>
  <div id="scroll-progress"></div>
  <nav class="site-nav">
    <RouterLink to="/" class="logo">
  <img src="/images/jobuniversity-logo.png" alt="JobUniversity" />
</RouterLink>
    <ul class="nav-links">
      <li><RouterLink to="/b2c">Azubis</RouterLink></li>
      <li><RouterLink to="/b2b">Unternehmen</RouterLink></li>
      <li><RouterLink to="/advantages">Vorteile</RouterLink></li>
      <li><RouterLink to="/contact">Kontakt</RouterLink></li>
    </ul>
    <RouterLink to="/contact" class="nav-cta">Jetzt starten →</RouterLink>
  </nav>
  <RouterView />
</template>
