<template>
  <div class="flex flex-col p-4 bg-backgroundSecondary rounded-lg">
    <h3 class="h3 mb-6">{{ t('pages.settings.notificationsYouReceive') }}</h3>
    <div v-for="notification in notifications" :key="notification.name" class="group">
      <div class="flex items-center justify-between overflow-x-hidden">
        <p class="text-regularLarge">
          {{ notification.name }}
        </p>
        <VaSwitch v-model="notification.isEnabled" size="small" />
      </div>
      <VaDivider class="py-4 group-last:hidden" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useNotificationsStore } from '../../../stores/notifications'

const { t } = useI18n()
const { notifications } = useNotificationsStore()
</script>
