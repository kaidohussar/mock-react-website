<template>
  <VaModal hide-default-actions model-value size="small" close-button @cancel="emits('close')">
    <h3 class="va-h4 mb-4">{{ t('pages.payments.editBillingAddress') }}</h3>
    <AddressEdit
      :billing-address="billingAddress"
      :submit-text="t('pages.payments.saveAddress')"
      @cancel="emits('close')"
      @save="updateCard"
    />
  </VaModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AddressEdit from './BillingAddressEdit.vue'
import { BillingAddress } from '../../types'
import { useToast } from 'vuestic-ui'
import { useBillingAddressesStore } from '../../../../stores/billing-addresses'

const { t } = useI18n()
const isModalOpen = ref(false)
const { init } = useToast()

const props = defineProps<{
  billingAddress: BillingAddress
}>()

const emits = defineEmits(['close'])
const store = useBillingAddressesStore()
const billingAddress = ref({ ...props.billingAddress })

const updateCard = (address: BillingAddress) => {
  isModalOpen.value = false
  store.update(address)
  init({ message: t('pages.payments.toasts.addressUpdated'), color: 'success' })
  emits('close')
}
</script>
