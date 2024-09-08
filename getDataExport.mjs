import axios from "axios";
import fs from "fs";
import path from "path";
import unzipper from "unzipper";
import dotenv from "dotenv";

// 加载根目录下.env文件
dotenv.config({ path: ".env" });

// locales文件目录
const localesDir = `src/locales`;

// 线上包只获取REVIEWED的翻译条目
const params =
  process.env.NODE_ENV === "production" ? "?filterState=REVIEWED" : "";

const config = {
  method: "get",
  maxBodyLength: Infinity,
  responseType: "stream",
  url: `${process.env.VITE_TOLGEE_URL}/v2/projects/${process.env.VITE_TOLGEE_PROJECT_ID}/export${params}`,
  headers: {
    Accept: "application/json",
    "X-API-Key": process.env.VITE_TOLGEE_KEY,
  },
};

// 清空文件夹
function emptyDirectorySync(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // 递归删除子文件夹
      emptyDirectorySync(filePath);
      fs.rmdirSync(filePath);
    } else {
      // 删除文件
      fs.unlinkSync(filePath);
    }
  });
}

// 解压文件,移动语言包到对应目录
const extractZip = async (fileData, outputDir) => {
  return new Promise((resolve, reject) => {
    fileData.data
      .pipe(unzipper.Extract({ path: outputDir }))
      .on("close", () => {
        resolve();
      })
      .on("error", (error) => {
        console.error("Error extracting ZIP file:", error);
        reject(error);
      });
  });
};

// 下载并解压语言包
const downloadAndExtractZip = async (outputDir) => {
  try {
    // 创建输出目录（如果不存在）
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    } else {
      emptyDirectorySync(outputDir);
    }
    // 下载语言包ZIP文件
    const response = await axios(config);
    // 解压到对应文件夹
    await extractZip(response, outputDir);
    console.log("Successfully loaded locales");
  } catch (error) {
    console.error("Error downloading or extracting ZIP file:", error);
  }
};

downloadAndExtractZip(localesDir);
