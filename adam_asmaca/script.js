const wordsection = document.querySelector('.word')
const boardsection = document.querySelector('.board')
const figure = document.querySelector('.figure')
const letters =
    ["a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "r", "s", "ş", "t", "u", "ü", "v", "y", "z"]
const human = ["head", "body", "rightarm", "leftarm", "rightleg", "leftleg"];

let randomWord = "";
const createkeyboard = () => {
    boardsection.innerHTML = "";
    for (let i = 0; i < letters.length; i++) {
        let square = document.createElement("div");
        square.classList.add("lettersquare");
        square.textContent = letters[i];
        boardsection.appendChild(square);

    }
}

const createWord = () => {
    wordsection.innerHTML = ""
    randomWord = selectWord()
    for (let i = 0; i < 8; i++) {
        let square = document.createElement("div")
        square.classList.add("square")
        square.textContent = randomWord[i]
        wordsection.appendChild(square)
    }
}
const selectWord = () => {
    const word = [
        "beyazlık",
        "yönetici",
        "sağlamak",
        "kazançlı",
        "hisseden",
        "gösterim",
        "hazırlık",
        "tüketici",
        "kazandır",
        "uyumluca",
        "hizmetli",
        "kazanmak",
        "teşekkür"
    ];
    randomWord = word[Math.floor(Math.random() * word.length)];
    console.log(randomWord);
    return (keyWord = Array.from(randomWord));
};


const generatebody = (value) => {
    let bodypart = document.createElement("div")
    bodypart.classList.add(human[value])
    figure.appendChild(bodypart)
}
const startgame = () => {
    createkeyboard();
    createWord();
    let buttons = document.querySelectorAll(".lettersquare")
    let squares = document.querySelectorAll(".square")
    let figuresection = document.querySelectorAll(".figure div")
    let wrongcount = 0
    let correctcount = 0
    figuresection.forEach(item => {
        if (!item.getAttribute("data-value")) item.remove()
    })

    buttons.forEach(item => {
        item.addEventListener("click", (e) => {
            let chosenletter = e.target.textContent
            if (randomWord.includes(chosenletter)) {
                e.target.classList.add("correct")
                squares.forEach(item => {
                    if (item.textContent == chosenletter) {
                        item.classList.add("show");
                        correctcount++;
                    }
                })
                if (correctcount === 8) {
                    buttons.forEach(item => {
                        item.classList.add("close")
                    })
                    squares.forEach(item => {
                        item.style.background = "green"
                    })
                    setTimeout(() => {
                        startgame()
                    }, 3000);
                }

            }
            else {
                e.target.classList.add("wrong")
                wrongcount++

                generatebody(wrongcount - 1)
                if (wrongcount === 6) {
                    buttons.forEach(item => {
                        item.classList.add("close")
                    })
                    squares.forEach(item => {
                        item.classList.add("show")
                        item.style.background = "red"

                    })
                    setTimeout(()=>{
                      startgame();
                    },3000)
                }
            } //else
        })
    })

}
startgame()
