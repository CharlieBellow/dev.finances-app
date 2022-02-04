//objeto Modal: dá funcionalidades (abrir / fechar o Modal) à tela nova (pop-up) que aparece quando clica em + Nova transação.
// tem duas funções: open() - pra abrir o modal e close() - pra fechar o modal
// open() : pega a classe .modal-overlay com o querySelector e procura na lista de classes (classList) e adiciona a classe active. Isso faz com que o formulário para inserção de novas transações apareça na tela. nas linhas 265 a 268 do CSS a classe .modal-overlay.active habilita a opacidade e visibilidade do modal.
// close() : fecha o modal removendo a classe active através do mesmo procedimento do open()
const Modal = {
  open (){
    // abrir modal
    // adicionar a classe active ao modal
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

// Objeto Storage: pega os valores das transações, transforma em arquivo JSON e depois em string novamente além de armazenar tudo no local storage do navegador. 
// guada duas funções: get() e set()
// get() : cospe pra fora do escopo um arquivo JSON que vai ser colocado no local storage. o identificador desse arquivo no "banco de dados" local é o dev.finances:transactions e ele vai retornar o que for colocado ali ou vai retornar um array vazio. o comando parse, vai transformar o conteúdo em array novamente pq o conteúdo precisa estar em string  
// set() : pega o conteúdo do transactions(que não sei de onde vem esse transactions) e transforma em string pq o JSON (formato de arquivo onde vai ser guardado as informações) só aceita esse tipo de conteúdo (string).
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },

  set(transactions) {
    localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions));
    //transformando em string o que vai ser guardado no local storage
  }
}

// objeto Transaction: faz a parte da inteligência do programa adicionando, removendo, e armazenando adequadamente os dados das transações levando em conta o index para não criar confusão. além de entender incomes(receitas) e expenses (despesas) para colocar o sinal negativo nas expenses e calcular o total das transações.

// all: Storage.get() : chama a função get() contida no objetoStorage: Storage.get() e armazena o array que contem as entradas de dados do usuário que é a transação.

// add(transaction): adiciona uma nova transação e armazena no Storage.get() que está sendo referenciado pelo all e ele coloca isso no local storage através do comando push(transaction) ========  
  // App.reload() : chama a função reload dentro do objeto App, essa função reload pega a função clearTransactions() dentro do objeto DOM (que esvazia as transações) e depois chama a função App.Init() dentro do objeto app a função init vai criar uma nova transação através do innerHTML e montar o <tr> e o <td> no <tbody> com os valores de incomes, expense e total e armazenar no Storage.Set()

// remove (index) : remove as transações de acordo com o index. ou seja. se temos 4 transações temos o index de 0 a 3, se eu removo a primeira transação que tem index 0, a transação que tinha index 1 passa a ter o index 0 a as subsequentes ficam com o index 1 e 2. e o argumento 1 passado no splice(index, 1) diz que vou remover uma transação por vez. depois chama a função reload que permite apagar mais transações e/ou adicionar mis uma transação

// incomes(): avalia se as transações são maiores que 0, e então vai somar o valor do income  (renda)colocado na variável income ao montante de dinheiro que já tinha antes, depois vai retornar (cuspir para fora do escopo) o novo valor do income(renda)

//expense() : avalia se a transação é menor que zero, ou seja, se o saldo é negativo para ser considerado uma despesa) então pega essa despesa e soma ao montante de dinheiro. no caso, soma todas as saídas considerando o amount que é o espaço destinado ao valor em reais das transações adicionadas. OBS.: nesse escopo, ele usou o let para criar a variável, pe ela precisa ser alterada fora do escopo dela também. (mas até aqui não sei onde acorrerá isso) 

// total(): soma as entradas (renda / income) com as saídas (expense / despesas) e retorna esse valor. OBS.: ele usa soma e não a subtração, pq o valor do dado já é negativo, então ele vai juntar o valor da renda (income) com o valor da despesa (expense que é negativo) e esse - (do expense) com esse + (do income) vai resultar em uma subtração. depois disso, vai retornar o novo valor do expense.


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
      // se ela for maior que zero
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
    // coloca + pq o expense já tá com sinal negativo. 
  }
}

// pegar as transações do objeto criado no array transactions e colocar no HTML
// substituir os dados do HTML com os dados do JS

// objeto DOM: é responsável por pegar os elementos HTML e criá-los dentro do <tbody> a cada transação criada pelo usuário. também separa entre incomes ou expenses depois faz a conversão do formato brasileiro para o formato que o local storage entende. depois atualiza os dados e armazena no local Storage. e depois limpa as transações. 

// tem um transactionContainer que eu não sei o que é (função?, objeto?, palavra reservada? ...) que pega lá no HTML o id="data-table" localizado no tbody.

// addTransaction() é uma função criada dentro desse escopo que recebe dois parâmetros(ou seja, vai trabalhar com esses dois valores): o transaction e o index. essa função cria um elemento tr de HTML e armazena na variável tr. depois usa o innerHTML(transaction, index) que é outra função que cria a estrutura HTML da tabela no tbody para adicionar uma nova transação e retorna esse dado como uma string de nome html(minusculo mesmo). então nesse caso o addTransaction, pega esse html e transforma em elementos de estrutura HTML pra criar mais uma linha na tabela com as transações e mostra isso na tela do usuário, essa criação fica armazenada em tr.innerHTML. depois tem o tr.dataset.index que vai adicionar o index dessa nova transação criada para ue se tenha um controle das transações no banco de dados para que seja possível identificar cada transação. Após isso, ele pega o transactionsContainer (que ainda não sei o que é) e coloca na função appendChild() (que deve ser uma função própria do JS) que (por tradução do inglês) vai acrescentar um tr (que é a variável que cria uma tag <tr>)

// innerHTML() : o inner html cria html com o JS. nesse caso, ele recebe a transaction e o index como argumento e verifica se o montante da transação é maior que zero, e se for ele atribui ao income (renda, entrada de dinheiro), se não for maior que zero ele vai entender como expense (despesa, saída de dinheiro, gasto). então aqui é a inteligência do programa entendendo qual é o tipo de entrada de dados que está sendo colocada: recebimento de dinheiro ou despesa. e isso vai ser armazenado na variável CSSclass. a variável amount (montante) armazena o dado contido no objeto Utils na função formatCurrency() que transforma o número em real brasileiro. e passa como argumento o transaction.amount mas não sei pq ele faz isso pq parece não ter nada a ver.. kkk
//depois temos a variável html que cria a estrutura HTML de uma nova transação colocando o td dentro do tr e passando os valores de descrição, montante de dinheiro (positivo ou negativo de acordo com o que o usuário coloca) e a data da transação, além do botão para remover a transação e reajustar o index das transações. posteriormente, esse html é retornado.

// updateBalance() : pega o id das tag p (que mostram o valor em reais da transação) e cria um HTML com o dado modificado para real brasileiro na função Utils.formatCurrency e relaciona isso com o Transaction.incomes(), Transaction.expenses() e Transaction.total() respectivamente, ou seja, relaciona os elementos html com os cálculos feitos nas funções incomes(), expenses() e total() respectivamente para calcular o balanço geral das transações e tornar o programa funcional e para que os valores atualizados sejam mostrados na tela.

// clearTransaction : limpa todas as transações e deixa tudo vazio =  "", ou seja, apaga tudo dentro do #data-table tbody

const DOM = {

  transactionsContainer: document.querySelector('#data-table tbody'),
  
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  /*countTransaction(transaction, index) {
    document.getElementById('idtransactions') = all.length
    
    console.log(all.length); 


    if (addTransaction(transaction, index)) {
      transactionIndex.push(index++)
    } else if (removeTransaction(transaction, index)) {
      transactionIndex = index--
    } else {
      //clearTransactions === "" ? transactionIndex = 0 : indexTransaction;
      transactionIndex = 0
    }

    console.log(index);
    return index
  },*/

  innerHTMLCountTransaction() {
    const transactionsIndex = Transaction.all.length;
    document
      .getElementById("idtransactions")
      .innerHTML = `<p id="idtransactions">${transactionsIndex}</p>`;
    console.log(transactionsIndex);
    return transactionsIndex;
  },

  /*innerHTMLUpdateCountTransaction(index) {
    const transactionsIndex = index.length;
      const update = `<p id="idtransactions">${transactionsIndex}</p>`;
    console.log(transactionsIndex);
    return update;
  },

  contaNUmeroTransação() {
    document
      .getElementById("idtransactions")
      .innerHTML = DOM.innerHTMLUpdateCountTransaction(transactionIndex)
  },*/

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


// objeto Utils: trata os dados recebidos pelo usuário antes de mandar para o local storage, convertendo em dados que façam sentido aqui no Brasil. depois disso, re-transforma tudo em string com caracteres especiais para que possa ser mostrado na tela novamente do jeito correto.

// formatAmount() : pega o valor e transforma em número substituindo os caracteres . e , de forma global por nada "", ou seja, retira todos os caracteres diferentes deixando só o número que foi passado na entrada de dados do valor da transação. depois disso, ele multiplica por 100 para que o dado fique só com os números e que o valor corresponda a um valor em reais com duas casas decimais. Ex.: 5.000,00 (cinco mil)reais fica 500000. depois, esse valor é retornado (cuspido para fora do escopo)

// formatDate:() : quando o dado da data é recebido no console, ele aparece assim: 2022-02-01, para ser armazenado no local storage, precisa que só tenha números. mas esses números não podem ficar todos juntos, precisam ser separados pra considerar ano, mês e dia, nesse caso, a gente separa/divide (splice) esses números a cada - criando um array com várias strings: [2020, 02, 01].mas no Brasil não usamos a data assim, precisa retirar esses - e separar por /, outro ponto é que os dados estão invertidos (ano, mês, dia) nesse caso, precisamos inverter a ondem desses itens dentro do array, por isso ao retornar o dado precisamos pegar ese array e dizer que primeiro queremos o slittedDate na posição [2] do array, depois o [1] e depois o [0]

//formatCurrency() : verifica se o valor passado é menor que zero, se for, ele adiciona um - se não for, não adicionada nada. depois pega esse valor passado e transforma em string e substitui por números sem caracteres especiais. depois disso pega esse valor e transforma em número novamente e divide por 100 (pra que o número que era assim 500000 volte a ficar assim 5.000,00) para que ele apareça na tela depois de ser guardado no banco de dados da maneira correta. E só fica assim, pq o toLocaleString() indica que o dado que será apresentado na tela é o brasileiro do estilo moeda e a moeda é brasileira. então aqui ele tá retransformando o valor em reais para o modelo praticado no brasil. com . e 2 casas decimais após a vírgula. depois ele retorna o sinal (positivo ou negativo e o valor em reais na moeda brasileira)
const Utils = {
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100

    return value

  },

  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    // colocando a data no formato brasileiro e invertendo a ordem da data
  },
  
  formatCurrency(value) {
    //transformando o número em real brasileiro
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


// OBjeto Form : cria o objeto onde vai conter os dados da transação adicionados pelo usuário. e se o usuário escrever errado, dá uma mensagem de erro, ou seja garante que esses dados sejam preenchidos adequadamente. depois pega esses dados já tratados e formatados e coloca dentro do objeto. depois sai chamando as funções que testam se o programa funciona, se não funcionar, exibe o erro
// na primeira parte ele diz que a description, o amount e o date são encontrados no input com os id #description, #amount e #date respectivamente. ele tá pegando aqui pra trabalhar com eles

// getValues() : retorna um objeto com o valor da descrição, do amount e da date dentro do form (Form.description/amount/date.value), ou seja, retorna uma valor pra cada um.


//validateFields() : pega os valores dentro de Form.getValues() e coloca em um objeto dentro do escopo dessa função validateFields(). depois avalia se a descrição o amount e a date forem iguais a zero, ou seja, se estiverem vazios, ele vai capturar o erro e exibir uma mensagem solicitando ao usuário que preencha todos os campos. (ainda não sei pra que funciona esse erro.. ele impede que o programa continue? e saia da janela? é por isso que usamos ele no lugar do alert? pq talvez o alert não vai fazer nada e vai deixar o programa seguir?)

// formatValues() : aqui ele usa um variável que pode ser alterada fora do escopo (let) e ela guarda um objeto com a descrição, amount e date que vem lá do Form.getValues(). ou seja, esse objeto com o {description, amount e date} foi criado aqui e está sendo usado dentro de todo o escopo do objeto Form. por isso eles aparecem lá em cima e dentro do getValues (do nada kkkkk). essa função formatValues() pega os dados formatados de real brasileiro para number e a data formatada com as / / e retorna dentro de um objeto com a descrição, amount e date da transação.

//clearField() : lempa todos os campos de descrição, amount e date. ou seja, apaga os valores colocados

// try / catch (): aqui ele vai fazer vários testes pra ver se o programa funciona corretamente, se não ele vai capturar o erro retornando uma mensagem de erro.
// try (teste) : será assim: 
// submit(event) : o event.preventDefault evita o comportamento padrão, travando a tela, para que ela não saia até que a função validateFields() diga que os campos form preenchidos corretamente.
// ele cria a variável transaction e coloca os valores modificados para o padrão brasileiro em forma de objeto (criado na formatValues()) dentro dessa variável. depois adiciona o objeto contido da variável transaction dentro do objeto Transaction na função add, ou seja, Transaction.add() e com isso, ele salva os valores ali dentro

//form.clearFields() : aqui ele chama a função que apaga os dados da descrição, amount e date 
//Modal.close() : chama a função que fecha o modal, aquela tela nova que aparece quando clica em nova transação

//catch: se der algo errado, ou o usuário não preencher corretamente, exiba uma mensagem de erro.

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
      date.trim() === "") {
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
    //console.log("submit");
    event.preventDefault();
    
    
    try {
      Form.validateFields()
      // verificar se todas as informações foram preenchidas.
      
      const transaction = Form.formatValues()
      
      // salvar
      Transaction.add(transaction)
      
      //apagar os dados do formulário
      Form.clearFields()
      // modal fechar
      Modal.close()
      
    } catch (error) {
      alert(error.message)
    }
    
  },

  numberTransactions() {
    if (Form.submit()) {
      const numero = Transaction.incomes() + Transaction.expenses()
      return numero;
    } 
  }
  
}



//Storage.get()
// dentro do objeto Storage tem as funções get e set. eu quero usar só o get, por isso digo que quero chamar a função get que está dentro do objeto Storage então preciso referenciar primeiro o objeto e depois uso o . pra lincar com a função get, aí fica assim: Storage.get(). por isso os objetos(que são o primeiro nível, são escritas com letra maiúscula pra não confundir) servem para organizar o código em etapas

//Objeto App : é responsável por chamar as funções que iniciam o program e deixam ele pronto pra funcionar 
// init(): tem a função de pegar o objeto Transaction.all (que é onde está sendo armazenado o array com os dados das transações) e adicionando mais uma transação. é a função que é chamada para chamar todas as outras funções que adiciona mais uma transação, guardando os dados no objeto Storage.set dentro do array all que vai guardar o dado em JSON.
// reload () : chama a função clearTransactions que limpa as as transações e depois chama a função init() que deixa o programa pronto para adicionar mais transações novamente. 

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


// App.init() : chama a função init() contida no objeto App que inicia o programa
App.init()



// fim!

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
     equivale a 500,00 reais tem que colocar o valor sem as vírgulas pq depois ai ser formatado adequadamente 
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

// Zé ciço do Tio Gu
// 1- comentar o que cada função faz  -- ok!!!
// 2 - criar mais um card que mostre a quantidade de transações. 