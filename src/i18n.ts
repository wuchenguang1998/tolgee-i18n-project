import { createI18n } from "vue-i18n";

const en = import.meta.glob("./locales/en.json", {
  eager: true,
  import: "default",
});
const zh = import.meta.glob("./locales/zh.json", {
  eager: true,
  import: "default",
});
type MessageSchema = typeof en;

// 获取本地存储语言包
const getStorageLocles = () => {
  const locales = JSON.parse(localStorage.getItem("locales") || "{}");
  return {
    en: locales.en,
    zh: locales.zh,
  };
};

const messages =
  import.meta.env.MODE === "production"
    ? { en: Object.values(en)[0] as any, zh: Object.values(zh)[0] as any }
    : getStorageLocles();

const i18n = createI18n<MessageSchema, "en" | "zh">({
  legacy: false,
  messages: messages,
  locale: "zh",
});

export default i18n;
