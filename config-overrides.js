const path = require('path');

module.exports = function override(config, env) {
  // Add .ts and .tsx as resolvable extensions
  config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

  // Update the entry point
  config.entry = path.resolve(__dirname, 'src/index.tsx');

  return config;
};