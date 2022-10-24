// This class is class is responsible for rendering information about the user on the page.
class UserInfo {
  constructor({ userNameClassSelector, userTitleClassSelector }) {
    this._userNameElement = document.querySelector(userNameClassSelector);
    this._userTitleElement = document.querySelector(userTitleClassSelector)
  }

getuserInfo() {
  //Returns an object with info about user. For cases when need to display the user data in the open form.
return {
  userName: this._userNameElement.textContent,
  userDescription: this._userTitleElement.textContent
}
};

setUserINfo(userName, userDescription) {
  //Takes new user data and adds it on the page
  this._userNameElement.textContent = userName,
  this._userTitleElement.textContent = userDescription
}
}

export default UserInfo;
