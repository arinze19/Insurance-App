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
  filesPattern: ['../routes/**/*.ts'],
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'local development environment',
    },
  ],
};

export default {
  swagger: {
    options: swaggerOptions,
  },
  logging: {
    dir: './src/logs',
  },
  cron: {
    interval: '0 1 * * *',
  },
  transport: {
    sheets: {
      url: process.env.GOOGLE_SHEETS_URL,
      credentialsPath: JSON.parse(
        fs.readFileSync('./secrets.json', {
          encoding: 'utf-8',
        })
      ),
    },
  },
};
