inputName.addEventListener('keyup', messageUsersFound);

const start = () => {
  console.log('Página totalmente carregada');
  inputName = document.querySelector('#inputName');
  let searchBtn = document.getElementById('searchBtn');
  searchBtn.disabled = true;
  preventFormSubmit();
  form();
};

start();

function preventFormSubmit() {
  function stopSubmit(event) {
    event.preventDefault();
  }
  let form = document.querySelector('form');
  form.addEventListener('submit', stopSubmit);
}

function messageUsersFound(event) {
  let inputNameValue = event.target.value;
  let hasText = !!inputNameValue && inputNameValue.trim() !== '';

  if (hasText) {
    searchBtn.disabled = false;
    search();
  }
}

function messageUsersNotFound() {
  // let inputName = document.getElementById('inputName');

  let zeroUsers = document.getElementById('zeroUsers');
  let someUsers = document.getElementById('someUsers');

  zeroUsers.innerHTML = 'No users found';
  someUsers.style.display = 'none';
}

function statisticsCounter(otherInfo) {
  console.log('otherinfo inicio statistics', otherInfo);
  let shownUsers = Array.from(
    document.getElementById('names').querySelectorAll('#shown')
  );
  // let shownUsers2 = document.querySelectorAll('#shown');

  let object = people.results;

  let globalInfo = object.map((person, index) =>
    JSON.parse(
      `{"fullname":"${person.name.first} ${person.name.last}", "age": "${person.dob.age}", "gender": "${person.gender}", "index": "${index}"}`
    )
  );

  console.log('shown users teste', shownUsers);

  let arrFoundUsers = shownUsers.map((li) => li.textContent.split(',', 1));

  console.log('index do pessoal aqui', arrFoundUsers);

  const arrFilteredFoundUsers = globalInfo.filter((person) => {
    for (let i = 0; i < arrFoundUsers.length; i++) {
      if (person.fullname == arrFoundUsers[i]) {
        return person;
      }
    }
  });

  console.log('arrFilteredFoundUsers', arrFilteredFoundUsers);
  let totalSum = 0;

  console.log('otherinfo', otherInfo);

  if (otherInfo == 'male') {
    let numMen = arrFilteredFoundUsers.reduce(function (n, person) {
      return n + (person.gender == 'male');
    }, 0);
    console.log('numMen', numMen);
    return numMen;
  } else if (otherInfo == 'female') {
    let numWomen = arrFilteredFoundUsers.reduce(function (n, person) {
      return n + (person.gender == 'female');
    }, 0);
    console.log('numWomen', numWomen);
    return numWomen;
  } else if (otherInfo == 'ageSum') {
    const sumAge = arrFilteredFoundUsers.map((person) => {
      totalSum = parseInt(totalSum) + parseInt(person.age);
    });
    console.log('sumAge', sumAge);
  } else {
    const avarage = arrFilteredFoundUsers.map((person) => {
      return (totalSum =
        parseInt(totalSum) +
        parseInt(person.age) / arrFilteredFoundUsers.length);
      console.log('avarage', avarage);
    });
  }
}

function counter(otherInfo) {
  let totalSum = document.querySelectorAll('#shown').length;
  return totalSum;
}

function search() {
  function startSearch(event) {
    const searchFilterBtnApply = () =>
      Array.from(list.children).map((li) => {
        let matchFound = new RegExp(inputName.value, 'gi').test(li.innerText);

        if (matchFound) {
          li.id = 'shown';

          let someUsers = document.getElementById('someUsers');

          zeroUsers.style.display = 'none';
          someUsers.style.display = 'initial';
        } else {
          li.classList.add('hidden');
          li.id = '';
        }
        someUsers.innerHTML = `${counter()} found users`;
      });

    searchFilterBtnApply();
    statisticSection();
  }

  // let searchBtn = document.getElementById('searchBtn');
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

  let globalInfo = object.map((person, index) =>
    JSON.parse(
      `{"fullname":"${person.name.first} ${person.name.last}", "age": "${person.dob.age}", "gender": "${person.gender}", "index": "${index}"}`
    )
  );

  //list of names and ages
  let shownPerson = globalInfo.map(
    (person) => `${person.fullname}, ${person.age} anos`
  );

  //list of photos accordingly to its owner index
  let peoplePhotos = object.map((personPhotos) => personPhotos.picture);

  creatingList();
}

function statisticSection() {
  let arrParagraph = Array.from(document.getElementsByClassName('answer'));

  arrParagraph[0].textContent = statisticsCounter('male');
  arrParagraph[1].textContent = statisticsCounter('female');
  arrParagraph[2].textContent = statisticsCounter('ageSum');
  arrParagraph[3].textContent = statisticsCounter('ageAverage');
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
