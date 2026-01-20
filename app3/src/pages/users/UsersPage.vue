<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import UsersTable from './widgets/UsersTable.vue'
import EditUserForm from './widgets/EditUserForm.vue'
import { User } from './types'
import { useUsers } from './composables/useUsers'
import { useModal, useToast } from 'vuestic-ui'
import { useProjects } from '../projects/composables/useProjects'

const { t } = useI18n()
const doShowEditUserModal = ref(false)

const { users, isLoading, filters, sorting, pagination, error, ...usersApi } = useUsers()
const { projects } = useProjects()

const userToEdit = ref<User | null>(null)

const showEditUserModal = (user: User) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  userToEdit.value = null
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

watchEffect(() => {
  if (error.value) {
    notify({
      message: error.value.message,
      color: 'danger',
    })
  }
})

const onUserSaved = async (user: User) => {
  if (user.avatar.startsWith('blob:')) {
    const blob = await fetch(user.avatar).then((r) => r.blob())
    const { publicUrl } = await usersApi.uploadAvatar(blob)
    user.avatar = publicUrl
  }

  if (userToEdit.value) {
    await usersApi.update(user)
    if (!error.value) {
      notify({
        message: t('pages.users.toasts.updated', { name: user.fullname }),
        color: 'success',
      })
    }
  } else {
    await usersApi.add(user)

    if (!error.value) {
      notify({
        message: t('pages.users.toasts.created', { name: user.fullname }),
        color: 'success',
      })
    }
  }
}

const onUserDelete = async (user: User) => {
  await usersApi.remove(user)
  notify({
    message: t('pages.users.toasts.deleted', { name: user.fullname }),
    color: 'success',
  })
}

const editFormRef = ref()

const { confirm } = useModal()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: t('common.unsavedChanges'),
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <h1 class="page-title">{{ t('pages.users.title') }}</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="filters.isActive"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: t('common.active'), value: true },
              { label: t('common.inactive'), value: false },
            ]"
          />
          <VaInput v-model="filters.search" :placeholder="t('common.search')">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="small" />
            </template>
          </VaInput>
        </div>
        <VaButton @click="showAddUserModal">{{ t('pages.users.addUser') }}</VaButton>
      </div>

      <UsersTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :users="users"
        :projects="projects"
        :loading="isLoading"
        :pagination="pagination"
        @editUser="showEditUserModal"
        @deleteUser="onUserDelete"
      />
    </VaCardContent>
  </VaCard>

  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ userToEdit ? t('pages.users.editUser') : t('pages.users.addUser') }}</h1>
    <EditUserForm
      ref="editFormRef"
      :user="userToEdit"
      :save-button-label="userToEdit ? t('common.save') : t('common.add')"
      @close="cancel"
      @save="
        (user) => {
          onUserSaved(user)
          ok()
        }
      "
    />
  </VaModal>
</template>
