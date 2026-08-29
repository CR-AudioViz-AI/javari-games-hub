// [JAVARI-FIX] .github/workflows/e2e-tests.yml
name: Henderson Standards E2E Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  e2e-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Save test results
        if: failure()
        run: |
          echo "E2E tests failed. Check logs."
          exit 1

      - name: Archive test results
        if: always()
        run: |
          mkdir -p results
          cp -r test-results/* results/ || echo "No test results to archive."