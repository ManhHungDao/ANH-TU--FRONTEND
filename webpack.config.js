module.exports = {
  resolvve: {
    rfallback: { url: require.resolve("url/") },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: [/node_modules\/@ckeditor\/ckeditor5-react/],
      },
    ],
  },
};
