class Api {
  constructor(baseUrl, options) {
    this.url = baseUrl;
    this.options = options;
  }

_porcessResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Prommise.reject(`Error  ${res.status}`);
}

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.options,
    }).then(this._porcessResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.options,
    }).then(this._porcessResponse);
  }

  editUserProfile(userData) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.options,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._porcessResponse);
  }

  addCard(data) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.options,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._porcessResponse);
  }

  deleteCard(data) {
    return fetch(`${this.url}/cards/${data}`, {
      method: "DELETE",
      headers: this.options,
    }).then(this._porcessResponse);
  }

  addLike(data) {
    return fetch(`${this.url}/cards/likes/${data}`, {
      method: "PUT",
      headers: this.options,
    }).then(this._porcessResponse);
  }

  removeLike(data) {
    return fetch(`${this.url}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this.options,
    }).then(this._porcessResponse);
  }

  updateAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then(this._porcessResponse);
  }
}

export default Api;
