<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">{{ t('pages.auth.signup.title') }}</h1>
    <p class="text-base mb-4 leading-5">
      {{ t('pages.auth.signup.haveAccount') }}
      <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">{{ t('pages.auth.signup.login') }}</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[(v) => !!v || t('validation.emailRequired'), (v) => /.+@.+\..+/.test(v) || t('validation.emailValid')]"
      class="mb-4"
      :label="t('common.email')"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        ref="password1"
        v-model="formData.password"
        :rules="passwordRules"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        :label="t('common.password')"
        :messages="t('pages.auth.signup.passwordHint')"
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
      <VaInput
        ref="password2"
        v-model="formData.repeatPassword"
        :rules="[
          (v) => !!v || t('validation.repeatPasswordRequired'),
          (v) => v === formData.password || t('validation.passwordsDontMatch'),
        ]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        :label="t('pages.auth.signup.repeatPassword')"
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

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit">{{ t('pages.auth.signup.createAccount') }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useForm, useToast } from 'vuestic-ui'

const { t } = useI18n()
const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  repeatPassword: '',
})

const submit = () => {
  if (validate()) {
    init({
      message: t('pages.auth.signup.success'),
      color: 'success',
    })
    push({ name: 'dashboard' })
  }
}

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || t('validation.passwordRequired'),
  (v) => (v && v.length >= 8) || t('validation.password8Chars'),
  (v) => (v && /[A-Za-z]/.test(v)) || t('validation.passwordLetter'),
  (v) => (v && /\d/.test(v)) || t('validation.passwordNumber'),
  (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || t('validation.passwordSpecial'),
]
</script>
