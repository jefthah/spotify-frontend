// services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  constructor() {
    if (!API_BASE_URL) {
      throw new Error('VITE_API_BASE_URL is not defined in environment variables');
    }
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  }

  // Songs API methods
  async getSongs() {
    return this.request('/song/list');
  }

  async getSongById(id) {
    return this.request(`/song/${id}`);
  }

  // Albums API methods
  async getAlbums() {
    return this.request('/album/list');
  }

  async getAlbumById(id) {
    return this.request(`/album/${id}`);
  }

  // Future methods for other endpoints
  async createSong(songData) {
    return this.request('/song/add', {
      method: 'POST',
      body: JSON.stringify(songData),
    });
  }

  async createAlbum(albumData) {
    return this.request('/album/add', {
      method: 'POST',
      body: JSON.stringify(albumData),
    });
  }

  async deleteSong(id) {
    return this.request('/song/remove', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  }

  async deleteAlbum(id) {
    return this.request('/album/remove', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  }
}

export default new ApiService();
