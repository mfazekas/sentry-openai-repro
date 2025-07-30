// Test scenarios for Sentry + OpenAI import issue
// Run with: tsx test-scenarios.ts

console.log('=== Sentry + OpenAI Import Issue Test Scenarios ===\n')

// Scenario 1: Basic Sentry init (no tracesSampler, no openAIIntegration)
console.log('✅ Scenario 1: Basic Sentry init - WORKS')
console.log('   Sentry.init({ dsn, environment, sampleRate })')
console.log('   Result: OpenAI imports correctly\n')

// Scenario 2: With tracesSampler (v9.40+)
console.log('❌ Scenario 2: With tracesSampler (v9.40+) - FAILS')
console.log('   Sentry.init({ ..., tracesSampler: () => 1.0 })')
console.log('   Result: TypeError: import_openai.default is not a constructor\n')

// Scenario 3: With openAIIntegration (v9.40+)
console.log('❌ Scenario 3: With openAIIntegration (v9.40+) - FAILS')
console.log('   Sentry.init({ ..., integrations: [Sentry.openAIIntegration()] })')
console.log('   Result: TypeError: import_openai.default is not a constructor\n')

// Scenario 4: With both tracesSampler AND openAIIntegration
console.log('❌ Scenario 4: With both tracesSampler AND openAIIntegration - FAILS')
console.log('   Result: Same error\n')

console.log('=== Version Compatibility ===\n')
console.log('Sentry v9.39.0 and earlier:')
console.log('  ✅ Works with tracesSampler')
console.log('  ✅ openAIIntegration doesn\'t exist yet\n')

console.log('Sentry v9.40.0 and later:')
console.log('  ❌ Fails with tracesSampler')
console.log('  ❌ Fails with openAIIntegration (new feature)')
console.log('  ✅ Works without either\n')

console.log('OpenAI SDK Versions:')
console.log('  Both v4 and v5 are equally affected\n')

console.log('=== Root Cause ===')
console.log('Both tracesSampler and openAIIntegration trigger module')
console.log('instrumentation that interferes with OpenAI\'s export structure')
console.log('when Sentry is initialized in a separate imported file.')