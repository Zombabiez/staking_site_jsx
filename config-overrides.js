const { ProvidePlugin } = require("webpack");

module.exports = function (config, env) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(m?js|ts)$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
      ],
    },
    plugins: [
      ...config.plugins,
      new ProvidePlugin({
        process: "process/browser",
      }),
    ],
    resolve: {
      ...config.resolve,
      fallback: {
        // assert: require.resolve("assert"),
        // http: require.resolve("stream-http"),
        // https: require.resolve("https-browserify"),
        // os: require.resolve("os"),
        // url: require.resolve("url"),
        // buffer: require.resolve("buffer"),
        // crypto: require.resolve("crypto-browserify"),
        // stream: require.resolve("stream-browserify"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
      },
    },
    ignoreWarnings: [/Failed to parse source map/],
  };
};
