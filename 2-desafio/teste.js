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

const all = [3, 4, 6, 7];

const teste = {
  
  /* innerHTMLCountTransaction(all) { 
     const transactionsIndex = all.length
     const transactionsI = document.getElementById("idtransactions").innerHTML = `<p id=idtransactions onclick="countTransaction()">${transactionsIndex}</p>`
     
     return transactionsI
     
   }*/
  
  innerHTMLCountTransaction(){
    const transactionsIndex = teste.all.length
    document
      .getElementById("idtransactions")
      .innerHTML = `<p id=idtransactions onsubmit="innerHTMLCountTransaction()">${transactionsIndex}</p>`
    
    return transactionsIndex;
  }
  

}


  
console.log(transactionsIndex);

/*
innerHTMLCountTransaction(all) {
    const transactionsIndex = all.length;
    const transactionsI = document.getElementById("idtransactions").innerHTML = `<p id="idtransactions">${transactionsIndex}</p>`;
    console.log(transactionsI);
    return transactionsI;
  },

numberTransactions() {
    if (Form.submit()) {
      const numero = Transaction.incomes() + Transaction.expenses()
      return numero;
    } 
  }*/