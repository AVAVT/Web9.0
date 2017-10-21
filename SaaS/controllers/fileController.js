const fs = require('fs');

const readDataFromFile = (filename) => {
  let data = fs.readFileSync(filename, "utf-8");
  return JSON.parse(data);
}

const writeDataToFile = (filename, data) => {
  let dataString = JSON.stringify(data);
  fs.writeFileSync(filename, dataString, "utf-8");
}

const writeDataToFileSync = (filename) => {
  try {
    fs.writeFileSync(filename);
    return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }
}

module.exports = {
  readDataFromFile,
  writeDataToFile
}
