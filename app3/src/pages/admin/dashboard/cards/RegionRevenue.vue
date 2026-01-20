<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">{{ t('pages.dashboard.revenueByTopRegions') }}</h1>
    </VaCardTitle>
    <VaCardContent class="flex flex-col gap-1">
      <div class="flex justify-between">
        <VaButtonToggle v-model="selectedPeriod" :options="periods" color="background-element" size="small" />

        <VaButton preset="primary" size="small" @click="exportAsCSV">{{ t('common.export') }}</VaButton>
      </div>

      <VaDataTable
        class="region-revenue-table"
        :columns="[
          { key: 'name', label: t('pages.dashboard.topRegion') },
          { key: 'revenue', label: t('pages.dashboard.revenue'), align: 'right' },
        ]"
        :items="data"
      >
        <template #cell(revenue)="{ rowData }"> ${{ rowData[`revenue${selectedPeriod}`] }} </template>
      </VaDataTable>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { downloadAsCSV } from '../../../../services/toCSV'

const { t } = useI18n()

const selectedPeriod = ref('Today') as Ref<'Today' | 'Week' | 'Month'>
const periods = [
  { label: t('pages.dashboard.periods.today'), value: 'Today' },
  { label: t('pages.dashboard.periods.week'), value: 'Week' },
  { label: t('pages.dashboard.periods.month'), value: 'Month' },
]

const data = [
  {
    name: 'Japan',
    revenueToday: '4,748,454',
    revenueWeek: '30,000,000',
    revenueMonth: '120,000,000',
  },
  {
    name: 'United Kingdom',
    revenueToday: '405,748',
    revenueWeek: '2,500,000',
    revenueMonth: '10,000,000',
  },
  {
    name: 'United States',
    revenueToday: '308,536',
    revenueWeek: '1,800,000',
    revenueMonth: '8,000,000',
  },
  {
    name: 'China',
    revenueToday: '250,963',
    revenueWeek: '1,600,000',
    revenueMonth: '7,000,000',
  },
  {
    name: 'Canada',
    revenueToday: '29,415',
    revenueWeek: '180,000',
    revenueMonth: '800,000',
  },
  {
    name: 'Australia',
    revenueToday: '15,000',
    revenueWeek: '100,000',
    revenueMonth: '500,000',
  },
  {
    name: 'India',
    revenueToday: '10,000',
    revenueWeek: '50,000',
    revenueMonth: '200,000',
  },
]

const exportAsCSV = () => {
  downloadAsCSV(data, 'region-revenue')
}
</script>

<style lang="scss" scoped>
.region-revenue-table {
  ::v-deep(tbody) {
    tr {
      border-top: 1px solid var(--va-background-border);
    }
  }
}
</style>
