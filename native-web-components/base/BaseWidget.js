import { authService } from '../auth/AuthService.js';

export class BaseWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async fetchWithAuth(url, options = {}) {
        let headers = {
            ...options.headers,
            ...authService.getAuthHeader()
        };

        let response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            console.warn('BaseWidget: Received 401, attempting token refresh...');
            const refreshed = await authService.refreshAccessToken();
            if (refreshed) {
                headers = {
                    ...options.headers,
                    ...authService.getAuthHeader()
                };
                response = await fetch(url, { ...options, headers });
            }
        }

        return response;
    }

    get auth() {
        return authService;
    }
}
