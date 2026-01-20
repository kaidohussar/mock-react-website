<template>
  <VaForm ref="passwordForm" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">{{ t('pages.auth.recoverPassword.title') }}</h1>
    <p class="text-base mb-4 leading-5">
      {{ t('pages.auth.recoverPassword.description') }}
    </p>
    <VaInput
      v-model="email"
      :rules="[(v) => !!v || t('validation.emailRequired')]"
      class="mb-4"
      :label="t('pages.auth.recoverPassword.enterEmail')"
      type="email"
    />
    <VaButton class="w-full mb-2" @click="submit">{{ t('pages.auth.recoverPassword.sendPassword') }}</VaButton>
    <VaButton :to="{ name: 'login' }" class="w-full" preset="secondary" @click="submit">{{ t('pages.auth.recoverPassword.goBack') }}</VaButton>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vuestic-ui'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const email = ref('')
const form = useForm('passwordForm')
const router = useRouter()

const submit = () => {
  if (form.validate()) {
    router.push({ name: 'recover-password-email' })
  }
}
</script>
