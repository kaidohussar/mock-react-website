<template>
  <VaModal
    :mobile-fullscreen="false"
    size="small"
    hide-default-actions
    max-width="380px"
    model-value
    close-button
    @update:modelValue="emits('cancel')"
  >
    <h1 class="va-h5 mb-4">{{ t('pages.preferences.modals.editName.title') }}</h1>
    <VaForm ref="form" @submit.prevent="submit">
      <VaInput v-model="Name" class="mb-4" :label="t('pages.preferences.name')" :placeholder="t('pages.preferences.name')" />
      <div class="flex flex-col-reverse md:flex-row md:items-center md:justify-end md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" color="secondary" @click="emits('cancel')">{{ t('common.cancel') }}</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="submit" @click="submit">{{ t('common.save') }}</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../../stores/user-store'

import { buttonStyles } from '../styles'
import { useToast } from 'vuestic-ui'

const { t } = useI18n()
const store = useUserStore()

const { init } = useToast()

const emits = defineEmits(['cancel'])

const Name = ref<string>(store.userName)

const submit = () => {
  if (!Name.value || Name.value === store.userName) {
    return emits('cancel')
  }

  store.changeUserName(Name.value)
  init({ message: t('pages.preferences.modals.editName.success'), color: 'success' })
  emits('cancel')
}
</script>

<style lang="scss">
// TODO temporary before https://github.com/epicmaxco/vuestic-ui/issues/4020 fix
.va-modal__inner {
  min-width: 326px;
}
</style>
