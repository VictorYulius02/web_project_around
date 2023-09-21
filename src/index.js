import "./styles/index.css";

import headerImg from "./images/header.png";
//import profileAvt from "./images/AvatarPicture.png";

import Api from './components/Api.js';
import PopupWithForm from './components/PopupWithForms.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithConfirm from './components/PopupWithConfirm.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';

let userId;

const headerImage = document.getElementById('header-image');
headerImage.src = headerImg;

/*const profileAvatar = document.getElementById('profile-avatar');
profileAvatar.src= profileAvt;*/

const api = new Api(
  "https://around.nomoreparties.co/v1/web_id_03",
  {
    authorization: "1e8e89f5-ead2-48c0-ad1c-b9a4bb77ebde",
    "Content-Type": "application/json"
  },
)

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    const validator = new FormValidator(form, input);
    validator.enableValidation();
  });
});

const userInfo = new UserInfo('.profile-info__name', '.profile-info__job', '.profile__avatar');

const editProfileFormPopup = new PopupWithForm(
  'popup[name="editPopup"]', 
  (formData) => {
  api
    .editUserData(
      formData["nameInput"],
      formData["jobInput"]
    )
    .then((userData) => {
      userInfo.setUserInfo({
        nameInput: userData.name,
        jobInput: userData.about,
      });
      editProfileFormPopup.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      editProfileFormPopup.setButtonText("Simpan");
    });
  },
  "Menyimpan..."
);

const editProfileForm = document.querySelector('popup[name="editPopup"] .popup__form');
const nameInput = editProfileForm.querySelector('#name-input');
const jobInput = editProfileForm.querySelector('#job-input');

const editButton = document.querySelector('.profile-info__edit-button');
editButton.addEventListener('click', () => {
  
  const currentUserInfo = userInfo.getUserInfo();
  
  editProfileFormPopup.open();

  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
});

const containerSelector = ".elements";
const cardElement = ".element-template";

const renderer = (item) => {
  const card = new Card(
    item,
    cardElement,
    handleCardClick,
    handleDeleteClick,
    handleLikeButtonClick,
    userId
  );

  return card._getTemplate();
}

const cardSection = new Section(renderer , containerSelector);
const popupWithImage = new PopupWithImage('popup[name="viewPopup"]');

function handleCardClick(cardData) {
  popupWithImage.open(cardData);
}

function handleLikeButtonClick(card) {
  const cardIsLiked = card.isLiked();
  if (cardIsLiked) {
    api
      .removeLike(card.getId())
      .then((res) => {
        card.handleLikeCard(res.likes);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } else {
    api
      .likeCard(card.getId())
      .then((res) => {
        card.handleLikeCard(res.likes);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
}

const confirmPopup = new PopupWithConfirm(
  'popup[name="confirmPopup"]',
  (card , target) => {
    console.log("Card Object:", card);
    api
      .deleteCard(card._id)
      .then(() => {
        target.remove();
        confirmPopup.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        confirmPopup.setButtonText("Ya");
      })
  },
  "Menghapus..."
)

function handleDeleteClick(card, target) {
  confirmPopup.open(card, target);
}

const handleAddFormSubmit = (cardData) => {
  cardSection.addItem(cardData);
}

const addFormPopup = new PopupWithForm(
  '.popup[name="addPopup"]', 
  (formData) => {
    api
      .addCard(
        formData.titleInput,
        formData.webAddressInput
      )
      .then((res) => {
        console.log('API Response:', res);
        const cardData = {
          name: res.name,
          link: res.link,
          _id: res._id,
          owner: { _id: res.owner._id },
        };
        handleAddFormSubmit(cardData);
        addFormPopup.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        addFormPopup.setButtonText("Simpan");
      });
    },
    "Menyimpan..."
);


const updateImgButton = document.querySelector('.profile__img-update-button');
const updateImgInput = document.querySelector('#updateimg-input');
const updateImgFormPopup = new PopupWithForm('popup[name="updateImgPopup"]', (formData) => {
  const newAvatarUrl = formData.updateImgInput;
  api
    .editAvatar(newAvatarUrl)
    .then((userData) => {
      userInfo.setAvatar(userData.avatar);
      updateImgFormPopup.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
});

updateImgButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getAvatarInfo();
  
  updateImgFormPopup.open();

  updateImgInput.value = currentUserInfo.avatar;
})

const addPopupButton = document.querySelector('.profile__add-button');
const titleInput = document.querySelector('#title-input');
const webAddressInput = document.querySelector('#webaddress-input');
addPopupButton.addEventListener('click', () => {
  titleInput.value = "";
  webAddressInput.value = "";
  
  titleInput.setAttribute("placeholder" , "Judul");
  webAddressInput.setAttribute("placeholder" , "URL Gambar");

  addFormPopup.open();
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId= userData._id;
    userInfo.setUserInfo({
      nameInput: userData.name,
      jobInput: userData.about,
    });
    userInfo.setAvatar(userData.avatar);
    cardSection.renderItems(cardData);
    //console.log(cardData);
    //console.log(userData);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

editProfileFormPopup.setEventListeners();
addFormPopup.setEventListeners();
updateImgFormPopup.setEventListeners();
confirmPopup.setEventListeners();
