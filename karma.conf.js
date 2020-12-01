/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable global-require */
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      // eslint-disable-next-line global-require
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false,
    },

    browsers: ['Chrome'],
    customLaunchers: {
      // eslint-disable-next-line no-tabs
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: false,
  });
};
