import "./css/index.css"

const creditCardBgColorPrimary = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
)
const creditCardBgColorSecondary = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
)
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["#000000", "#CCCCCC"],
  }

  const [primary, secondary] = colors[type]
  const logoSvg = `cc-${type}.svg`

  creditCardBgColorPrimary.setAttribute("fill", primary)
  creditCardBgColorSecondary.setAttribute("fill", secondary)
  creditCardLogo.setAttribute("src", logoSvg)
}

globalThis.setCardType = setCardType
