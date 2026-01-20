<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { EmptyProject, Project } from '../types'
import { SelectOption, useBreakpoint } from 'vuestic-ui'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
import UserAvatar from '../../users/widgets/UserAvatar.vue'
import { useUsersStore } from '../../../stores/users'

const { t } = useI18n()

const props = defineProps<{
  project: Project | null
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', project: Project): void
  (event: 'close'): void
}>()

const bp = useBreakpoint()

const defaultNewProject: EmptyProject = {
  project_name: '',
  project_owner: undefined,
  team: [],
  status: undefined,
}

const newProject = ref({ ...defaultNewProject })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newProject.value).some((key) => {
    if (key === 'team') {
      return false
    }

    return (
      newProject.value[key as keyof EmptyProject] !== (props.project ?? defaultNewProject)?.[key as keyof EmptyProject]
    )
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

const usersStore = useUsersStore()

watch(
  () => props.project,
  () => {
    if (!props.project) {
      return
    }

    newProject.value = {
      ...props.project,
      project_owner: props.project.project_owner,
    }
  },
  { immediate: true },
)

const required = (v: string | SelectOption) => !!v || t('validation.fieldRequired')

const ownerFiltersSearch = ref('')
const teamFiltersSearch = ref('')
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput v-model="newProject.project_name" :label="t('pages.projects.form.projectName')" :rules="[required]" />
    <VaSelect
      v-model="newProject.project_owner"
      v-model:search="ownerFiltersSearch"
      searchable
      :label="t('pages.projects.form.owner')"
      text-by="fullname"
      track-by="id"
      value-by="id"
      :rules="[required]"
      :options="usersStore.items"
    >
      <template #content="{ value: user }">
        <div v-if="user" :key="user.id" class="flex items-center gap-1 mr-4">
          <UserAvatar v-if="false" :user="user" size="18px" />
          {{ user.fullname }}
        </div>
      </template>
    </VaSelect>
    <VaSelect
      v-model="newProject.team"
      v-model:search="teamFiltersSearch"
      :label="t('pages.projects.form.team')"
      text-by="fullname"
      track-by="id"
      value-by="id"
      multiple
      :rules="[(v: any) => ('length' in v && v.length > 0) || t('validation.fieldRequired')]"
      :options="usersStore.items"
      :max-visible-options="bp.mdUp ? 3 : 1"
    >
      <template #content="{ valueArray }">
        <template v-if="valueArray?.length">
          <div v-for="(user, index) in valueArray" :key="user.id" class="flex items-center gap-1 mr-2">
            <UserAvatar v-if="user" :user="user" size="18px" />
            {{ user.fullname }}{{ index < valueArray.length - 1 ? ',' : '' }}
          </div>
        </template>
      </template>
    </VaSelect>
    <VaSelect
      v-model="newProject.status"
      :label="t('pages.projects.form.status')"
      :rules="[required]"
      track-by="value"
      value-by="value"
      :options="[
        { text: t('pages.projects.statuses.inProgress'), value: 'in progress' },
        { text: t('pages.projects.statuses.archived'), value: 'archived' },
        { text: t('pages.projects.statuses.completed'), value: 'completed' },
        { text: t('pages.projects.statuses.important'), value: 'important' },
      ]"
    >
      <template #content="{ value }">
        <ProjectStatusBadge v-if="value" :status="value.value" />
      </template>
    </VaSelect>
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">{{ t('common.cancel') }}</VaButton>
      <VaButton @click="validate() && $emit('save', newProject as Project)">{{ saveButtonLabel }}</VaButton>
    </div>
  </VaForm>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>
