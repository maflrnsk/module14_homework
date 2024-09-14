const buttonSubmit = document.querySelector("button");
const resultNode = document.querySelector(".result");

function useRequest(url){
    fetch(url)
        .then((response) => resultNode.innerHTML = `<img src="${url}">`)
        .catch(() => console.log("error"))
}

buttonSubmit.addEventListener("click", () =>{
    resultNode.innerHTML = "";
    const inputNumber1 = document.getElementById("input1").value;
    const inputNumber2 = document.getElementById("input2").value;
    if (inputNumber1 < 100 || inputNumber1 > 300 | inputNumber2 < 100 || inputNumber2 > 300 || isNaN(inputNumber1) || isNaN(inputNumber2)){
        resultNode.innerHTML = `<p>Одно из чисел вне диапазона от 100 до 300</p>`
    }
    else{
        const url = `https://dummyimage.com/${inputNumber1}x${inputNumber2}/`;
        useRequest(url);
    }
})