const { composePlugins, withNx } = require('@nx/webpack');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = composePlugins(withNx(), (config) => {
  // Merge the existing configuration with the Nx-generated config
  config.output = {
    ...config.output,
    path: join(__dirname, '../dist/apps/backend'),
  };

  // Add the NxAppWebpackPlugin with your specific configuration
  config.plugins.push(
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
    })
  );

  // Ensure the config is set for Node.js
  config.target = 'node';

  return config;
});