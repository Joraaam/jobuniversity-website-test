<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
const positions = ref(5)
const budget = ref(15000)
const hours = ref(40)
const savings = computed(() => Math.round((positions.value * hours.value * 65 * 0.65) + (budget.value * 0.32)))
const roiMultiple = computed(() => Math.max(1.2, savings.value / 3000).toFixed(1))
const timeSaved = computed(() => Math.round(positions.value * hours.value * 0.7))
const partners = [
  {
    name: 'Leckers',
    logo: '/images/partners/Leckers.png',
    url: 'https://leckers.de'
  },
  {
    name: 'Spedition Hoffmann',
    logo: '/images/partners/Hoffmann.png',
    url: 'https://hoffmann-group.com'
  },
  {
    name: 'LUG',
    logo: '/images/partners/LUG.png',
    url: 'https://lug-gmbh.de'
  },
  {
    name: 'BVL',
    logo: '/images/partners/BVL.png',
    url: 'https://www.bvl.de'
  },
  {
    name: 'BVMW',
    logo: '/images/partners/BVMW.png',
    url: 'https://www.bvmw.de'
  },
  {
    name: 'Schmitz Hydro Technik',
    logo: '/images/partners/Schmitz.png',
    url: 'https://schmitz-cargobull.com'
  },
]
const partnersTrack = ref<HTMLElement | null>(null)

let position = 0
let speed = 0.7
let targetSpeed = 0.7
let animationFrame = 0

onMounted(() => {
  const track = partnersTrack.value
  if (!track) return

  track.addEventListener('mouseenter', () => {
    targetSpeed = 0.12
  })

  track.addEventListener('mouseleave', () => {
    targetSpeed = 0.7
  })

  const animate = () => {
    speed += (targetSpeed - speed) * 0.05
    position -= speed

    const resetPoint = track.scrollWidth / 3

    if (Math.abs(position) >= resetPoint) {
      position = 0
    }

    track.style.transform = `translate3d(${position}px, 0, 0)`

    animationFrame = requestAnimationFrame(animate)
  }

  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-b2c">
        <div class="particle p1"></div><div class="particle p2"></div>
        <div class="hero-label b2c-label"><span class="dot b2c-dot"></span>Für Azubis</div>
        <h1 class="hero-title">Deine Karriere<br />fängt <span class="accent-b2c">hier</span> an.<br /><span class="accent-lime">Für real.</span></h1>
        <p class="hero-sub">Kein Bullshit. Kein Warteraum. Wir verbinden dich direkt mit Top-Unternehmen, die nach dir suchen — nicht umgekehrt.</p>
        <RouterLink to="/b2c" class="hero-cta cta-b2c">Ausbildung finden →</RouterLink>
        <div class="hero-stats"><div><strong>12.000+</strong><span>Platzierte Azubis</span></div><div><strong>97%</strong><span>Erfolgsquote</span></div><div><strong>14 Tage</strong><span>Ø bis Zusage</span></div></div>
      </div>
      <div class="hero-b2b">
        <div class="particle p3"></div><div class="particle p4"></div>
        <div class="hero-label b2b-label"><span class="dot b2b-dot"></span>Für Unternehmen</div>
        <h1 class="hero-title">Top-Talente.<br />Kein <span class="accent-b2b">Aufwand.</span><br /><span class="accent-lime">Sofort.</span></h1>
        <p class="hero-sub">Schluss mit Azubi-Mangel. Wir liefern vorgeprüfte Bewerber direkt in dein Unternehmen — passgenau und schnell.</p>
        <RouterLink to="/b2b" class="hero-cta cta-b2b">Azubi finden →</RouterLink>
        <div class="hero-stats b2b-stats"><div><strong>500+</strong><span>Partnerunternehmen</span></div><div><strong>4,2×</strong><span>ROI im Ø</span></div><div><strong>72 Std</strong><span>Erste Kandidaten</span></div></div>
      </div>
    </section>

    <section class="partners-section">
  <p>Vertraut von starken Partnern</p>

  <div class="partners-track-wrap">
    <div class="partners-track" ref="partnersTrack">
      <a
  v-for="(partner, index) in [...partners, ...partners, ...partners]"
  :key="partner.name + index"
  :href="partner.url"
  target="_blank"
  class="partner-logo hoverable"
>
  <img :src="partner.logo" :alt="partner.name" />
</a>
    </div>
  </div>
</section>


    <section class="section">
      <span class="eyebrow">Was wir anbieten</span><h2>Für Azubis und Unternehmen.</h2>
      <div class="offer-grid">
        <div class="offer"><span class="offer-tag">Für Azubis</span><h3>Dein Karriere-Turbo</h3><p>Matching, Bewerbungscoaching, Interview-Vorbereitung und direkter Kontakt zu passenden Unternehmen.</p><ul><li>✓ Persönliches Profil-Matching</li><li>✓ Lebenslauf-Check</li><li>✓ Interview Coaching</li><li>✓ Begleitung bis zur Zusage</li></ul></div>
        <div class="offer"><span class="offer-tag">Für Unternehmen</span><h3>Azubi-Recruiting neu gedacht</h3><p>Wir unterstützen Firmen bei Azubi-Gewinnung, Vorauswahl, Content, Onboarding und Employer Branding.</p><ul><li>✓ Vorgeprüfte Bewerber</li><li>✓ Gen-Z Kommunikation</li><li>✓ Recruiting Content</li><li>✓ Weniger HR-Aufwand</li></ul></div>
      </div>
    </section>

    <section class="section"><span class="eyebrow">Warum JobUniversity?</span><h2>Vorteile mit Wow-Faktor.</h2><div class="adv-grid"><div class="adv-card">⚡<h3>Schnelles Matching</h3><p>Von Interesse zu passenden Kontakten in kurzer Zeit.</p></div><div class="adv-card">🎯<h3>Passgenau</h3><p>Talente und Firmen, die wirklich matchen.</p></div><div class="adv-card">🎥<h3>Video Content</h3><p>Interview-Videos und echte Stories für mehr Vertrauen.</p></div><div class="adv-card">🤝<h3>Persönlich</h3><p>Kein anonymes Portal, sondern echte Begleitung.</p></div><div class="adv-card">🚀<h3>Gen-Z Style</h3><p>Kommunikation, die junge Talente erreicht.</p></div><div class="adv-card">📈<h3>ROI Fokus</h3><p>Weniger Streuverlust und mehr qualifizierte Bewerber.</p></div></div></section>

    <section class="section"><span class="eyebrow">Interview Testimonials</span><h2>Echte Stimmen. Echte Stories.</h2><div class="videos-grid"><div class="video-card"><div class="video-thumb">▶</div><h3>Azubi Success Story</h3><p>„JobUniversity hat mir geholfen, schneller einen passenden Ausbildungsplatz zu finden.“</p></div><div class="video-card"><div class="video-thumb">▶</div><h3>Company Interview</h3><p>„Wir erreichen junge Talente jetzt viel besser und sparen Zeit im Recruiting.“</p></div><div class="video-card"><div class="video-thumb">▶</div><h3>Behind the Scenes</h3><p>Ein Blick hinter die Kulissen: Ausbildung, Team und Zukunft.</p></div></div></section>

    <section class="section roi-section"><div><span class="eyebrow">ROI Calculator</span><h2>Wie viel kann besseres Recruiting bringen?</h2><p class="muted">Simple Beispielrechnung für Unternehmen.</p></div><div class="roi-box"><label>Anzahl Ausbildungsstellen<input v-model.number="positions" type="number" min="1" /></label><label>Recruiting-Budget pro Jahr<input v-model.number="budget" type="number" min="0" step="500" /></label><label>Ø HR-Stunden pro Stelle<input v-model.number="hours" type="number" min="1" /></label><div class="roi-results"><div><strong>{{ savings.toLocaleString('de-DE') }} €</strong><span>Ersparnis/Jahr</span></div><div><strong>{{ roiMultiple }}×</strong><span>ROI</span></div><div><strong>{{ timeSaved }} h</strong><span>Zeit gespart</span></div></div></div></section>
  </main>
</template>
