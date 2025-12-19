import { BaseWidget } from '../base/BaseWidget.js';
import theme from '../styles/Theme.js';
import buttonStyles from '../styles/ButtonStyles.js';
import cardStyles from '../styles/CardStyles.js';
import formStyles from '../styles/FormStyles.js';
import alertStyles from '../styles/AlertStyles.js';
import spinnerStyles from '../styles/SpinnerStyles.js';

export class UserLogin extends BaseWidget {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets = [
            theme,
            buttonStyles,
            cardStyles,
            formStyles,
            alertStyles,
            spinnerStyles
        ];

        this.state = {
            loading: false,
            error: null,
            user: null
        };
    }

    async connectedCallback() {
        if (this.auth.isLoggedIn()) {
            await this.fetchUserInfo();
        }
        this.render();

        window.addEventListener('mpp-widgets-logout', () => {
            this.state.user = null;
            this.render();
        });
    }

    async fetchUserInfo() {
        this.state.loading = true;
        this.render();
        try {
            const res = await this.fetchWithAuth('/api/user/me');
            if (res.ok) {
                this.state.user = await res.json();
            }
        } catch (e) {
            console.error('Failed to fetch user info', e);
        } finally {
            this.state.loading = false;
            this.render();
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        this.state.loading = true;
        this.state.error = null;
        this.render();

        const success = await this.auth.login(data.username, data.password);

        if (success) {
            await this.fetchUserInfo();
        } else {
            this.state.error = 'Invalid username or password';
            this.state.loading = false;
            this.render();
        }
    }

    render() {
        const { user, loading, error } = this.state;

        if (loading && !user && !error) {
            this.shadowRoot.innerHTML = `
                <div class="mpp-card">
                    <div class="mpp-card--body mppw-centered">
                        <div class="mppw-spinner"></div>
                        <p>Loading...</p>
                    </div>
                </div>
             `;
            return;
        }

        if (user) {
            this.shadowRoot.innerHTML = `
                 <div class="mpp-card">
                    <div class="mpp-card--header">
                        <h3>My Account</h3>
                    </div>
                    <div class="mpp-card--body">
                        <p><strong>Welcome, ${user.firstName || user.username || 'User'}!</strong></p>
                        <p>${user.email || ''}</p>
                        <hr/>
                        <button id="logoutBtn" class="mppw-btn secondary">Logout</button>
                    </div>
                 </div>
             `;
            this.shadowRoot.querySelector('#logoutBtn').onclick = () => {
                this.auth.logout();
            };
        } else {
            this.shadowRoot.innerHTML = `
                 <div class="mpp-card">
                    <div class="mpp-card--header">
                        <h3>Login</h3>
                    </div>
                    <div class="mpp-card--body">
                        ${error ? `<div class="mppw-alert mppw-alert__danger"><span class="mppw-alert__text">${error}</span></div>` : ''}
                        
                        <form id="loginForm">
                             <div class="mb-medium">
                                <label>Username</label>
                                <input type="text" name="username" class="mppw-form-control" required />
                             </div>
                             <div class="mb-medium">
                                <label>Password</label>
                                <input type="password" name="password" class="mppw-form-control" required />
                             </div>
                             <div class="mppw-right">
                                <button type="submit" class="mppw-btn primary" ${loading ? 'disabled' : ''}>
                                    ${loading ? 'Logging in...' : 'Login'}
                                </button>
                             </div>
                        </form>
                    </div>
                 </div>
             `;
            this.shadowRoot.querySelector('#loginForm').onsubmit = (e) => this.handleLogin(e);
        }
    }
}

customElements.define('mpp-user-login', UserLogin);
