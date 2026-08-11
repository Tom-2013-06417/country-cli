import path from 'path';

export function getConfig() {
  return {
    outputDir: path.resolve(
      process.cwd(),
      process.env.OUTPUT_DIR || './output',
    ),
  };
}
