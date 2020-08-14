const fs = require("fs");

const package = require("./package.json");

package.name = "@zibanpirate/" + package.name;

fs.writeFileSync("./package.json", JSON.stringify(package, null, 2));
