const Modal = {
      open (){
        // abrir modal
        // adicionar a classe active oa modal
        document.
          querySelector('.modal-overlay')
          .classList
          .add('active')

      },
      
      close (){
        // fechar Modal
        // remover a classe active no modal
        document.
          querySelector('.modal-overlay')
          .classList
          .remove('active')
      }
      // desafio: transformar essas duas funções em uma só com o toogle() no lugar do .add e .remove
}

// preciso somar as entradas
// depois somar as saídas
// remover das entradas o valor das saídas
// essa última conta será o total

// nesse array vão ficar as transações adicionadas pelo usuário
const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000, /* equivale a 500,00 reaistem que colocar o valor sem as vírgulas pq depois ai ser formatado adequadamente */
    date: '23/01/2021',
  },
  
  {
    id: 2,
    description: 'website',
    amount: 500000, /* equivale a 500,00 reaistem que colocar o valor sem as vírgulas pq depois ai ser formatado adequadamente */
    date: '23/01/2021',
  },
  
  {
    id: 3,
    description: 'Internet',
    amount: -20000, /* equivale a 500,00 reaistem que colocar o valor sem as vírgulas pq depois ai ser formatado adequadamente */
    date: '23/01/2021',
  },

  {
    id: 4,
    description: 'App',
    amount: 200000, /* equivale a 500,00 reaistem que colocar o valor sem as vírgulas pq depois ai ser formatado adequadamente */
    date: '23/01/2021',
  }
]


const Transaction = {
  incomes() {
    // somar as entradas
  },
  expenses() {
    //somar as saídas
  },
  total() {
    // entradas - saídas
  }
}

// pegar as transações do objeto criado no array transactions e colocar no HTML
// substituir os dados do HTML com os dados do JS
const DOM = {

  transactionsContainer: document.querySelector('#data-table tbody'),
  
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },
  
  innerHTMLTransaction(transaction) {
    
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)



    // o inner tá montando o HTML
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
      <img src="./assets/minus.svg" alt="remover transação">
      </td>
    `
    return html
    /* pra tirar as coisas que tem dentro da função e usar fora dela, tem que colocar o return */
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""
  }
}

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction)
})