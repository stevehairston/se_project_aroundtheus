class UserInfo {
  constructor({ userNameSelector, userDescSelector }) {
    this._userNameEl = document.querySelector(userNameSelector);
    this._userDescEl = document.querySelector(userDescSelector);
  }

  getUserInfo() {
    //Returns an object with info about user. For cases when need to display the user data in the open form.
    return {
      userName: this._userNameEl.textContent,
      userDescription: this._userDescEl.textContent,
    };
  }

  setUserInfo({ userName, userDescription }) {
    // adds data to the page after clicking the Submit button
    this._userNameEl.textContent = userName;
    this._userDescEl.textContent = userDescription;
  }
}

export default UserInfo;
