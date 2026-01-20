<template>
  <VaForm ref="form" @submit.prevent="submit">
    <VaInput
      v-model="paymentCardLocal.name"
      :rules="[(v) => !!v || t('pages.payments.form.cardNameRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.cardName')"
    />
    <VaCheckbox v-model="paymentCardLocal.isPrimary" class="mb-4" :label="t('pages.payments.form.primaryCard')" />
    <VaSelect
      v-model="paymentCardLocal.paymentSystem"
      :options="paymentSystemTypeOptions"
      :rules="[(v) => !!v || t('pages.payments.form.paymentSystemRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.paymentSystem')"
    />
    <VaInput
      v-model="paymentCardLocal.cardNumberMasked"
      :rules="[(v) => !!v || t('pages.payments.form.cardNumberRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.cardNumber')"
      mask="creditCard"
      placeholder="#### #### #### ####"
    />
    <VaInput
      v-model="paymentCardLocal.expirationDate"
      :mask="{
        date: true,
        datePattern: ['m', 'y'],
      }"
      :rules="[
        (v) => !!v || t('pages.payments.form.expirationDateRequired'),
        (v) => /^\d{4}$/.test(v) || t('pages.payments.form.expirationDateFormat'),
      ]"
      class="mb-4"
      :label="t('pages.payments.form.expirationDate')"
    />

    <div class="flex justify-end gap-3">
      <VaButton color="secondary" preset="secondary" @click="emits('cancel')">{{ t('common.cancel') }}</VaButton>
      <VaButton @click="submit">{{ submitText }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useForm } from 'vuestic-ui'
import { PaymentCard, PaymentSystemType } from '../../types'
import { watch, ref } from 'vue'

const { t } = useI18n()
const { validate } = useForm('form')
const emits = defineEmits(['save', 'cancel'])

const props = defineProps<{
  paymentCard: PaymentCard
  submitText: string
}>()

const paymentSystemTypeOptions = Object.values(PaymentSystemType)
const paymentCardLocal = ref({ ...props.paymentCard })

watch(
  () => props.paymentCard,
  (value) => {
    paymentCardLocal.value = { ...value }
  },
  { deep: true },
)

const submit = () => {
  if (validate()) {
    emits('save', {
      ...paymentCardLocal.value,
      cardNumberMasked: paymentCardLocal.value.cardNumberMasked.replace(/\d{12}(.*)/g, '****$1'),
    })
  }
}
</script>
