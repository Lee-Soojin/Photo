// .mov -> videos
// .aae, screenshot.png, captured.png -> captured
// IMG_0710 -> IMG_E0710 파일 편집 시 E 글자가 파일명에 추가됨
// 편집 원본 사진은 duplicated 폴더에 저장

const fs = require("fs");
const path = require("path");

const dirPath = path.join("../../../Pictures", process.argv[2]);

if (!fs.existsSync(dirPath + "/videos"))
  fs.mkdirSync(`${dirPath}/videos`, { recursive: false }, (err) => {
    console.error(err);
  });
if (!fs.existsSync(dirPath + "/captured"))
  fs.mkdirSync(`${dirPath}/captured`, { recursive: false }, (err) => {
    console.error(err);
  });
if (!fs.existsSync(dirPath + "/duplicated"))
  fs.mkdirSync(`${dirPath}/duplicated`, { recursive: false }, (err) => {
    console.error(err);
  });

fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((x) => {
    if (path.extname(x) === ".mov" || path.extname(x) === ".mp4") {
      fs.rename(`${dirPath}/${x}`, `${dirPath}/videos/${x}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else if (path.basename(x).includes("E")) {
      let originalPath = x.replace("E", "");
      fs.rename(
        `${dirPath}/${originalPath}`,
        `${dirPath}/duplicated/${originalPath}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    } else if (
      path.basename(x).includes("captured") ||
      path.extname(x) === ".aae"
    ) {
      fs.rename(`${dirPath}/${x}`, `${dirPath}/captured/${x}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
});
