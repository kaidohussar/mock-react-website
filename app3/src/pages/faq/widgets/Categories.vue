<template>
  <VaInput v-model="searchValue" class="mb-4" :placeholder="t('common.search')">
    <template #appendInner>
      <VaIcon color="secondary" name="mso-search" />
    </template>
  </VaInput>
  <section v-if="filteredCategories.length" class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
    <template v-for="category in filteredCategories" :key="category.id">
      <VaCard class="col-span-3 md:col-span-1 min-h-[146px]" href="#">
        <VaCardContent class="leading-5 text-sm">
          <VaIcon :name="`mso-${category.icon}`" class="font-light mb-2" color="primary" size="2rem" />
          <h2 class="text-primary mb-2 text-primary text-lg leading-7 font-bold">{{ category.name }}</h2>
          <p>{{ category.intro }}</p>
        </VaCardContent>
      </VaCard>
    </template>
  </section>
  <VaAlert v-else class="mb-4 leading-5" color="info" outline>
    {{ t('pages.faq.noMatchesFound') }}
  </VaAlert>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import categories from '../data/popularCategories.json'
import { ref, computed } from 'vue'

const { t } = useI18n()
const searchValue = ref('')

const filteredCategories = computed(() => {
  const value = searchValue.value.trim().toLowerCase()
  if (value.length === 0) {
    return categories
  }
  return categories.filter((category) => {
    return category.intro.toLowerCase().includes(value) || category.name.toLowerCase().includes(value)
  })
})
</script>
