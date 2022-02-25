import "../css/component.css"
import "../css/component.less"

const compnent = () => {
    const element = document.createElement("h1")

    element.className = "content"

    element.innerHTML = ["Hello", "webpack"].join(" ")

    return element
}

const imgEl = () => {
    const imgEl = new Image()

    imgEl.style.backgroundColor = "red"
    imgEl.style.width = 100 + "vw"
    imgEl.style.height = 800 + "px"
    document.body.style.padding = 0
    document.body.style.margin = 0
    imgEl.src = require("../img/1.jpeg")

    return imgEl
}

document.body.appendChild(compnent())
document.body.appendChild(imgEl())