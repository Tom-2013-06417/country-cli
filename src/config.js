'use strict';

const path = require('path');

function getConfig() {
  return {
    outputDir: path.resolve(
      process.cwd(),
      process.env.OUTPUT_DIR || './output',
    ),
  };
}

module.exports = { getConfig };
