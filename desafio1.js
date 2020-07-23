inputName.addEventListener('keyup', messageUsersNotFound);

window.addEventListener('load', () => {
  console.log('Página totalmente carregada');
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  form();
  search();
});

function preventFormSubmit() {
  function stopSubmit(event) {
    event.preventDefault();
  }
  let form = document.querySelector('form');
  form.addEventListener('submit', stopSubmit);
}

function messageUsersNotFound(event) {
  let inputName = document.getElementById('inputName').value;

  let zeroUsers = document.getElementById('zeroUsers');
  let someUsers = document.getElementById('someUsers');

  if (inputName == '') {
    zeroUsers.innerHTML = 'No users found';
    someUsers.style.display = 'none';
  }
  statisticSection();
}

function search() {
  function counter(number) {
    switch (number) {
      case 1:
        let totalSum = document.querySelectorAll('#shown').length;
        console.log('totalSum', totalSum);
        return totalSum;
      case 2:
        let teste = document.querySelectorAll('#shown');

        let object = people.results;

        console.log('object', object);

        let arrFoundUsers = [];
        for (let i = 0; i < teste.length; i++) {
          let fullInformation = Array.from(teste)[i].textContent;
          arrFoundUsers.push(fullInformation);
          console.log('arrFoundUsers', arrFoundUsers);
        }

        let arrDB = [];
        for (let i = 0; i < object.length; i++) {
          let fullNameDB = `${object[i].name.first} ${object[i].name.last}, ${object[i].dob.age} anos`;
          arrDB.push(fullNameDB);
        }
        let index = [];
        let ages = [];
        let genders = [];
        for (let i = 0; i < arrFoundUsers.length; i++) {
          index.push(arrDB.indexOf(arrFoundUsers[i]));
          ages.push(object[index[i]].dob.age);
          genders.push(object[index[i]].gender);
          console.log('dentro index', genders);
        }
    }
  }

  function startSearch(event) {
    var hasText = !!inputName.value && inputName.value.trim() !== '';

    if (!hasText) {
      searchBtn.disabled = false;
      searchFilterBtnApply();
    }

    const searchFilterBtnApply = () =>
      Array.from(list.children).map((li) => {
        let matchFound = new RegExp(inputName.value, 'gi').test(li.innerText);

        console.log(inputName.value);

        if (matchFound) {
          li.id = 'shown';

          let someUsers = document.getElementById('someUsers');

          zeroUsers.style.display = 'none';
          someUsers.style.display = 'initial';
        } else {
          li.classList.add('hidden');
          li.id = '';
        }
        let differentFlow = 1;
        someUsers.innerHTML = `${counter(differentFlow)} found users`;
      });

    searchFilterBtnApply();
  }

  let searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', startSearch);

  inputName.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      startSearch();
    } else {
      return;
    }
  });

  // console.log('list.children', Array.from(list.children));
}

function form() {
  //creating list structure and adding the information
  function creatingList() {
    divList = document.getElementById('names');
    divList.innerHTML = '';

    let ul = document.createElement('ul');
    ul.id = 'list';

    for (let i = 0; i < shownPerson.length; i++) {
      let li = document.createElement('li');
      li.classList.add('hidden');

      let photo = createPhoto(i);
      let span = document.createElement('span');
      span.textContent = shownPerson[i];

      li.appendChild(photo);
      li.appendChild(span);

      ul.appendChild(li);
    }
    divList.appendChild(ul);

    function createPhoto(index) {
      let photo = document.createElement('img');

      photo.src = peoplePhotos[index].thumbnail;
      return photo;
    }

    messageUsersNotFound();
  }

  //  List of people.js with all information alphabetically organized
  let object = people.results;
  object = object.sort((a, b) => a.name.first.localeCompare(b.name.first));

  //list of names and ages
  let shownPerson = object.map(
    (person) =>
      `${person.name.first} ${person.name.last}, ${person.dob.age} anos`
  );

  //list of photos accordingly to its owner index
  let peoplePhotos = object.map((personPhotos) => personPhotos.picture);

  creatingList();
}

function statisticSection() {
  let arrParagraph = Array.from(document.querySelectorAll('p'));
  let arrH2 = Array.from(
    document.getElementById('statistics').getElementsByTagName('h2')
  );

  console.log(arrParagraph);
  console.log(arrH2);

  let totalSum = document.querySelectorAll('#shown').length;
  console.log('totalSum', totalSum);
  let teste = document.querySelectorAll('#shown');
  console.log('all', teste);
  let differentFlow = 2;

  // arrParagraph[0].textContent = `${
  //   arrParagraph[0].textContent
  // } ${counterMale(differentFlow)}`;
  // arrParagraph[1].textContent = `${
  //   arrParagraph[0].textContent
  // } ${counterFemale(differentFlow)}`;
  // arrParagraph[2].textContent = `${arrParagraph[0].textContent} ${ageSum()}`;
  // arrParagraph[3].textContent = `${
  //   arrParagraph[0].textContent
  // } ${ageAvarage()}`;
}

/* 
As typping it filters

    inputName.addEventListener('keyup', () =>
      Array.from(list.children).map((li) => {
        let matchFound = new RegExp(inputName.value, 'gi').test(li.innerText);
        if (!matchFound) {
          li.classList.add('hidden');
        } else {
          li.classList.remove('hidden');
        }
      })
    );
    */
