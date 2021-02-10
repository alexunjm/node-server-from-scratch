const fs = require("fs/promises");
const path = require("path");

const BASE_DATA_PATH =
  process.env.DATA_PATH || path.join(__dirname, "..", ".data");

const lib = {
  create: async (dir, file, data) => {
    const fileHandle = await fs.open(
      path.join(BASE_DATA_PATH, dir, `${file}.json`),
      "wx"
    );
    const stringData = JSON.stringify(data);
    await fs.writeFile(fileHandle, stringData);
    await fileHandle.close();
  },
  read: (dir, file) => {
    return fs.readFile(path.join(BASE_DATA_PATH, dir, `${file}.json`), "utf-8");
  },
  update: async (dir, file, data) => {
    const fileHandle = await fs.open(
      path.join(BASE_DATA_PATH, dir, `${file}.json`),
      "r+"
    );
    const stringData = JSON.stringify(data);
    // await fs.truncate(fileHandle);
    await fs.writeFile(fileHandle, stringData);
    await fileHandle.close();
  },
  delete: async (dir, file) => {
    await fs.unlink(path.join(BASE_DATA_PATH, dir, `${file}.json`));
  },
};

module.exports = lib;
