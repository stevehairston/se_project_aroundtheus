class UserInfo {
  constructor({ userTitleSelector, userDescSelector, userAvatarSelector }) {
    this._userNameEl = document.querySelector(userTitleSelector);
    this._userDescEl = document.querySelector(userDescSelector);
    this._userAvatarEl = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameEl.textContent,
      userDescription: this._userDescEl.textContent,
    };
  }

  setUserInfo({ userName, userDescription }) {
    this._userNameEl.textContent = userName;
    this._userDescEl.textContent = userDescription;
  }

  setUserAvatar(userAvatar) {
    this._userAvatarEl.src = userAvatar;
  }
}

export default UserInfo;
