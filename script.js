const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');

// const dummytransaction = [
//     { id : 1,  text : 'Flower',  amount:  -20},
//     { id : 2,  text : 'Salary',   amount :  300},
//     { id : 3,  text : 'Book' ,   amount :  -10},
//     { id : 4,  text : 'Camera', amount : 150}
// ];

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions')  !==  null  ?  localStorageTransaction : [];


//add transaction
function addTransaction(event){
    event.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please Enter Text and Amount');

     }else{ 
         const transaction ={
            id : generateID(),
            text : text.value,
            amount : +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValue();

        text.value = '';
        amount.value = '';
    }
}
//generate ID
function generateID(){
    return Math.floor(Math.random() * 1000000);
}

//add transaction on list 
function addTransactionDOM(transactions){
    const sign  = transactions.amount  <  0  ?  '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transactions.amount  <  0 ? 'minus' : 'plus');
    item.innerHTML = `${transactions.text} <span>${sign}${Math.abs(transactions.amount)}</span> 
    <button class="delete-btn" onclick='removeTransaction(${transactions.id})'>x</button>`;

    list.appendChild(item);
}
//update values 
function updateValue(){
    const amounts = transactions.map( transaction => transaction.amount);
    const totall = amounts.reduce((acc,item) => (acc += item), 0).toFixed(2);
    const income  = amounts
    .filter(amount => amount > 0)
    .reduce((acc,item) => (acc += item), 0)
    .toFixed(2);
    const expense = Math.abs(amounts
        .filter(amount => amount < 0)
        .reduce((acc,item) => (acc += item), 0)
        .toFixed(2)) ;

        //add to dom 
        moneyMinus.innerText= `$ ${expense}`;
        moneyPlus.innerText = `$${income}`;
        balance.innerText = `${totall}`; 
    }
    //remove transaction 
    function removeTransaction(id){
        transactions = transactions.filter(transaction => transaction.id !==id);
        updateLocalStorage();
        init();
    }
    //update localStorage
    function updateLocalStorage(){
        localStorage.setItem('transactions' , JSON.stringify(transactions));
    }
 
//init app
function init(){
    list.innerHTML='';
    transactions.forEach(addTransactionDOM);
    updateValue();
}
init();

//add transaction
form.addEventListener('submit' ,addTransaction);
