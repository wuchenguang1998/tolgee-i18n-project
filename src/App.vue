<template>
  <div class="btn-group">
    <button @click="changeLocale('zh')">中文</button>
    <button @click="changeLocale('en')">English</button>
  </div>
  <div>{{ $t("frontend") }}</div>
  <div>{{ $t("project") }}</div>
  <div>{{ $t("website") }}</div>
  <div>{{ $t("i18n") }}</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// 切换语言
const changeLocale = (lang: string) => {
  locale.value = lang;
};
</script>

<style scoped>
.btn-group {
  button {
    width: 100px;
    background-color: #00aaff;
  }
  button + button {
    margin-left: 10px;
  }
}
</style>
