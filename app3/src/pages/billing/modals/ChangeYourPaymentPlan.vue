<template>
  <VaModal
    :mobile-fullscreen="false"
    size="small"
    max-width="380px"
    hide-default-actions
    model-value
    close-button
    @update:modelValue="emits('cancel')"
  >
    <div class="space-y-6">
      <h3>
        {{ t('pages.billing.modals.switchPlanConfirm') }}
        <span class="font-bold text-primary">{{ yearlyPlan ? t('pages.billing.monthly') : t('pages.billing.annual') }}</span>
        {{ t('pages.billing.modals.plan') }}?
      </h3>
      <div class="flex flex-col-reverse md:justify-end md:flex-row md:space-x-4">
        <VaButton preset="secondary" color="secondary" @click="emits('cancel')">{{ t('common.cancel') }}</VaButton>
        <VaButton class="mb-4 md:mb-0" @click="confirm()">{{ t('pages.billing.modals.updatePlan') }}</VaButton>
      </div>
    </div>
  </VaModal>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useToast } from 'vuestic-ui'

const { t } = useI18n()
const { init } = useToast()

defineProps({
  yearlyPlan: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['cancel', 'confirm'])

const confirm = () => {
  init({ message: t('pages.billing.toasts.paymentPlanChanged'), color: 'success' })
  emits('confirm')
}
</script>

<style lang="scss">
.va-modal__inner {
  min-width: 326px;
}
</style>
