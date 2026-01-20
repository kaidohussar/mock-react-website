<template>
  <h1 class="page-title">{{ t('pages.pricingPlans.title') }}</h1>
  <div class="py-4 text-lg leading-[26px]">
    {{ t('pages.pricingPlans.moreInfo') }}
    <span class="text-primary underline">{{ t('pages.pricingPlans.pricingGuidelines') }}</span>.
  </div>
  <div class="flex flex-col p-4 bg-backgroundSecondary">
    <div class="flex justify-center">
      <VaButtonToggle
        v-model="selectedDuration"
        color="background-element"
        border-color="background-element"
        :options="[
          { label: t('pages.pricingPlans.monthly'), value: 'Monthly' },
          { label: t('pages.pricingPlans.annual'), value: 'Annual' },
        ]"
      />
    </div>
    <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-6 md:space-y-0 mt-6">
      <VaCard
        v-for="plan in pricingPlans"
        :key="plan.model"
        :class="{
          'md:!py-10 !bg-backgroundCardSecondary': plan.model === 'Advanced',
          '!bg-backgroundCardPrimary': plan.model !== 'Advanced',
          'ring-2 ring-primary ring-offset-2': plan.model === selectedPlan,
        }"
        class="flex w-[326px] md:w-[349px] h-fit p-6 rounded-[13px]"
      >
        <div :class="{ '!space-y-10': plan.model === 'Advanced' }" class="space-y-8 md:space-y-10">
          <div class="space-y-4 text-center">
            <h2 class="pricing-plan-card-title">
              {{ t(`pages.pricingPlans.plans.${plan.model}.title`) }}
            </h2>
            <VaBadge v-for="badge in plan.badges" :key="badge" :style="badgeStyles" :text="t(`pages.pricingPlans.badges.${badge}`)" color="primary" />
            <p class="text-lg leading-[26px] text-secondary">
              {{ t(`pages.pricingPlans.plans.${plan.model}.description`) }}
            </p>
            <div class="flex space-x-1 justify-center items-baseline text-lg leading-[26px]">
              <span>$</span
              ><span class="text-[32px] md:text-5xl leading-[110%] md:leading-[56px] font-bold">{{
                selectedDuration === 'Annual' ? plan.price : plan.priceMonth
              }}</span
              ><span>/ {{ selectedDuration === 'Annual' ? t('pages.pricingPlans.year') : t('pages.pricingPlans.month') }}</span>
            </div>
          </div>
          <div class="space-y-6">
            <div
              v-for="feature in plan.features"
              :key="feature.key"
              class="flex justify-between items-center text-lg leading-[26px]"
            >
              <p :class="{ 'text-secondary': !feature.isAvailable }">
                {{ t(`pages.pricingPlans.features.${feature.key}`) }}
              </p>
              <VaIcon v-if="feature.isAvailable" color="primary" name="mso-check" size="20px" />
              <VaIcon v-else color="backgroundBorder" name="mso-block" size="20px" />
            </div>
          </div>
          <div class="flex justify-center">
            <VaButton
              :disabled="plan.model === selectedPlan"
              :style="selectButtonStyles"
              @click="createModal(plan.model)"
            >
              {{ t('common.select') }}
            </VaButton>
          </div>
        </div>
      </VaCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast, useModal } from 'vuestic-ui'

import { badgeStyles, selectButtonStyles } from './styles'

import { pricingPlans } from './options'

const { t } = useI18n()
const { init } = useToast()
const { init: initModal } = useModal()

const selectedDuration = ref<string>('Annual')
const selectedPlan = ref<string>()

const createModal = (planModel: string) => {
  initModal({
    message: t('pages.pricingPlans.confirmChangePlan'),
    mobileFullscreen: false,
    maxWidth: '380px',
    size: 'small',
    onOk: () => selectPlan(planModel),
  })
}

const selectPlan = (planModel: string) => {
  init({ message: t('pages.pricingPlans.toasts.planChanged'), color: 'success' })
  selectedPlan.value = planModel
}
</script>
