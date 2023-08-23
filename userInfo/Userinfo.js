class UserInfo {
  constructor() {
    this.timeOpened = new Date();
    this.timezone = new Date().getTimezoneOffset() / 60;
  }
  pageon() {
    // file location
    return window.location.pathname;
  }
}
