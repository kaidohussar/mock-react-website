<template>
  <div>
    <h1 class="font-semibold text-4xl mb-4">{{ t('pages.auth.checkEmail.title') }}</h1>
    <p class="text-base mb-4 leading-5">
      {{ t('pages.auth.checkEmail.description') }}
      <span class="va-link">{{ t('pages.auth.checkEmail.contactSupport') }}</span>.
    </p>

    <div class="flex justify-center mt-4">
      <VaButton :to="{ name: 'login' }" class="w-full">{{ t('pages.auth.checkEmail.backToLogin') }}</VaButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
