<template>
  <h1 class="page-title">{{ t('pages.faq.title') }}</h1>
  <Categories />
  <RequestDemo />
  <Questions />
  <Navigation />
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Categories from './widgets/Categories.vue'
import Questions from './widgets/Questions.vue'
import RequestDemo from './widgets/RequestDemo.vue'
import Navigation from './widgets/Navigation.vue'

const { t } = useI18n()
</script>
