<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import LanguageSelector from './LanguageSelector.vue'

const { t } = useI18n()
const route = useRoute()

const isActive = (path: string) => route.path === path
</script>

<template>
  <header class="header">
    <div class="header-container">
      <router-link to="/" class="logo">
        {{ t('header.logo') }}
      </router-link>
      <nav class="nav">
        <router-link to="/" :class="['nav-link', { active: isActive('/') }]">
          {{ t('nav.home') }}
        </router-link>
        <router-link to="/features" :class="['nav-link', { active: isActive('/features') }]">
          {{ t('nav.features') }}
        </router-link>
        <router-link to="/pricing" :class="['nav-link', { active: isActive('/pricing') }]">
          {{ t('nav.pricing') }}
        </router-link>
      </nav>
      <div class="header-actions">
        <LanguageSelector />
        <button class="btn btn-primary">{{ t('header.getStarted') }}</button>
      </div>
    </div>
  </header>
</template>
