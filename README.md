# Sentry + OpenAI Import Issue Reproduction

This repository demonstrates an issue where Sentry's `tracesSampler` configuration causes OpenAI imports to fail with the error:

```
TypeError: import_openai.default is not a constructor
```

## Issue Description

When Sentry is initialized with a `tracesSampler` function and then OpenAI is imported in a separate file, the OpenAI constructor fails.

## Setup

```bash
npm install
```

## Running the Reproduction

```bash
# Run the reproduction (shows the error)
npm test

# To test without the error, comment out tracesSampler in sentry.ts
```

## Key Findings

### 1. The Issue Occurs When:

- Sentry is initialized with `tracesSampler` configured
- Sentry initialization happens in a separate file that is imported
- OpenAI is imported after the Sentry import
- Using Sentry v9.40.0 or later (including v9.43.0)

### 2. The Issue Does NOT Occur When:

- `tracesSampler` is not configured (commented out)
- Both Sentry and OpenAI are imported in the same file
- Using Sentry v9.39.0 or earlier
- Using Sentry v8.x (tested with v8.38.0)

### 3. `registerEsmLoaderHooks: false` Does NOT Fix the Issue

- Setting `registerEsmLoaderHooks: false` in Sentry config does not resolve the problem

### 4. Version-Specific Findings

- ✅ Works: @sentry/node v8.38.0
- ✅ Works: @sentry/node v9.0.0
- ✅ Works: @sentry/node v9.20.0
- ✅ Works: @sentry/node v9.39.0
- ❌ Fails: @sentry/node v9.40.0
- ❌ Fails: @sentry/node v9.43.0

The issue was introduced in v9.40.0.

## Files

- `index.ts` - Main entry point that imports Sentry and then OpenAI
- `sentry.ts` - Sentry initialization with tracesSampler

## Workarounds

1. **Remove `tracesSampler`**: Comment out or remove the `tracesSampler` configuration
2. **Use `tracesSampleRate`**: Use a static sampling rate instead of a function
3. **Initialize Sentry after OpenAI import**: Import OpenAI before initializing Sentry
4. **Downgrade Sentry**: Use @sentry/node v9.39.0 or earlier
5. **Use same file**: Initialize Sentry and import OpenAI in the same file

## Environment

- Node.js: v22.16.0
- @sentry/node: 9.43.0 (issue present)
- openai: ^4.93.0
- typescript: ~5.8.3

### Similar GitHub Issues

- [#12414](https://github.com/getsentry/sentry-javascript/issues/12414) - SDK fails in ESM mode in combination with openai (v8.8.0) - shows similar "not a constructor" errors with OpenAI
- The issue manifests differently in v8 (API.Completions is not a constructor) vs v9.40+ (import_openai.default is not a constructor)