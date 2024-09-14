const buttonClick = document.querySelector("button");
const resultNode = document.querySelector(".result");

function useRequest(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function(){
        if (xhr.status != 200)
            console.log("Статус ответа " + xhr.status);
        else{
            const result = JSON.parse(xhr.response);
            if (callback)
                callback(result);
        }
    };

    xhr.onerror = function(){
        console.log("Ошибка! Статус ответа " + xhr.status);
    };
    
    xhr.send();
}

function displayResult(apiData) {
    let cards = '';
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

buttonClick.addEventListener("click", () => {
    resultNode.innerHTML = '';
    const inputValue = inputNode.value;
    const url = "https://jsonplaceholder.typicode.com/photos?_limit=" + inputValue;
    if (inputValue > 10 || inputValue < 1){
        resultNode.innerHTML = `<p>Число вне диапазона от 1 до 10</p>`;
    }
    else useRequest(url, displayResult);
})