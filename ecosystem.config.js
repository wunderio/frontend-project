module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */

  // pm2 start ecosystem.config.js --env test
  apps: [
    {
      name: 'Server',
      script: './index.js',
      env: {
        PORT: 3000,
      },
      env_stage: {
        NODE_ENV: 'production',
      },
      env_dev: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'production',
      },
      env_local: {
        NODE_ENV: 'develop',
      },
    },
  ],
}
