const fs = require("fs");
const os = require("os");
const path = require("path");

const folder = process.argv[2];
const dirPath = path.join(os.homedir(), "Pictures", folder);

if (!folder || !fs.existsSync(dirPath)) {
  console.log("Pictures 폴더 내의 폴더명을 입력해주세요.");
  return;
}
