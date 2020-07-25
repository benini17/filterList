inputName.addEventListener('keyup', messageUsersFound);

window.addEventListener('load', () => {
  console.log('Página totalmente carregada');
  inputName = document.querySelector('#inputName');
  let searchBtn = document.getElementById('searchBtn');
  searchBtn.disabled = true;
  preventFormSubmit();
  form();
});

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
    statisticSection();
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
  function totalMen(otherInfo) {
    console.log(otherInfo);
    let totalMen = 0;
    genders.forEach((gender) => {
      if (gender == 'male') {
        // console.log('totalMen', totalMen);
        return totalMen++;
      }
    });
  }

  function totalWomen(otherInfo) {
    console.log(otherInfo);
    let totalWomen = 0;
    genders.forEach((gender) => {
      if (gender == 'female') {
        return totalWomen++;
      }
    });
  }

  let shownUsers = document.querySelectorAll('#shown');

  let object = people.results;

  let arrFoundUsers = [];

  for (let i = 0; i < shownUsers.length; i++) {
    let fullInformation = Array.from(shownUsers)[i].textContent;
    arrFoundUsers.push(fullInformation);
    console.log('arrFoundUsers', arrFoundUsers);
  }

  let arrDB = [];
  for (let i = 0; i < object.length; i++) {
    let fullNameDB = `${object[i].name.first} ${object[i].name.last}, ${object[i].dob.age} anos`;
  }
  console.log('arrDB', arrDB);
  let index = [];
  let ages = [];
  let genders = [];

  for (let i = 0; i < arrFoundUsers.length; i++) {
    index.push(arrDB.indexOf(arrFoundUsers[i]));
    console.log('index', index);
    ages.push(object[index[i]].dob.age);
    genders.push(object[index[i]].gender);
    console.log('dentro index', genders);
  }
  console.log('antes do if', genders);

  console.log('otherInfo', otherInfo);
  if (otherInfo == 'male') {
    totalMen(otherInfo);
  } else if (otherInfo == 'female') {
    totalWomen(otherInfo);
  }
  // else if (otherInfo == 'ageSum') {
  //   const totalSum2 = ages.reduce((acc, curr) => acc + curr, 0);
  // }
  // else {
  //   const totalSum = ages.reduce((acc, curr) => {
  //     acc + curr, 0;
  //   });
  //   let avarage = totalSum / ages.length;
  //   return avarage;
  // }
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
