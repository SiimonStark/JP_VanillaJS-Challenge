// !! Global Variables
let cards = [];
// END
// !! Query Selectors !!
// ** Nav
const findFaveBtn = document.getElementById('find-fave');
const filterSwillBtn = document.getElementById('swill');
const filterPlausBtn = document.getElementById('plausible');
const filterGeniusBtn = document.getElementById('genius');
const addFiltInput = document.getElementById('input-filt');
const addFiltSubmit = document.getElementById('submit-filt');
// ** Control Form
const ideaForm = document.querySelectorAll('.add-idea input');
const titleInput = document.getElementById('input-title');
const bodyInput = document.getElementById('input-body');
const ideaSubmit = document.getElementById('submit-idea');
const searchInput = document.getElementById('input-seatch');
const searchSubmit = document.getElementById('submit-search');
// ** Card Container
const container = document.querySelector('.card--container');
// ** Card
const cardFave = document.querySelector('.card__fave');
const cardDelete = document.querySelector('.card__delete');
const upvote = document.querySelector('.vote__up');
const downvote = document.querySelector('.vote__down');
// END
// !! Event Listeners
Array.from(ideaForm).forEach(input => {
  input.addEventListener('input', (e) => saveBtnToggle(e.target));
});
ideaSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  createIdea()
});

// !! Functions
// ** Global Funcs
window.onload = () => {
  if (localStorage.getItem("cards")) {
    let cardStorage = JSON.parse(localStorage.getItem('cards'));
    cardStorage.map(card => {
      let loadedIdea = new Idea({...card});
      cards.push(loadedIdea);
    });
  };
;}
// END
// ** Nav Funcs


// ** Control Form Funcs
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
  };
  saveIdeas(idea);
};

const saveIdeas = (idea) => {
  newIdea = new Idea({ ...idea });
  cards.push(newIdea);
  newIdea.saveToLocal(cards);
  clearIdeaForm();
};

const clearIdeaForm = () => {
  titleInput.value = '';
  bodyInput.value = '';
};

// END
// ** Container Funcs


// ** Card Funcs
