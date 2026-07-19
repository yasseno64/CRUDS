let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let categroy = document.getElementById('categroy')
let submit = document.getElementById('submit')

let mood = 'Create'
let tmp;
//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value - +discount.value)
        total.innerHTML = result
        total.style.background = '#040'
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
//create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        categroy:categroy.value.toLowerCase(),
    }
    if(title.value != '' 
    && price.value != '' 
    && categroy.value != ''
    && newPro.count <=1000){
        if(mood === 'Create'){
            if(newPro.count >1 ){
            for(let i =0; i<newPro.count;i++ ){
            dataPro.push(newPro)
        }
    }   else{
        dataPro.push(newPro)
    }

    }
    clearData()
    }else{
        dataPro[ tmp ] = newPro
        mood = 'Create'
        submit.innerHTML = 'Create'
        count.style.display = 'block'
    }

    //save storage

    localStorage.setItem('product', JSON.stringify(dataPro))
    showData()
}
//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    categroy.value= '';
}

//read
function showData(){
    getTotal()
    let table =  '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].categroy}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>       
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML =`
        <button onclick="deleteAll()"> Delete All (${dataPro.length}) </button>`
    }else{
        btnDelete.innerHTML =``
    }
}
showData()

//DELETE
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
function updateData(i){
    title.value =dataPro[i].title
    price.value =dataPro[i].price
    taxes.value =dataPro[i].taxes
    ads.value =dataPro[i].ads
    discount.value =dataPro[i].discount
    getTotal()
    count.style.display ='none'
    categroy.value =dataPro[i].categroy
    submit.innerHTML ='Save'
    mood = 'update'
    tmp = i
    scroll({
        top:0,
        behavior:'smooth',
    })
}

//SEARCH
let searchMode = 'title'

function getSearchMood(id){
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchMode = 'title'
        search.placeholder = 'Search By Title'
    }else{
        searchMode = 'category'
        search.placeholder = 'Search By Category'
    }
    search.focus()
    search.value = ''
    showData()
}

function searchData(value){
    let table = ''
    if(searchMode == 'title'){

        for(let i=0; i<dataPro.length; i++){
            if(dataPro[i].title.includes(value)){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].categroy}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`
                
            }
        }

    }else{
        for(let i=0; i<dataPro.length; i++){
            if(dataPro[i].categroy.includes(value)){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].categroy}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`
                
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//btn scrool
let button = document.getElementById('button')
window.onscroll = () =>{
    if(window.scrollY > 434){
        button.classList.remove('hide');
    }else{
        button.classList.add('hide')
    }
}
button.onclick =() =>{
    window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })
}
