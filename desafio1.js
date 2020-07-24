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
  search();
  statisticSection();
}

function messageUsersNotFound() {
  // let inputName = document.getElementById('inputName');

  let zeroUsers = document.getElementById('zeroUsers');
  let someUsers = document.getElementById('someUsers');

  zeroUsers.innerHTML = 'No users found';
  someUsers.style.display = 'none';
}

function counter(otherInfo) {
  let shownUsers = document.querySelectorAll('#shown');
  // console.log('shownUsers', shownUsers);
  let object = people.results;

  let arrFoundUsers = [];

  for (let i = 0; i < shownUsers.length; i++) {
    let fullInformation = Array.from(shownUsers)[i].textContent;
    arrFoundUsers.push(fullInformation);
    // console.log('arrFoundUsers', arrFoundUsers);
  }
  // console.log('arrFoundUsers', arrFoundUsers);
  let arrDB = [];
  for (let i = 0; i < object.length; i++) {
    let fullNameDB = `${object[i].name.first} ${object[i].name.last}, ${object[i].dob.age} anos`;
    arrDB.push(fullNameDB);
  }
  // console.log('arrDB', arrDB);
  let index = [];
  let ages = [];
  let genders = [];

  for (let i = 0; i < arrFoundUsers.length; i++) {
    index.push(arrDB.indexOf(arrFoundUsers[i]));
    ages.push(object[index[i]].dob.age);
    genders.push(object[index[i]].gender);
    // console.log('dentro index', genders);
  }
  // console.log('antes do if', ages);

  // console.log('otherInfo', otherInfo);
  switch (otherInfo) {
    case 1:
      let totalSum = document.querySelectorAll('#shown').length;
      return totalSum;
    case 'male':
      let totalMen = 0;
      genders.forEach((gender) => {
        if (gender == 'male') {
          // console.log('totalMen', totalMen);
          return totalMen++;
        }
      });
    case 'female':
      let totalWomen = 0;
      genders.forEach((gender) => {
        if (gender == 'female') {
          return totalWomen++;
        }
      });
    // else if (otherInfo == 'ageAverage') {
    //   console.log('agessssssssssssss', ages);
    //   const totalSum = ages.reduce((acc, curr) => {
    //     acc + curr, 0;
    //   });
    //   let avarage = totalSum / ages.length;
    //   return avarage;
    // } else {
    //   const totalSum2 = ages.reduce((acc, curr) => acc + curr, 0);
    //   console.log(totalSum2);
    // }
  }
}

function search() {
  function startSearch(event) {
    var hasText = !!inputName.value && inputName.value.trim() !== '';

    if (hasText) {
      searchBtn.disabled = false;
    }

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
        someUsers.innerHTML = `${counter(1)} found users`;
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
  let arrParagraph = Array.from(document.getElementsByClassName('answer'));

  arrParagraph[0].textContent = counter('male');
  arrParagraph[1].textContent = counter('female');
  arrParagraph[2].textContent = counter('ageSum');
  arrParagraph[3].textContent = counter('ageAverage');
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
