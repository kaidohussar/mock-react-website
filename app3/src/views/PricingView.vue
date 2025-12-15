<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const plans = ['free', 'pro', 'enterprise'] as const

const getFeatures = (plan: string): string[] => {
  return tm(`pricing.plans.${plan}.features`) as string[]
}
</script>

<template>
  <div class="page pricing-page">
    <section class="page-hero">
      <div class="container">
        <h1>{{ t('pricing.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('pricing.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="pricing-section">
      <div class="container">
        <div class="pricing-grid">
          <div
            v-for="plan in plans"
            :key="plan"
            :class="['pricing-card', { popular: plan === 'pro' }]"
          >
            <div v-if="plan === 'pro'" class="popular-badge">
              {{ t('pricing.plans.pro.popular') }}
            </div>
            <h3 class="plan-name">{{ t(`pricing.plans.${plan}.name`) }}</h3>
            <div class="plan-price">
              <span class="price">{{ t(`pricing.plans.${plan}.price`) }}</span>
              <span class="period">{{ t(`pricing.plans.${plan}.period`) }}</span>
            </div>
            <p class="plan-description">
              {{ t(`pricing.plans.${plan}.description`) }}
            </p>
            <ul class="plan-features">
              <li v-for="(feature, index) in getFeatures(plan)" :key="index">
                <span class="check">✓</span> {{ feature }}
              </li>
            </ul>
            <button
              :class="['btn', 'btn-block', plan === 'pro' ? 'btn-primary' : 'btn-secondary']"
            >
              {{ t(`pricing.plans.${plan}.cta`) }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section">
      <div class="container">
        <h2>{{ t('pricing.faq.title') }}</h2>
        <div class="faq-list">
          <div v-for="q in ['q1', 'q2', 'q3']" :key="q" class="faq-item">
            <h4>{{ t(`pricing.faq.${q}.question`) }}</h4>
            <p>{{ t(`pricing.faq.${q}.answer`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
