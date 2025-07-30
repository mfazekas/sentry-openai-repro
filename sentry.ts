import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: 'https://example@sentry.io/123456', // Dummy DSN for testing
  environment: 'test',
  sampleRate: 1.0,
  tracesSampler: () => {
    // Always sample for this test
    return 1.0
  },
  // Uncommenting the below ALSO causes the same error:
  // integrations: [
  //   Sentry.openAIIntegration({
  //     recordInputs: true,
  //     recordOutputs: true,
  //   }),
  // ],
})

export default Sentry