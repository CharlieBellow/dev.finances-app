const Modal = {
  open (){
    // abrir modal
    // adicionar a classe active oa modal
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
    
  },
  
  close (){
    // fechar Modal
    // remover a classe active no modal
    document
      .querySelector('.modal-overlay')
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

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },

  set(transactions) {
    localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions));
    //transformando em string o que vai ser guardado no local storage
  }
}

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes() {
    // somar as entradas
    //pegar todas as Transações
    let income = 0;

    //para cada transação,
    
    Transaction.all.forEach(transaction => {
      // se ela for maio que zero
      if(transaction.amount > 0) {
        //somar a uma variável e retornar a variável

        income += transaction.amount;
      }

    })
    
    return income;
  },

  expenses() {
    //somar as saídas

    let expense = 0;

    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0) {
        expense += transaction.amount;
      }
    })
    return expense;
  },

  total() {
    // entradas - saídas


    return Transaction.incomes() + Transaction.expenses();
    // coloca + pe o expense já tá com sinal negativo. 
  }
}

// pegar as transações do objeto criado no array transactions e colocar no HTML
// substituir os dados do HTML com os dados do JS
const DOM = {

  transactionsContainer: document.querySelector('#data-table tbody'),
  
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },
  
  innerHTMLTransaction(transaction, index) {
    
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    // o inner tá montando o HTML
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
      <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="remover transação">
      </td>
    `
    return html
    /* pra tirar as coisas que tem dentro da função e usar fora dela, tem que colocar o return */
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    
    document.getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    
    document.getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  }
}

const Utils = {
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100

    return value

  },

  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    // colocando a data no formato brasileiro
  },
  
  formatCurrency(value) {
    //transformando o número em real brasileiŕo
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }
}

const Form = {
  // pegando os elementos HTML e colocando aqui dentro do form
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),


  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },


  validateFields() {
    const {description, amount, date} = Form.getValues()
    
    
    if (description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() == "") {
        throw new Error("Por favor, preencha todos os campos.")
      }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()
    
    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },
  

  submit(event) {
    // trava o botão salvar pra eu testar as funções
    event.preventDefault();

    try {
      Form.validateFields()
      // verificar se todas as informações foram preenchidas.
  
      const transaction = Form.formatValues()
  
      // salvar
      Transaction.add(transaction)
  
      //apagar os dados do formulrio
      Form.clearFields()
      // modal fechar
      Modal.close()

    } catch (error) {
      alert(error.message)
    }

  }

}




//Storage.get()
// dentro da função Storage tem o get e o set. eu quero só o get, por isso digo que quero chamar a função Storage mas só a parte do get, então Storage.get(). por isso as funções maiores(mais completas que são o primeiro nível, são escritas com letra maiúscula pra não confundir)

const App = {
  init() { 

    Transaction.all.forEach(DOM.addTransaction)

    DOM.updateBalance()
    
    Storage.set(Transaction.all)
  },


  reload() { 
    DOM.clearTransactions()
    App.init()
  },
}

App.init()

/*Transaction.add({
  description: "alo",
  amount: 200,
  date: '23/01/2021'

})*/

// ctrl + k + 1 - fecha tudo no primeiro nível


// array com as transações
/* [
  {

    description: 'Luz',
    amount: -50001,
     equivale a 500,00 reaistem que colocar o valor sem as vírgulas pq depois ai ser formatado adequadamente 
    date: '23/01/2021',
  },
  
  {
    
    description: 'website',
    amount: 500000,
    date: '23/01/2021',
  },
  
  {
    
    description: 'Internet',
    amount: -20012,
    date: '23/01/2021',
  },

  {
    
    description: 'App',
    amount: 200000,
    date: '23/01/2021',
  }
],*/