<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import VuesticLogo from '../components/VuesticLogo.vue'
import NotFoundImage from '../components/NotFoundImage.vue'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col justify-between h-screen items-center bg-[var(--va-background-secondary)]">
    <RouterLink to="/">
      <VuesticLogo :gradient="false" class="my-8 h-5" />
    </RouterLink>

    <div class="flex flex-col items-center gap-6 px-4 my-8">
      <NotFoundImage />
      <h1 class="va-h1 text-center sm:text-5xl text-4xl">{{ t('pages.notFound.title') }}</h1>

      <p class="text-center">
        {{ t('pages.notFound.description') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-4">
        <VaButton to="/">{{ t('pages.notFound.goToHomepage') }}</VaButton>
        <VaButton href="https://github.com/epicmaxco/vuestic-admin/issues/new" preset="secondary" target="_blank"
          >{{ t('pages.notFound.createGitHubIssue') }}
        </VaButton>
      </div>
    </div>

    <div />
  </div>
</template>
