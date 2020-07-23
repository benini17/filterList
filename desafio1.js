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
  } else {
    // someUsers.innerHTML = `${counter()} found users`;
    // zeroUsers.style.display = 'none';
    // someUsers.style.display = 'initial';
  }
}

function counter() {
  let totalSum = document.querySelectorAll('#shown').length;
  console.log('totalSum', totalSum);
  return totalSum;
}

function search() {
  function startSearch(event) {
    var hasText = !!inputName.value && inputName.value.trim() !== '';

    if (!hasText) {
      searchBtn.disabled = false;
      searchFilterBtnApply();
      // return;
    }

    const searchFilterBtnApply = () =>
      Array.from(list.children).map((li) => {
        let matchFound = new RegExp(inputName.value, 'gi').test(li.innerText);

        console.log(inputName.value);

        if (matchFound) {
          li.id = 'shown';

          let someUsers = document.getElementById('someUsers');

          someUsers.innerHTML = `${counter()} found users`; //new obs
          zeroUsers.style.display = 'none'; //new obs
          someUsers.style.display = 'initial'; //new obs
        } else {
          li.classList.add('hidden');
          li.id = '';
        }
      });
    searchFilterBtnApply();
  }

  let searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', startSearch);

  inputName.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' || event.target === 'Backspace') {
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
