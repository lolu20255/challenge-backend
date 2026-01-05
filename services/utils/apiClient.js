import { config } from '../config/env.js';

export const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${config.eventApiBaseUrl}${endpoint}`);
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${config.eventApiBaseUrl}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
