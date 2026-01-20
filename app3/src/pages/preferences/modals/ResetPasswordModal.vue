<template>
  <VaModal
    max-width="530px"
    :mobile-fullscreen="false"
    hide-default-actions
    model-value
    close-button
    @update:modelValue="emits('cancel')"
  >
    <h1 class="va-h5 mb-4">{{ t('pages.preferences.modals.resetPassword.title') }}</h1>
    <VaForm ref="form" class="space-y-6" @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VaInput
          v-model="oldPassowrd"
          :rules="oldPasswordRules"
          :label="t('pages.preferences.modals.resetPassword.oldPassword')"
          :placeholder="t('pages.preferences.modals.resetPassword.oldPassword')"
          required-mark
          type="password"
        />
        <div class="hidden md:block" />
        <VaInput
          v-model="newPassword"
          :rules="newPasswordRules"
          :label="t('pages.preferences.modals.resetPassword.newPassword')"
          :placeholder="t('pages.preferences.modals.resetPassword.newPassword')"
          required-mark
          type="password"
        />
        <VaInput
          v-model="repeatNewPassword"
          :rules="repeatNewPasswordRules"
          :label="t('pages.preferences.modals.resetPassword.repeatNewPassword')"
          :placeholder="t('pages.preferences.modals.resetPassword.repeatNewPassword')"
          required-mark
          type="password"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-2 items-center">
          <div>
            <VaIcon :name="newPassword?.length! >= 8 ? 'mso-check' : 'mso-close'" color="secondary" size="20px" />
          </div>
          <p>{{ t('pages.preferences.modals.resetPassword.rule8Chars') }}</p>
        </div>
        <div class="flex space-x-2 items-center">
          <div>
            <VaIcon :name="new Set(newPassword).size >= 6 ? 'mso-check' : 'mso-close'" color="secondary" size="20px" />
          </div>
          <p>{{ t('pages.preferences.modals.resetPassword.rule6Unique') }}</p>
        </div>
      </div>
      <div class="flex flex-col-reverse md:justify-end md:flex-row md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" color="secondary" @click="emits('cancel')">{{ t('common.cancel') }}</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="submit" @click="submit">{{ t('pages.preferences.modals.resetPassword.updatePassword') }}</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm, useToast } from 'vuestic-ui'

import { buttonStyles } from '../styles'

const { t } = useI18n()

const oldPassowrd = ref<string>()
const newPassword = ref<string>()
const repeatNewPassword = ref<string>()

const { validate } = useForm('form')
const { init } = useToast()

const emits = defineEmits(['cancel'])

const submit = () => {
  if (validate()) {
    init({ message: t('pages.preferences.modals.resetPassword.success'), color: 'success' })
    emits('cancel')
  }
}

const oldPasswordRules = [(v: string) => !!v || t('pages.preferences.modals.resetPassword.oldPasswordRequired')]

const newPasswordRules = [
  (v: string) => !!v || t('pages.preferences.modals.resetPassword.newPasswordRequired'),
  (v: string) => v?.length >= 8 || t('pages.preferences.modals.resetPassword.rule8Chars'),
  (v: string) => new Set(v).size >= 6 || t('pages.preferences.modals.resetPassword.rule6Unique'),
  (v: string) => v !== oldPassowrd.value || t('pages.preferences.modals.resetPassword.newPasswordSame'),
]

const repeatNewPasswordRules = [
  (v: string) => !!v || t('pages.preferences.modals.resetPassword.repeatPasswordRequired'),
  (v: string) => v === newPassword.value || t('pages.preferences.modals.resetPassword.passwordMismatch'),
]
</script>

<style lang="scss">
// TODO temporary before https://github.com/epicmaxco/vuestic-ui/issues/4020 fix
.va-modal__inner {
  min-width: 326px;
}
</style>
