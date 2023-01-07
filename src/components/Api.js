class Api {
  constructor(baseUrl, options) {
    this.url = baseUrl;
    this.options = options;
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  editUserProfile(userData) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.options,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  addCard(data) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.options,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  deleteCard(data) {
    return fetch(`${this.url}/cards/${data}`, {
      method: "DELETE",
      headers: this.options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  addLike(data) {
    return fetch(`${this.url}/cards/likes/${data}`, {
      method: "PUT",
      headers: this.options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  removeLike(data) {
    return fetch(`${this.url}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this.options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  updateAvatar(data) {
    console.log(data.link);
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }
}

export default Api;
