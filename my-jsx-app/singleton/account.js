class CurrentUser {
    constructor() {
        this.username = null;
        this.isLoggedIn = false;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new CurrentUser();
        }
        return this.instance;
    }

    // Các phương thức để thiết lập và truy xuất thông tin người dùng
    setUsername(username) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    setLoggedIn(status) {
        this.isLoggedIn = status;
    }

    isLoggedIn() {
        return this.isLoggedIn;
    }
}

module.exports = CurrentUser;