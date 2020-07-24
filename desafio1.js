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

function counter(number, otherInfo) {
  switch (number) {
    case 1:
      let totalSum = document.querySelectorAll('#shown').length;
      return totalSum;
    case 2:
      let shownUsers = document.querySelectorAll('#shown');
      console.log('shownUsers', shownUsers);
      let object = people.results;

      let arrFoundUsers = [];

      for (let i = 0; i < shownUsers.length; i++) {
        let fullInformation = Array.from(shownUsers)[i].textContent;
        arrFoundUsers.push(fullInformation);
        console.log('arrFoundUsers', arrFoundUsers);
      }
      console.log('arrFoundUsers', arrFoundUsers);
      let arrDB = [];
      for (let i = 0; i < object.length; i++) {
        let fullNameDB = `${object[i].name.first} ${object[i].name.last}, ${object[i].dob.age} anos`;
        arrDB.push(fullNameDB);
      }
      console.log('arrDB', arrDB);
      let index = [];
      let ages = [];
      let genders = [];

      for (let i = 0; i < arrFoundUsers.length; i++) {
        index.push(arrDB.indexOf(arrFoundUsers[i]));
        ages.push(object[index[i]].dob.age);
        genders.push(object[index[i]].gender);
        console.log('dentro index', genders);
      }
      console.log('antes do if', ages);

      let totalMen = 0;
      genders.forEach((gender) => {
        if (gender == 'male') {
          return (totalMen += 1);
        } else {
          return (totalWomen += 1);
        }
      });
  }
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

function search() {
  function startSearch(event) {
    var hasText = !!inputName.value && inputName.value.trim() !== '';

    if (!hasText) {
      searchBtn.disabled = false;
      searchFilterBtnApply();
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
  let arrParagraph = Array.from(document.getElementsByClassName('answer'));

  arrParagraph[0].textContent = counter(2, 'male');
  arrParagraph[1].textContent = counter(2, 'female');
  arrParagraph[2].textContent = counter(2, 'ageSum');
  arrParagraph[3].textContent = counter(2, 'ageAverage');
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
