class Api {
  constructor(baseUrl , headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  _fetch = (url , headers) => {
    return fetch(url , headers)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
  }

  getInitialCards() {
    return this._fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
  }

  deleteCard(cardId) {
    return this._fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    });
  }

  removeLike(cardId) {
    return this._fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  getUserData() {
    return this._fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  editUserData(name , about) {
    return this._fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editAvatar(avatar) {
    return this._fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatar }),
    });
  }

  addCard(name , link) {
    return this._fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }
}

export default Api;