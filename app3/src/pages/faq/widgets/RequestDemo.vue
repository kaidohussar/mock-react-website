<template>
  <VaCard class="mb-5 pr-4 flex justify-between">
    <div>
      <VaCardContent>
        <h2 class="va-h5">{{ t('pages.faq.demo.gotQuestions') }}</h2>
        <p class="text-base leading-5">{{ t('pages.faq.demo.description') }}</p>
      </VaCardContent>
      <VaCardActions align="left">
        <VaButton @click="showModal = !showModal">{{ t('pages.faq.demo.requestDemo') }}</VaButton>
      </VaCardActions>
    </div>
    <img :alt="t('pages.faq.demo.imageAlt')" src="../request-demo.svg" />
  </VaCard>
  <VaModal v-model="showModal" :before-ok="submit" close-button :ok-text="t('pages.faq.demo.requestDemo')" size="small">
    <VaForm ref="form" @submit.prevent="submit">
      <h3 class="va-h3">{{ t('pages.faq.demo.modalTitle') }}</h3>
      <p class="text-base mb-4 leading-5">
        {{ t('pages.faq.demo.modalDescription') }}
      </p>
      <VaInput
        v-model="email"
        :rules="[(v) => !!v || t('validation.emailRequired'), (v) => /.+@.+\..+/.test(v) || t('validation.emailValid')]"
        class="mb-4"
        :label="t('common.email')"
        type="email"
      />
    </VaForm>
  </VaModal>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useForm, useToast } from 'vuestic-ui'

const { t } = useI18n()
const showModal = ref(false)
const email = ref('')
const { validate } = useForm('form')
const { init } = useToast()

const submit = async () => {
  if (!validate()) {
    return
  }
  init({
    title: t('pages.faq.demo.toasts.submitted'),
    message: t('pages.faq.demo.toasts.expertContact'),
    color: 'success',
  })
  showModal.value = false
}
</script>
