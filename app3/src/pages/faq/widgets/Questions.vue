<template>
  <VaCard class="mb-4">
    <VaCardContent>
      <h2 class="va-h5">{{ t('pages.faq.popularQuestions') }}</h2>
      <VaAccordion v-model="accordionState" :style="{ '--va-collapse-padding': '1rem 0' }" class="mb-1">
        <VaCollapse :header="t('pages.faq.questions.reloadPage.title')">
          <article class="max-w-3xl leading-5">
            <p class="mb-2">
              {{ t('pages.faq.questions.reloadPage.intro') }}
            </p>
            <ul class="list-disc list-inside leading-5 ml-4">
              <li>{{ t('pages.faq.questions.reloadPage.tip1') }}</li>
              <li>{{ t('pages.faq.questions.reloadPage.tip2') }}</li>
              <li>{{ t('pages.faq.questions.reloadPage.tip3') }}</li>
            </ul>
          </article>
        </VaCollapse>

        <VaCollapse :header="t('pages.faq.questions.secureKey.title')">
          <article class="max-w-3xl text-sm">
            <p class="mb-4">
              {{ t('pages.faq.questions.secureKey.paragraph1') }}
            </p>
            <p class="mb-4">
              {{ t('pages.faq.questions.secureKey.paragraph2') }}
            </p>
            <a class="va-link font-semibold" href="#"
              >{{ t('pages.faq.questions.secureKey.learnMore') }}
              <VaIcon :size="18" name="chevron_right" />
            </a>
          </article>
        </VaCollapse>

        <VaCollapse :header="t('pages.faq.questions.reportFraud.title')">
          <article class="max-w-3xl text-sm">
            <p class="mb-3">
              {{ t('pages.faq.questions.reportFraud.intro') }}
            </p>
            <ul class="list-disc list-inside leading-6 ml-4 mb-4">
              <li>
                <span class="font-semibold">{{ t('pages.faq.questions.reportFraud.tip1Title') }}</span> {{ t('pages.faq.questions.reportFraud.tip1Text') }}
              </li>
              <li>
                <span class="font-semibold">{{ t('pages.faq.questions.reportFraud.tip2Title') }}</span> {{ t('pages.faq.questions.reportFraud.tip2Text') }}
              </li>
              <li>
                <span class="font-semibold">{{ t('pages.faq.questions.reportFraud.tip3Title') }}</span> {{ t('pages.faq.questions.reportFraud.tip3Text') }}
              </li>
            </ul>
            <p>
              {{ t('pages.faq.questions.reportFraud.conclusion') }}
            </p>
          </article>
        </VaCollapse>

        <VaCollapse :style="{ '--va-background-border': 'transparent' }" :header="t('pages.faq.questions.downloadStatements.title')">
          <article class="max-w-3xl text-sm">
            <p class="mb-3">
              {{ t('pages.faq.questions.downloadStatements.intro') }}
            </p>
            <ul class="list-disc list-inside leading-6 ml-4 mb-4">
              <li>
                <span class="font-semibold">{{ t('pages.faq.questions.downloadStatements.tip1Title') }}</span> {{ t('pages.faq.questions.downloadStatements.tip1Text') }}
              </li>
              <li>
                <span class="font-semibold">{{ t('pages.faq.questions.downloadStatements.tip2Title') }}</span> {{ t('pages.faq.questions.downloadStatements.tip2Text') }}
              </li>
              <li>
                <span class="font-semibold">{{ t('pages.faq.questions.downloadStatements.tip3Title') }}</span> {{ t('pages.faq.questions.downloadStatements.tip3Text') }}
              </li>
              <li>
                <span class="font-semibold">{{ t('pages.faq.questions.downloadStatements.tip4Title') }}</span> {{ t('pages.faq.questions.downloadStatements.tip4Text') }}
              </li>
            </ul>
            <p>
              {{ t('pages.faq.questions.downloadStatements.conclusion') }}
            </p>
          </article>
        </VaCollapse>
      </VaAccordion>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const accordionState = reactive([false, true, false, false])
</script>
