const postcss = require('rollup-plugin-postcss');
module.exports = {
  rollup(config, options) {
    options.env = 'production';
    options.target = 'browser';
    config.plugins.push(
      postcss({
        modules: true,
      })
    );
    return config;
  },
};
