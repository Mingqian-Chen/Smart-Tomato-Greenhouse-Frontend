import Api from './api'

class DataService {

  async getCurrentSensorData(): Promise<{ error?: string }> {
    try {
      const response = await Api.request('/current_data', {
        method: 'GET',
      });
      return response;
    } catch (error) {
      throw error
    }
  }

  async getHistoryData(): Promise<{ error?: string }> {
    try {
      const response = await Api.request('/history_data', {
        method: 'GET',
      });
      return response;
    } catch (error) {
      throw error
    }
  }

  async getPredictData(): Promise<{ error?: string }> {
    try {
      const response = await Api.request('/weather', {
        method: 'GET',
      });
      return response;
    } catch (error) {
      throw error
    }
  }

  // async getVideo(): Promise<{ error?: string }> {
  //   try {
  //     const response = await Api.request('/video_feed', {
  //       method: 'GET',
  //     });
  //     return response;
  //   } catch (error) {
  //     throw error
  //   }
  // }
}

export const dataService = new DataService();