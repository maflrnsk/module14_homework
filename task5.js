const inputPage = document.getElementById("page");
const inputLimit = document.getElementById("limit");
const buttonRequest = document.getElementById("request");
const resultNode = document.querySelector(".result");
let result = "";

if (localStorage.getItem("myJSON")){
    result = JSON.parse(localStorage.getItem("myJSON"));
    displayResult(result);
}

function useRequest(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = function(){
        if (xhr.status != 200){
            console.log("Статус ответа ", xhr.status);
        }
        else{
            result = JSON.parse(xhr.response);
            localStorage.setItem("myJSON", JSON.stringify(result));
            if (callback)
                callback(result);
        }
    }

    xhr.onerror = function(){
        console.log("Ошибка! Статус ответа ", xhr.status);
    }
    xhr.send();
}

function displayResult(apiData){
    let cards = "";
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img
                src="${item.thumbnailUrl}"
                class="card-image"
            />
            <p>${item.title}</p>
        </div>
    `;
    cards += cardBlock;
    });
    resultNode.innerHTML = cards;
}

buttonRequest.addEventListener("click", () =>{
    resultNode.innerHTML = "";
    const pageBoolean = inputPage.value < 1 || inputPage.value > 10 || isNaN(inputPage.value);
    const limitBoolean = inputLimit.value < 1 || inputLimit.value > 10 || isNaN(inputLimit.value);
    if (pageBoolean && limitBoolean){
        resultNode.innerHTML = `<p>Номер страницы и лимит вне диапазона от 1 до 10</p>`
    }
    else if (pageBoolean){
        resultNode.innerHTML = `<p>Номер страницы вне диапазона от 1 до 10</p>`
    }
    else if (limitBoolean){
        resultNode.innerHTML = `<p>Лимит вне диапазона от 1 до 10</p>`
    }
    else {
        const url = `https://jsonplaceholder.typicode.com/photos?_page=${inputPage.value}&_limit=${inputLimit.value}`;
        useRequest(url, displayResult);
    }
})