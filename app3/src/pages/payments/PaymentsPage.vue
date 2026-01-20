<template>
  <h1 class="page-title">{{ t('pages.payments.title') }}</h1>

  <VaCard class="mb-6">
    <VaCardContent>
      <div class="text-2xl font-bold leading-5 mb-6">{{ t('pages.payments.myCards') }}</div>

      <PaymentCardList />
    </VaCardContent>
  </VaCard>

  <VaCard class="mb-6">
    <VaCardContent>
      <div class="text-2xl font-bold leading-5 mb-6">{{ t('pages.payments.billingAddress') }}</div>

      <BillingAddressList />

      <div class="space-y-2 mt-6">
        <div class="text-lg font-bold mb-2">{{ t('pages.payments.taxLocation') }}</div>
        <div class="space-y-1">
          <div class="text-sm text-gray-500">{{ t('pages.payments.taxInfo') }}</div>
          <div class="text-sm text-primary underline">{{ t('pages.payments.moreInfo') }}</div>
        </div>
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import PaymentCardList from './widgets/my-cards/PaymentCardList.vue'
import BillingAddressList from './widgets/billing-address/BillingAddressList.vue'

const { t } = useI18n()
</script>
