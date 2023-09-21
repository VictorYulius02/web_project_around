class UserInfo {
  constructor(name, job, avatar) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  getAvatarInfo() {
    return {avatar: this._avatar.src}
  }

  setUserInfo(data) {
    this._name.textContent = data.nameInput;
    this._job.textContent = data.jobInput;
  }

  setAvatar(data) {
    this._avatar.src = data;
  }
}

export default UserInfo;