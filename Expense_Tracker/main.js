var currentMonth = document.getElementById('month');
var d = new Date();
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
currentMonth.innerHTML = `${months[d.getMonth()]}  ${d.getFullYear()}`;

const balance = document.getElementById('current-balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10.23 },
//   { id: 4, text: 'Camera', amount: 250 },
//   { id: 5, text: 'chocolate', amount: -2 },
// ];
// Local Storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);
let transactions =
  localStorage.getItem('transactions') != null ? localStorageTransactions : [];
// Add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: parseInt(amount.value),
    };
    // console.log(transaction);

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}
// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to dom
addTransactionDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text}<span>${sign} ${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick=removeTransaction(${
    transaction.id
  })><i class="fas fa-trash"></i></button>`;
  list.appendChild(item);
};
// Update balance, income expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  // console.log(amounts);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;

  // console.log(amounts);
  // console.log(income);
  // console.log(total);
  // console.log(expense);
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id != id);
  updateLocalStorage();
  init();
}
// Update local Storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
// Init App
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();

// Event Listener
form.addEventListener('submit', addTransaction);
