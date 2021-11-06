const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = {
  webpack: (config, { dev, vendor }) => {
    const module = { ...config.module };
    const entry = {
      main: './src/js/index.tsx',
    };

    if (!Array.isArray(module.rules)) {
      module.rules = [];
    }

    config.plugins.push(
      new DefinePlugin({
        NODE_ENV: dev ? JSON.stringify('development') : JSON.stringify('production'),
        VENDOR: JSON.stringify(vendor),
      }),
    );

    module.rules.push({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.module\.css$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              mode: "local",
              exportLocalsConvention: 'dashes',
            },
          },
        },
      ]
    });
    module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
    });
    module.rules.push({
      test: /\.[tj]sx?$/,
      loader: 'eslint-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
    });

    config.resolve.alias = {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    };

    config.resolve.extensions.push('.ts');
    config.resolve.extensions.push('.tsx');

    return {
      ...config,
      entry,
      module,
    };
  },
};
