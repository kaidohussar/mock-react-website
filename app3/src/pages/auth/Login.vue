<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">{{ t('pages.auth.login.title') }}</h1>
    <p class="text-base mb-4 leading-5">
      {{ t('pages.auth.login.newToVuestic') }}
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">{{ t('pages.auth.login.signUp') }}</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      :label="t('common.email')"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        :label="t('common.password')"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" :label="t('pages.auth.login.keepSignedIn')" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        {{ t('pages.auth.login.forgotPassword') }}
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit">{{ t('pages.auth.login.loginButton') }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'

const { t } = useI18n()
const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
})

const submit = () => {
  if (validate()) {
    init({ message: t('pages.auth.login.success'), color: 'success' })
    push({ name: 'dashboard' })
  }
}
</script>
