const fs = require("fs");
const os = require("os");
const path = require("path");

const folder = process.argv[2];
const dirPath = path.join(os.homedir(), "Pictures", folder);

if (!folder || !fs.existsSync(dirPath)) {
  console.log("Pictures 폴더 내의 폴더명을 입력해주세요.");
  return;
}

const videoDir = path.join(dirPath, "video");
const screenshotDir = path.join(dirPath, "screenshot");
const duplicatedDir = path.join(dirPath, "duplicated");

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(screenshotDir) && fs.mkdirSync(screenshotDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);
