<template>
  <VaModal hide-default-actions model-value size="small" close-button @cancel="emits('close')">
    <h3 class="va-h4 mb-4">{{ t('pages.payments.addBillingAddress') }}</h3>
    <BillingAddressEdit
      :billing-address="billingAddress"
      :submit-text="t('pages.payments.addAddress')"
      @cancel="emits('close')"
      @save="update"
    />
  </VaModal>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import BillingAddressEdit from './BillingAddressEdit.vue'
import { BillingAddress } from '../../types'
import { useToast } from 'vuestic-ui'
import { useBillingAddressesStore } from '../../../../stores/billing-addresses'

const { t } = useI18n()
const isModalOpen = ref(false)

const emits = defineEmits(['close'])
const store = useBillingAddressesStore()
const { init } = useToast()

const billingAddress = reactive({
  id: Math.ceil(Math.random() * 100) + '',
  name: '',
  isPrimary: false,
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
} satisfies BillingAddress)

const update = (address: BillingAddress) => {
  isModalOpen.value = false
  store.create(address)
  init({ message: t('pages.payments.toasts.addressCreated'), color: 'success' })
  emits('close')
}
</script>
