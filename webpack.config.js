const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');
const argvs = require('yargs').argv;
const devMode = process.env.WEBPACK_SERVE || argvs.mode === 'development';

const DEFAULT_PORT = 3600;
const host = argvs.host || '127.0.0.1';
const port = argvs.port || DEFAULT_PORT;
const socketProtocol = 'ws';

let webpackConfig = {
  mode: 'development',
  entry: {
    app: ['./src/main.tsx'],
  },

  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },

  resolve: {
    alias: {
      scss: path.resolve(__dirname, 'src/scss/'),
    },
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.css',
      '.scss',
      '.html',
      '.ts',
      '.tsx',
    ],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-flow',
                '@babel/preset-typescript',
              ],
              plugins: devMode ? ['react-hot-loader/babel'] : [],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?\S*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new ProgressBarPlugin(),
    new Dotenv(),
  ],

  resolveLoader: {
    modules: ['node_modules'],
  },

  performance: {
    hints: false,
  },

  devServer: {
    port: port,
    host: host,
    allowedHosts: 'all',
    client: {
      webSocketURL: `${socketProtocol}://${host}:${port}/ws`,
    },
    devMiddleware: {
      publicPath: '/',
      stats: {
        colors: true,
        errorDetails: true,
        performance: true,
        source: true,
        warnings: true,
        builtAt: true,
      },
    },
  },
};

let devPlugins = [
  new HtmlWebPackPlugin({
    template: 'src/public/index.html',
    chunksSortMode: 'auto',
  }),
];
webpackConfig.plugins = webpackConfig.plugins.concat(devPlugins);

module.exports = webpackConfig;
