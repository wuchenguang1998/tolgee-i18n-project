import { loadEnv } from "vite";
import { execSync } from "child_process";

export function htmlGetLocales(mode: string) {
  const env = loadEnv(mode, __dirname);
  return {
    name: "load-locales-files",
    transformIndexHtml() {
      const prodText = `
      const tempPromise = () => {
        return Promise.resolve();
      };
      window.localesPromise = tempPromise;
      `;
      const devText = `
        // 加载语言包并保存在localStorage
        const loadLocales = () => {
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: {
              Accept: 'application/json',
              'X-API-Key': '${env.VITE_TOLGEE_KEY}',
            },
          };
          return fetch('${env.VITE_TOLGEE_URL}/v2/projects/${env.VITE_TOLGEE_PROJECT_ID}/translations/zh,en', config)
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem('locales', JSON.stringify(data));
            })
            .catch((res) => {console.error('语言包加载失败', res)});
        };
        // 加载语言包
        const getLocales = () => {
          return Promise.allSettled([loadLocales()]);
        };
        window.localesPromise = getLocales;
      `;
      // 是否build正式包
      const isProd = process.env.NODE_ENV === "production";
      return [
        {
          tag: "script",
          attrs: { type: "text/javascript" },
          children: isProd ? prodText : devText,
        },
      ];
    },
  };
}

export function downloadLocales() {
  return {
    name: "download-locales-files",
    configResolved(config: any) {
      if (config.command === "build") {
        try {
          const res = execSync(`node getDataExport.mjs`);
          console.log(res.toString());
        } catch (error) {
          console.error(error);
        }
      }
    },
  };
}
