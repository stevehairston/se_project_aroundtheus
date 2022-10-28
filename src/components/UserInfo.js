class UserInfo {
  constructor({ userTitleSelector, userDescSelector }) {
    this._userNameEl = document.querySelector(userTitleSelector);
    this._userDescEl = document.querySelector(userDescSelector);  }

  getUserInfo() {
    return {
      userName: this._userNameEl.textContent,
      userDescription: this._userDescEl.textContent,
    };
  }

  setUserInfo({userName, userDescription}) {
    this._userNameEl.textContent = userName;
    this._userDescEl.textContent = userDescription;
  }
}

export default UserInfo;
