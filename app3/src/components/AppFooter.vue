<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3 class="footer-logo">{{ t('header.logo') }}</h3>
          <p class="footer-description">{{ t('footer.description') }}</p>
        </div>
        <div class="footer-links">
          <h4>{{ t('footer.product.title') }}</h4>
          <ul>
            <li><router-link to="/features">{{ t('footer.product.features') }}</router-link></li>
            <li><router-link to="/pricing">{{ t('footer.product.pricing') }}</router-link></li>
            <li><a href="#">{{ t('footer.product.integrations') }}</a></li>
            <li><a href="#">{{ t('footer.product.changelog') }}</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>{{ t('footer.company.title') }}</h4>
          <ul>
            <li><a href="#">{{ t('footer.company.about') }}</a></li>
            <li><a href="#">{{ t('footer.company.blog') }}</a></li>
            <li><a href="#">{{ t('footer.company.careers') }}</a></li>
            <li><a href="#">{{ t('footer.company.contact') }}</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>{{ t('footer.legal.title') }}</h4>
          <ul>
            <li><a href="#">{{ t('footer.legal.privacy') }}</a></li>
            <li><a href="#">{{ t('footer.legal.terms') }}</a></li>
            <li><a href="#">{{ t('footer.legal.security') }}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>
