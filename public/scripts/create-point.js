function populeteUFs () {
    const ufselect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json())
    .then( states => {
       for (const state of states) {
        ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
       }
    })
}

populeteUFs ()

function getCities (event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res =>  res.json())
    .then( cities => {
       for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
       }

       citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// Ítens de coleta
// Pegar todos os li`s

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const items of itemsToCollect) {
    items.addEventListener("click",hendleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function hendleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
   
    console.log('ITEM ID: ', itemId)
    
    // Veerificar se existe itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId //isso sera um true ou falce
        return itemFound
    })

    // Se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent 
        })
        selectedItems = filteredItems
    } else {
       // Se não estiver selecionado
       // adicionar à seleção  
       selectedItems.push(itemId)
    }
   
    console.log('selectedItems: ', selectedItems)

    // Atualizar o campo escondido co os itens selecionados
    collectedItems.value = selectedItems
}