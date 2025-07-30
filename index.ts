// Import Sentry first
import './sentry'

// Then import OpenAI
import OpenAI from 'openai'

// This will fail with: TypeError: import_openai.default is not a constructor
const client = new OpenAI({ apiKey: 'dummy-key' })
console.log('✓ OpenAI client created successfully!')