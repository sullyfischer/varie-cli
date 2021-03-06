const fs = require("fs-extra");
const toPascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeProvider(providerName, force) {
  let path = `${process.env.varie_path}/app/providers/${providerName}Provider.ts`;
  tellUserFileExists(path, "provider", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${process.env.varie_vendor_path}/stubs/provider.ts`, path);
        replaceTextInFile(path, "temp", toPascalCase(providerName));
        console.info(`Provider created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
