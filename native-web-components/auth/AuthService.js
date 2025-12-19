class AuthService {
    constructor() {
        this.storagePrefix = 'mpp-widgets_';
        this.tokenKey = 'accessToken';
        this.refreshTokenKey = 'refreshToken';
    }

    get token() {
        return localStorage.getItem(this._getKey(this.tokenKey));
    }

    set token(value) {
        if (value) {
            localStorage.setItem(this._getKey(this.tokenKey), value);
        } else {
            localStorage.removeItem(this._getKey(this.tokenKey));
        }
    }

    get refreshToken() {
        return localStorage.getItem(this._getKey(this.refreshTokenKey));
    }

    set refreshToken(value) {
        if (value) {
            localStorage.setItem(this._getKey(this.refreshTokenKey), value);
        } else {
            localStorage.removeItem(this._getKey(this.refreshTokenKey));
        }
    }

    _getKey(key) {
        return `${this.storagePrefix}${key}`;
    }

    isLoggedIn() {
        return !!this.token;
    }

    async login(username, password) {
        try {
            // Placeholder endpoint
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            this.token = data.access_token;
            this.refreshToken = data.refresh_token;
            return true;
        } catch (error) {
            console.error('AuthService: Login failed', error);
            return false;
        }
    }

    logout() {
        this.token = null;
        this.refreshToken = null;
        window.dispatchEvent(new CustomEvent('mpp-widgets-logout'));
    }

    async refreshAccessToken() {
        if (!this.refreshToken) return false;
        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: this.refreshToken })
            });
            if (!response.ok) throw new Error('Refresh failed');
            const data = await response.json();
            this.token = data.access_token;
            if (data.refresh_token) this.refreshToken = data.refresh_token;
            return true;
        } catch (error) {
            this.logout();
            return false;
        }
    }

    getAuthHeader() {
        return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
    }
}

export const authService = new AuthService();
