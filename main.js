// !! Global Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let cards = [];
// ========================END========================


// !! Query Selectors ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ****************** Nav ******************
const findFaveBtn = document.getElementById('find-fave');
const filterSwillBtn = document.getElementById('swill');
const filterPlausBtn = document.getElementById('plausible');
const filterGeniusBtn = document.getElementById('genius');
const addFiltInput = document.getElementById('input-filt');
const addFiltSubmit = document.getElementById('submit-filt');
// ========================END========================
// ****************** Control Form ******************
const ideaForm = document.querySelectorAll('.add-idea input');
const titleInput = document.getElementById('input-title');
const bodyInput = document.getElementById('input-body');
const ideaSubmit = document.getElementById('submit-idea');
const searchInput = document.getElementById('input-seatch');
const searchSubmit = document.getElementById('submit-search');
// ========================END========================
// ****************** Card Container ******************
const container = document.querySelector('.card--container');
// ========================END========================
// ****************** Card ******************
const cardDom = document.querySelector('.card');
const cardFave = document.querySelector('.card__fave');
const cardDelete = document.querySelector('.card__delete');
const upvote = document.querySelector('.vote__up');
const downvote = document.querySelector('.vote__down');
// ========================END========================


// !! Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ****************** Control Form ******************
Array.from(ideaForm).forEach(input => {
  input.addEventListener('input', (e) => saveBtnToggle(e.target));
});
ideaSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  createIdea();
});
// ========================END========================
// ****************** Card ******************
container.addEventListener('click', (e) => determineEvent(e.target));

// ========================END========================


// !! Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ****************** Global Funcs ******************
window.onload = () => {
  if (localStorage.getItem("cards")) {
    let cardStorage = JSON.parse(localStorage.getItem('cards'));
    cardStorage.map(card => {
      let loadedIdea = new Idea({...card});
      cards.push(loadedIdea);
    });
  };
  renderContainerCards(cards);
  console.log(cards)
;}
// ========================END========================
// ****************** Nav Funcs ******************

// ========================END========================
// ****************** Control Form Funcs ******************
const saveBtnToggle = ({value}) => {
  value 
    ? ideaSubmit.disabled = false 
    : ideaSubmit.disabled = true;
};

const createIdea = () => {
  let idea = {
    id: Date.now(),
    title: titleInput.value,
    body: bodyInput.value,
    quality: 'Swill',
    fave: false
  };
  saveIdeas(idea);
};

const saveIdeas = (idea) => {
  newIdea = new Idea({ ...idea });
  cards.push(newIdea);
  newIdea.saveToLocal(cards);
  clearIdeaForm();
  renderContainerCards(cards);
};

const clearIdeaForm = () => {
  titleInput.value = '';
  bodyInput.value = '';
  ideaSubmit.disabled = true;
};
// ========================END========================
// ****************** Container Funcs ******************
const determineEvent = (target) => {
  if (target.classList.contains('card__fave')) {
    faveCard(target.classList);
  } else if (target.classList.contains('card__delete')) {
    deleteCard(target);
  } else if (target.classList.contains('vote__up')) {
    console.log('up');
  } else if (target.classList.contains('vote__down')) {
    console.log('down');
  }
}

const renderContainerCards = (list) => {
  container.innerHTML = '';
  container.innerHTML = list.map(card => (
    `<article id=${card.id} class="card">
      <section class="card--header">
        <button id=${card.id} class="card__fave">
          <i id=${card.id} class="fas fa-star fave-${card.fave} card__fave"></i>
        </button>
        <button id=${card.id} class="card__delete">
          <i id=${card.id} class="far fa-window-close card__delete"></i>
        </button>
      </section>
      <article class="card--content">
        <h3 class="card__title">${card.title}</h3>
        <p class="card__body">${card.body}</p>
      </article>
      <section class="card--footer">
        <button id=${card.id} class="vote__up">
          <i id=${card.id} class="fas fa-thumbs-up vote__up"></i>
        </button>
        <h5>Quality: ${card.quality}</h5>
        <button id=${card.id} class="vote__down">
          <i id=${card.id} class="fas fa-thumbs-down vote__down"></i>
        </button>
      </section>
    </article>`
  )).join('');
} 
// ========================END========================
// ****************** Card Funcs ******************
const faveCard = (target) => {
  if (target.contains('fave-false')) {
    console.log("notFave")
  } else if (target.contains('fave-true')) {
    console.log('fave');
  }
}
const deleteCard = ({id}) => {
  let cardId = parseInt(id);
  let remainingCards = cards.reduce((acc, card) => {
    card.id !== cardId
      ? acc.push(card)
      : card.deleteFromLocal(cardId, cards)
    return acc;
  }, []);
  cards = remainingCards;
  renderContainerCards(cards);
}
const changeQuality = (target) => {

}