import fs from 'node:fs';
import dotenv from 'dotenv';
import type { Options } from 'express-jsdoc-swagger';

dotenv.config();

const swaggerOptions: Options = {
  info: {
    title: 'Feather Insurance API docs',
    version: '1.0.1',
    description:
      'API documentation for feather insurance engineering challenge',
  },
  baseDir: __dirname,
  filesPattern: ['../routes/**/*.ts', '../routes/**/*.js'],
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'local development environment',
    },
    {
      url: 'https://feather-insurance-assessment-production.up.railway.app/',
      description: 'production development environment',
    },
  ],
};

export default {
  port: process.env.PORT || 4000,
  swagger: {
    options: swaggerOptions,
  },
  logging: {
    dir: './src/logs',
  },
  cron: {
    interval: '0 1 * * 0/2', // every sunday two week interval at 1am - Algiers/Africa
  },
  transport: {
    sheets: {
      url: process.env.GOOGLE_SHEETS_URL,
      credentials: {
        type: process.env.TYPE || '',
        project_id: process.env.PROJECT_ID || '',
        private_key_id: process.env.PRIVATE_KEY_ID || '',
        private_key: process.env.PRIVATE_KEY || '',
        client_email: process.env.CLIENT_EMAIL || '',
        client_id: process.env.CLIENT_ID || '',
        auth_uri: process.env.AUTH_URI || '',
        token_uri: process.env.TOKEN_URI || '',
        auth_provider_x509_cert_url:
          process.env.AUTH_PROVIDER_X509_CERT_URL || '',
        client_x509_cert_url: process.env.CLIENT_PROVIDER_X509_CERT_URL || '',
      },
    },
  },
};
