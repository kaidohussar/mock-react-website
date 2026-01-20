<template>
  <VaForm ref="form" @submit.prevent="submit">
    <VaInput
      v-model="localBillingAddress.name"
      :rules="[(v) => !!v || t('pages.payments.form.nameRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.name')"
    />
    <VaCheckbox v-model="localBillingAddress.isPrimary" class="mb-4" :label="t('pages.payments.form.primaryAddress')" />
    <VaInput
      v-model="localBillingAddress.street"
      :rules="[(v) => !!v || t('pages.payments.form.streetRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.street')"
    />
    <VaInput
      v-model="localBillingAddress.city"
      :rules="[(v) => !!v || t('pages.payments.form.cityRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.city')"
    />
    <VaInput
      v-model="localBillingAddress.state"
      :rules="[(v) => !!v || t('pages.payments.form.stateRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.state')"
    />
    <VaInput
      v-model="localBillingAddress.postalCode"
      :rules="[(v) => !!v || t('pages.payments.form.postalCodeRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.postalCode')"
    />
    <VaInput
      v-model="localBillingAddress.country"
      :rules="[(v) => !!v || t('pages.payments.form.countryRequired')]"
      class="mb-4"
      :label="t('pages.payments.form.country')"
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
import { BillingAddress } from '../../types'
import { watch, ref } from 'vue'

const { t } = useI18n()
const { validate } = useForm('form')
const emits = defineEmits(['save', 'cancel'])

const props = defineProps<{
  billingAddress: BillingAddress
  submitText: string
}>()

const localBillingAddress = ref<BillingAddress>({ ...props.billingAddress })

watch(
  () => props.billingAddress,
  (value) => {
    localBillingAddress.value = { ...value }
  },
  { deep: true },
)

const submit = () => {
  if (validate()) {
    emits('save', localBillingAddress.value)
  }
}
</script>
