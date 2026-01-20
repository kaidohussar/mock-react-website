<template>
  <div class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">{{ t('pages.preferences.name') }}</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.userName }}
      </div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" @click="emits('openNameModal')">
      {{ t('common.edit') }}
    </VaButton>
  </div>
  <VaDivider />
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">{{ t('pages.preferences.email') }}</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.email }}
      </div>
    </div>
  </div>
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">{{ t('pages.preferences.password') }}</p>
    <div class="flex-1">
      <div class="max-w-[748px]">•••••••••••••</div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" @click="emits('openResetPasswordModal')">
      {{ t('pages.preferences.resetPassword') }}
    </VaButton>
  </div>
  <VaDivider />
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">{{ t('pages.preferences.twoFactorAuth') }}</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ twoFA.content }}
      </div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" :color="twoFA.color" @click="toggle2FA">
      {{ twoFA.button }}
    </VaButton>
  </div>
  <VaDivider />
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">{{ t('pages.preferences.emailSubscriptions') }}</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        <p>{{ t('pages.preferences.emailSubscriptionsText') }}</p>
        <div class="flex space-x-1 w-fit">
          <RouterLink :to="{ name: 'settings' }" class="font-semibold text-primary">{{ t('pages.preferences.notificationSettings') }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useToast } from 'vuestic-ui'

import { useUserStore } from '../../../stores/user-store'

import { buttonStyles } from '../styles'

const { t } = useI18n()
const store = useUserStore()

const { init } = useToast()

const toastMessage = computed(() => (store.is2FAEnabled ? t('pages.preferences.twoFAEnabled') : t('pages.preferences.twoFADisabled')))

const twoFA = computed(() => {
  if (store.is2FAEnabled) {
    return {
      color: 'danger',
      button: t('pages.preferences.disable2FA'),
      content: t('pages.preferences.twoFAEnabledContent'),
    }
  } else {
    return {
      color: 'primary',
      button: t('pages.preferences.setup2FA'),
      content: t('pages.preferences.twoFADisabledContent'),
    }
  }
})

const toggle2FA = () => {
  store.toggle2FA()
  init({ message: toastMessage.value, color: 'success' })
}

const emits = defineEmits(['openNameModal', 'openResetPasswordModal'])
</script>
