const modalChange = () => {
    change = document.querySelector('.modal-overlay').classList.toggle('active');
    return change;
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criação de Website',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    }
]

const Transaction = {
    incomes() {
        let income = 0;

        transactions.forEach(transaction => {
            if (transaction.amount > 0){
                income += transaction.amount;
            }
        });

        return income;
    },

    expenses() {
        let expense = 0;

        transactions.forEach(transaction => {
            if (transaction.amount < 0){
                expense += transaction.amount;
            }
        });

        return expense;
    },

    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);
        
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="remover transação"></td>
        `

        return html;
    },

    updateBalance(){
        document.querySelector('[data-display-income]').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.querySelector('[data-display-expense]').innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.querySelector('[data-display-total]').innerHTML = Utils.formatCurrency(Transaction.total());
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
}

transactions.forEach(transacao => DOM.addTransaction(transacao));
DOM.updateBalance();

// 1:33:00