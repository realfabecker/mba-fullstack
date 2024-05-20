const form = document.querySelector("form")
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// captura o evento de input para formatar o valor 
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, '')

    // conversão de valor para centavos
    value = Number(value) / 100

    // atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

// formatação de valor numérico para moeda corrente
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

// captura evento padrão de envio do formulário
form.onsubmit = (event) => {
    // previne comportamento padrão para recarregamento de página
    event.preventDefault();
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value.toUpperCase().replace("R$", ""),
        created_at: new Date()
    }
    // chama função para inclusão de nova despesa na lista
    expenseAdd(newExpense)
}

// Inclusão de despesa na estrutura da página
function expenseAdd(newExpense) {
    try {
        // cria o elemento para adicionar o item (li) na lista (ul) 
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // cria o ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", `${newExpense.category_name}`)

        // cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // adiciona namo e cateogira nas informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount}`

        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "./img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // adiciona o item na lista de despesas
        expenseList.append(expenseItem)
        
        // limpa formulário para adicionar nova despesa
        formClear();

        // atualiza o grupo de totais de despesas
        updateTotais();
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas")
        console.log(error)
    }
}

function updateTotais() {
    try {
        // recupera todos os itens (li) da lista (ul)
        const items = expenseList.children

        // atualiza quantidade total de itens na lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? " despesas" : "despesa"}`
        
        // variável para o controle do incremento valor
        let total = 0;
        
        for (let i=0; i < items.length; i++){
            const itemAmount = items[i].querySelector(".expense-amount")
            
            // remover caracteres não numéricos
            let value = itemAmount.textContent.replace(/[^\d,]+/g,"").replace(",",".")
            
            // converte para valor decimal
            value = parseFloat(value)
            
            if(isNaN(value)){
                return alert("Não foi possível calcular o total. O valor não parecer ser um número")
            }
            
            total += value
        }
        
        // cria span para rs formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"
        
        // formatação de valor prevendo exibição interface
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
        
        expensesTotal.innerHTML = ""
        
        // adiciona o simbolo de moeda e valor total formatado
        expensesTotal.append(symbolBRL, total)
        
    } catch (e) {
        console.log(e)
        alert("Não foi possível atualizar os totais")
    }
}

// captura eventos para remoção de item de lista
expenseList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-icon")){
        // obtém o li pai do elemento clicado
        const item = event.target.closest(".expense")
        // remove o item da listagem
        item.remove()
        // atualiza grupo totalizador
        updateTotais()
    }
})

function formClear() {
    expense.value = "";
    category.value = "";
    amount.value = "";
    expense.focus()
}