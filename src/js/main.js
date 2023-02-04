document.addEventListener('DOMContentLoaded', function() {
  const headerSearch = document.querySelector('.header__btn');
  const headerInput = document.querySelector('.header__search');
  const closeSearch = document.querySelector('.header__search__btn');
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const closeNav = document.querySelector('.nav__btn')
  const aboutInput = document.querySelector('.about__input');
  const aboutValid = document.querySelector('.about__valid');

  const mapModal = document.querySelector('.contacts__modal');
  const contactsBtn = document.querySelector('.contacts__btn');
  const contactsEmail = document.querySelector('.contacts__request-email');
  const contactsValid = document.querySelector('.contacts__valid');

  
  
  headerSearch.addEventListener('click', () => {
  headerInput.classList.add('active')
  })
  
  closeSearch.addEventListener('click', () => {
    headerInput.classList.remove('active')
  })

  burger.addEventListener('click', () => {
    closeNav.classList.add('active')
    nav.classList.add('active');
  })

  closeNav.addEventListener('click', () => {
    closeNav.classList.remove('active')
    nav.classList.remove('active');
  })

  aboutInput.addEventListener('input', function() {
    aboutValid.classList.remove('invalid')
    aboutValid.classList.remove('invalid-about')

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!aboutInput.value.match(mailformat)) {
      aboutValid.classList.add('invalid');
      aboutValid.classList.add('invalid-about');

    }
    if (aboutInput.value == '') {
    aboutValid.classList.remove('invalid')
    aboutValid.classList.remove('invalid-about')

    }
  })

  contactsEmail.addEventListener('input', function() {
    contactsValid.classList.remove('invalid')
    contactsValid.classList.remove('invalid-contacts')

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!contactsEmail.value.match(mailformat)) {
      contactsValid.classList.add('invalid');
      contactsValid.classList.add('invalid-contacts');

    }
    if (contactsEmail.value == '') {
    contactsValid.classList.remove('invalid')
    contactsValid.classList.remove('invalid-contacts')

    }
  })

  ymaps.ready(init);
  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center:[55.76479582480986,37.631422858802864],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 14,
      controls: []
    }, {
      suppressMapOpenBlock: true
  });
    
  
  
    const myPlacemark = new ymaps.Placemark([55.7677475401011,37.639362197486946], {}, {
      iconLayout: 'default#image',
      iconImageHref: './images/svg/map-icon.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [-3, -42]
    })
  
    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myPlacemark);
  
    myPlacemark.events.add('click', function () {
      mapModal.classList.toggle('active')
  
  });
  }

  contactsBtn.addEventListener('click', () => {
    mapModal.classList.remove('active')
  })


})

