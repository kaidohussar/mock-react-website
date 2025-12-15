<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="page home-page">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">{{ t('home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('home.hero.subtitle') }}</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg">
            {{ t('home.hero.cta') }}
          </button>
          <button class="btn btn-secondary btn-lg">
            {{ t('home.hero.secondaryCta') }}
          </button>
        </div>
      </div>
    </section>

    <section class="features-preview">
      <div class="container">
        <h2 class="section-title">{{ t('home.features.title') }}</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>{{ t('home.features.analytics.title') }}</h3>
            <p>{{ t('home.features.analytics.description') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>{{ t('home.features.automation.title') }}</h3>
            <p>{{ t('home.features.automation.description') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>{{ t('home.features.collaboration.title') }}</h3>
            <p>{{ t('home.features.collaboration.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>{{ t('home.cta.title') }}</h2>
        <p>{{ t('home.cta.subtitle') }}</p>
        <router-link to="/pricing" class="btn btn-primary btn-lg">
          {{ t('home.cta.button') }}
        </router-link>
      </div>
    </section>
  </div>
</template>
