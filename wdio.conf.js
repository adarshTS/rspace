const buildTag = process.env.BUILD_TAG || `run-${new Date().toISOString().replace(/[-:T.Z]/g,'').slice(0,12)}`;

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hostname: 'hub.browserstack.com',
    services: [
        [
        'browserstack',
            { browserstackLocal: true, 
                opts: { forcelocal: false },
                testObservability: true,
                testObservabilityOptions: {
                        projectName: 'rspace-web-percy',
                        buildName: 'e2e-tests',
                        buildTag
                    },
                percy: true,
                percyCaptureMode: 'auto'
            },
        ],
    ],
    capabilities: [
        {
        browserName: 'Chrome',
        'bstack:options': {
            browserVersion: '120.0',
            os: 'Windows',
            osVersion: '10'
        }
        },
        {
        browserName: 'Safari',
        'bstack:options': {
            browserVersion: '15.6',
            os: 'OS X',
            osVersion: 'Monterey'
        }
        },
        {
        browserName: 'Chromium',
        'bstack:options': {
            deviceOrientation: 'portrait',
            deviceName: 'iPhone 13',
            osVersion: '15'
        }
        }
    ],
    commonCapabilities: {
        'bstack:options': {
        buildIdentifier: "${BUILD_NUMBER}",
        consoleLogs: 'info',
        networkLogs: 'true'
        }
     },
  maxInstances: 10,
//   runner: 'local',
  specs: ['./test/specs/**/*.js'],
  exclude: [],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};

exports.config.capabilities.forEach(function (caps) {
  for (const key in exports.config.commonCapabilities) {
    caps[key] = { ...caps[key], ...exports.config.commonCapabilities[key] };
  }
});
