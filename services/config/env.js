import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mockServerEnabled: process.env.MOCK_SERVER_ENABLED !== 'false',
  eventApiBaseUrl: 'http://event.com'
};
