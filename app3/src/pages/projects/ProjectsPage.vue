<script setup lang="ts">
import { ref, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import { useProjects } from './composables/useProjects'
import ProjectCards from './widgets/ProjectCards.vue'
import ProjectTable from './widgets/ProjectsTable.vue'
import EditProjectForm from './widgets/EditProjectForm.vue'
import { Project } from './types'
import { useModal, useToast } from 'vuestic-ui'
import { useProjectUsers } from './composables/useProjectUsers'

const { t } = useI18n()
const doShowAsCards = useLocalStorage('projects-view', true)

const { projects, update, add, isLoading, remove, pagination, sorting } = useProjects()

const { users, getTeamOptions, getUserById } = useProjectUsers()

provide('ProjectsPage', {
  users,
  getTeamOptions,
  getUserById,
})

const projectToEdit = ref<Project | null>(null)
const doShowProjectFormModal = ref(false)

const editProject = (project: Project) => {
  projectToEdit.value = project
  doShowProjectFormModal.value = true
}

const createNewProject = () => {
  projectToEdit.value = null
  doShowProjectFormModal.value = true
}

const { init: notify } = useToast()

const onProjectSaved = async (project: Project) => {
  doShowProjectFormModal.value = false
  if ('id' in project) {
    await update(project as Project)
    notify({
      message: t('pages.projects.toasts.updated'),
      color: 'success',
    })
  } else {
    await add(project as Project)
    notify({
      message: t('pages.projects.toasts.created'),
      color: 'success',
    })
  }
}

const { confirm } = useModal()

const onProjectDeleted = async (project: Project) => {
  const response = await confirm({
    title: t('pages.projects.deleteProject'),
    message: t('pages.projects.deleteProjectConfirm', { name: project.project_name }),
    okText: t('common.delete'),
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  await remove(project)
  notify({
    message: t('pages.projects.toasts.deleted'),
    color: 'success',
  })
}

const editFormRef = ref()

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
  <h1 class="page-title">{{ t('pages.projects.title') }}</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="doShowAsCards"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: t('pages.projects.cards'), value: true },
              { label: t('pages.projects.table'), value: false },
            ]"
          />
        </div>
        <VaButton icon="add" @click="createNewProject">{{ t('pages.projects.project') }}</VaButton>
      </div>

      <ProjectCards
        v-if="doShowAsCards"
        :projects="projects"
        :loading="isLoading"
        @edit="editProject"
        @delete="onProjectDeleted"
      />
      <ProjectTable
        v-else
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        v-model:pagination="pagination"
        :projects="projects"
        :loading="isLoading"
        @edit="editProject"
        @delete="onProjectDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowProjectFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="projectToEdit === null" class="va-h5 mb-4">{{ t('pages.projects.addProject') }}</h1>
      <h1 v-else class="va-h5 mb-4">{{ t('pages.projects.editProject') }}</h1>
      <EditProjectForm
        ref="editFormRef"
        :project="projectToEdit"
        :save-button-label="projectToEdit === null ? t('common.add') : t('common.save')"
        @close="cancel"
        @save="
          (project) => {
            onProjectSaved(project)
            ok()
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
