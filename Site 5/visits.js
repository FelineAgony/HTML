// Define the Visit class with name, date, and patientName properties
class Visit {
    constructor(name, date, patientName) {
      this.name = name;
      this.date = date;
      this.patientName = patientName;
    }
  }

  class CardiologistVisit extends Visit {
    constructor(name, date, patientName, purpose, bloodPressure, bmi, prevCardio, age) {
      super(name, date, patientName);
      this.purpose = purpose;
      this.bloodPressure = bloodPressure;
      this.bmi = bmi;
      this.prevCardio = prevCardio;
      this.age = age;
    }
  }
  
  class DentistVisit extends Visit {
    constructor(name, date, patientName, purpose, lastVisitDate) {
      super(name, date, patientName);
      this.purpose = purpose;
      this.lastVisitDate = lastVisitDate;
    }
  }
  
  class TherapistVisit extends Visit {
    constructor(name, date, patientName, purpose, age) {
      super(name, date, patientName);
      this.purpose = purpose;
      this.age = age;
    }
  }
  
// Store the board div and the no-items-msg p tag in variables
const board = document.querySelector('.board');
const noItemsMsg = document.querySelector('#no-items-msg');

// Store the modal, modal-overlay, and create-btn in variables
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const createBtn = document.querySelector('.create-btn');

// Store the close-modal-btn, create-visit-btn, and card-form in variables
const closeModalBtn = document.querySelector('.close-modal-btn');
const createVisitBtn = document.querySelector('.create-visit-btn');
const cardForm = document.querySelector('form');

// Store the cardiologistFields, dentistFields, and therapistFields divs in variables
const cardiologistFields = document.querySelector('#cardiologistFields');
const dentistFields = document.querySelector('#dentistFields');
const therapistFields = document.querySelector('#therapistFields');

// Store the select element and its options in variables
const doctorSelect = document.querySelector('#doctor');
const cardiologistOption = document.querySelector('option[value="cardiologist"]');
const dentistOption = document.querySelector('option[value="dentist"]');
const therapistOption = document.querySelector('option[value="therapist"]');

// Hide the no-items-msg p tag if there are cards on the board
if (board.childElementCount > 0) {
  noItemsMsg.style.display = 'none';
  }
  else {
    noItemsMsg.style.display = 'block';
  }
  
// Add an event listener to the createBtn to open the modal when clicked
createBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';
});

// Add an event listener to the closeModalBtn and the modalOverlay to close the modal when clicked
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});
function closeModal() {
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
  resetForm();
}

// Add an event listener to the doctorSelect to show and hide the appropriate fields
doctorSelect.addEventListener('change', () => {
  switch(doctorSelect.value) {
    case 'cardiologist':
      showFields(cardiologistFields);
      hideFields(dentistFields);
      hideFields(therapistFields);
      break;
    case 'dentist':
      showFields(dentistFields);
      hideFields(cardiologistFields);
      hideFields(therapistFields);
      break;
    case 'therapist':
      showFields(therapistFields);
      hideFields(cardiologistFields);
      hideFields(dentistFields);
      break;
    default:
      hideFields(cardiologistFields);
      hideFields(dentistFields);
      hideFields(therapistFields);
  }
});

function showFields(fields) {
  fields.querySelectorAll('input').forEach(input => input.required = true);
  fields.style.display = 'block';
}

function hideFields(fields) {
  fields.querySelectorAll('input').forEach(input => input.required = false);
  fields.style.display = 'none';
}

function resetForm() {
  cardForm.reset();
  hideFields(cardiologistFields);
  hideFields(dentistFields);
  hideFields(therapistFields);
}
function createCard(fullName, doctor, date, reason, notes, age) {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const header = document.createElement('div');
  header.classList.add('card-header');
  header.textContent = fullName;
  
  const doctorLabel = document.createElement('div');
  doctorLabel.textContent = 'Doctor:';
  
  const doctorName = document.createElement('div');
  doctorName.textContent = doctor;

  const dateLabel = document.createElement('div');
  dateLabel.textContent = 'Date:';

  const dateText = document.createElement('div');
  dateText.textContent = date;

  const ageText = document.createElement('div');
  ageText.textContent = reason;

  const ageLabel = document.createElement('div');
  ageLabel.textContent = 'Age:';

  const reasonLabel = document.createElement('div');
  reasonLabel.textContent = 'Reason:';

  const reasonText = document.createElement('div');
  reasonText.textContent = reason;

  const notesLabel = document.createElement('div');
  notesLabel.textContent = 'Notes:';

  const notesText = document.createElement('div');
  notesText.textContent = notes;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    card.remove();
    if (board.childElementCount === 0) {
      noItemsMsg.style.display = 'block';
    }
  });

  const showMoreButton = document.createElement('button');
  showMoreButton.textContent = 'Show More';
  showMoreButton.classList.add('show-more-btn');
  showMoreButton.addEventListener('click', () => {
    const additionalInfo = card.querySelector('.additional-info');
    additionalInfo.classList.toggle('hidden');
    showMoreButton.textContent = additionalInfo.classList.contains('hidden') ? 'Show More' : 'Show Less';
  });

const additionalInfo = document.createElement('div');
  additionalInfo.classList.add('additional-info', 'hidden');
  additionalInfo.appendChild(dateLabel);
  additionalInfo.appendChild(dateText);
  additionalInfo.appendChild(ageLabel);
  additionalInfo.appendChild(ageText);
  additionalInfo.appendChild(reasonLabel);
  additionalInfo.appendChild(reasonText);
  additionalInfo.appendChild(notesLabel);
  additionalInfo.appendChild(notesText);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.appendChild(doctorLabel);
  cardBody.appendChild(doctorName);
  cardBody.appendChild(deleteButton);
   cardBody.appendChild(showMoreButton);
  cardBody.appendChild(additionalInfo);

  card.appendChild(header);
  card.appendChild(cardBody);
  
  return card;
}

// Add an event listener to the createVisitBtn to create a card when clicked
createVisitBtn.addEventListener('click', e => {
  e.preventDefault();
  
  const fullNameInput = document.querySelector('#fullName');
  const fullName = fullNameInput.value;
  
  const doctor = doctorSelect.value;

  const card = createCard(fullName, doctor);
  board.insertBefore(card, board.firstChild);
  
  closeModal();
});
  
let draggedCard = null;

function dragStart() {
  draggedCard = this;
  setTimeout(() => this.style.display = 'none', 0);
}

function dragEnter(event) {
  event.preventDefault();
  this.classList.add('over');
}

function dragOver(event) {
  event.preventDefault();
}

function dragLeave() {
  this.classList.remove('over');
}

function dragDrop() {
  const column = this.closest('.column');
  column.insertBefore(draggedCard, this);
}

function dragEnd() {
  this.style.display = 'flex';
  cards.forEach(card => card.classList.remove('over'));
  saveCardsOrder();
}

function saveCardsOrder() {
  const cardsOrder = {};

  columns.forEach(column => {
    const cards = column.querySelectorAll('.card');
    cardsOrder[column.id] = [...cards].map(card => card.id);
  });

  localStorage.setItem('cardsOrder', JSON.stringify(cardsOrder));
}

function restoreCardsOrder() {
  const cardsOrder = JSON.parse(localStorage.getItem('cardsOrder'));

  if (!cardsOrder) return;

  Object.entries(cardsOrder).forEach(([columnId, cardsIds]) => {
    const column = document.getElementById(columnId);
    cardsIds.forEach(cardId => {
      const card = document.getElementById(cardId);
      column.appendChild(card);
    });
  });
}

cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

columns.forEach(column => {
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragover', dragOver);
  column.addEventListener('dragleave', dragLeave);
  column.addEventListener('drop', dragDrop);
});

restoreCardsOrder();