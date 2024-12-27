import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '4hza4s',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      require('./cypress/plugins/index.ts').default(on, config)
      return config

    },
    baseUrl: 'http://localhost:4200',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
})
