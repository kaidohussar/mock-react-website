<script setup lang="ts">
import { PropType, computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { Project } from '../types'
import UserAvatar from '../../users/widgets/UserAvatar.vue'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
import { Pagination, Sorting } from '../../../data/pages/projects'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

const columns = defineVaDataTableColumns([
  { label: t('pages.projects.table.projectName'), key: 'project_name', sortable: true },
  { label: t('pages.projects.table.projectOwner'), key: 'project_owner', sortable: true },
  { label: t('pages.projects.table.team'), key: 'team', sortable: true },
  { label: t('pages.projects.table.status'), key: 'status', sortable: true },
  { label: t('pages.projects.table.creationDate'), key: 'created_at', sortable: true },
  { label: ' ', key: 'actions' },
])

const props = defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  sortBy: {
    type: String as PropType<Sorting['sortBy']>,
    default: undefined,
  },
  sortingOrder: {
    type: String as PropType<Sorting['sortingOrder']>,
    default: undefined,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'edit', project: Project): void
  (event: 'delete', project: Project): void
}>()

const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))
const { getUserById, getTeamOptions } = inject<any>('ProjectsPage')
</script>

<template>
  <div>
    <VaDataTable
      v-model:sort-by="sortByVModel"
      v-model:sorting-order="sortingOrderVModel"
      :items="projects"
      :columns="columns"
      :loading="loading"
    >
      <template #cell(project_name)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.project_name }}
        </div>
      </template>
      <template #cell(project_owner)="{ rowData }">
        <div v-if="getUserById(rowData.project_owner)" class="flex items-center gap-2 ellipsis max-w-[230px]">
          <UserAvatar :user="getUserById(rowData.project_owner)" size="small" />
          {{ getUserById(rowData.project_owner).fullname }}
        </div>
      </template>
      <template #cell(team)="{ rowData: project }">
        <VaAvatarGroup size="small" :options="getTeamOptions(project.team)" :max="5" />
      </template>
      <template #cell(status)="{ rowData: project }">
        <ProjectStatusBadge :status="project.status" />
      </template>

      <template #cell(created_at)="{ rowData: project }">
        {{ new Date(project.created_at).toLocaleDateString() }}
      </template>

      <template #cell(actions)="{ rowData: project }">
        <div class="flex gap-2 justify-end">
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-edit"
            aria-label="Edit project"
            @click="$emit('edit', project as Project)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete project"
            @click="$emit('delete', project as Project)"
          />
        </div>
      </template>
    </VaDataTable>
    <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
      <div>
        <b>{{ $props.pagination.total }} {{ t('common.results') }}.</b>
        {{ t('common.resultsPerPage') }}
        <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
      </div>

      <div v-if="totalPages > 1" class="flex">
        <VaButton
          preset="secondary"
          icon="va-arrow-left"
          aria-label="Previous page"
          :disabled="$props.pagination.page === 1"
          @click="$props.pagination.page--"
        />
        <VaButton
          class="mr-2"
          preset="secondary"
          icon="va-arrow-right"
          aria-label="Next page"
          :disabled="$props.pagination.page === totalPages"
          @click="$props.pagination.page++"
        />
        <VaPagination
          v-model="$props.pagination.page"
          buttons-preset="secondary"
          :pages="totalPages"
          :visible-pages="5"
          :boundary-links="false"
          :direction-links="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
