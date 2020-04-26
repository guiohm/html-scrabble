#!/usr/bin/env node
var reporter = require('nodeunit').reporters.default;
reporter.run(['dictionary-service-test.js']);
reporter.run(['icebox-test.js']);
