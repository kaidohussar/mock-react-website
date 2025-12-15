<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = [
  { key: 'dashboard', icon: '📋' },
  { key: 'integrations', icon: '🔗' },
  { key: 'security', icon: '🔒' },
  { key: 'api', icon: '🛠️' },
  { key: 'mobile', icon: '📱' },
  { key: 'support', icon: '💬' },
]
</script>

<template>
  <div class="page features-page">
    <section class="page-hero">
      <div class="container">
        <h1>{{ t('features.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('features.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <div class="features-list">
          <div v-for="feature in features" :key="feature.key" class="feature-item">
            <div class="feature-icon-large">{{ feature.icon }}</div>
            <div class="feature-content">
              <h3>{{ t(`features.list.${feature.key}.title`) }}</h3>
              <p>{{ t(`features.list.${feature.key}.description`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
