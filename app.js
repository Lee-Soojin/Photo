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

fs.promises
  .readdir(dirPath)
  .then((files) => {
    categorizeFile(files);
  })
  .catch(console.error);

/** 파일 타입별로 분류 */
function categorizeFile(files) {
  files.forEach((file) => {
    if (isVideo(file)) {
      moveFileToFolder(file, videoDir);
    } else if (isScreenshot(file)) {
      moveFileToFolder(file, screenshotDir);
    } else if (isOriginal(files, file)) {
      moveFileToFolder(file, duplicatedDir);
    }
  });
}

/** 비디오 파일인지 확인 */
function isVideo(file) {
  const regex = /(mp4|mov)$/gm;
  return !!file.match(regex);
}

/** 스크린샷 파일인지 확인 */
function isScreenshot(file) {
  const regex = /(png|aae)$/gm;
  return !!file.match(regex);
}

/** 원본 파일인지 확인 */
function isOriginal(files, file) {
  if (file.startsWith("IMG_") && !file.startsWith("IMG_E")) {
    const editedFile = `IMG_E${file.substring(file.indexOf("_") + 1)}`;
    const found = files.find((file) => file.includes(editedFile));
    return !!found;
  }
}

/** 타입별 폴더로 파일 이동 */
function moveFileToFolder(file, dir) {
  const oldPath = path.join(dirPath, file);
  const newPath = path.join(dir, file);
  fs.promises.rename(oldPath, newPath).catch(console.error);
}
