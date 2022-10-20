import IMask from "imask"
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

const securityCode = document.querySelector("#security-code")
const expirationDate = document.querySelector("#expiration-date")
const cardNumber = document.querySelector("#card-number")

const securityPattern = {
  mask: "0000",
}

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2,9]\d|^2[3,7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) => {
      return number.match(regex)
    })
    return foundMask
  },
}

const securityCodeMasked = IMask(securityCode, securityPattern)
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

document
  .querySelector("form")
  .addEventListener("submit", (e) => e.preventDefault())

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", (e) => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText = cardHolder.value || "FULANO DA SILVA"
})

cardNumberMasked.on("accept", () => {
  const ccNumber = document.querySelector(".cc-info .cc-number")
  ccNumber.innerText = cardNumberMasked.value || "1234 5678 9012 3456"
  setCardType(cardNumberMasked.masked.currentMask.cardType)
})

expirationDateMasked.on("accept", () => {
  const ccSecurity = document.querySelector(".cc-extra .cc-expiration .value")
  ccSecurity.innerText = expirationDateMasked.value || "02/32"
})

securityCodeMasked.on("accept", () => {
  const ccSecurity = document.querySelector(".cc-extra .cc-security .value")
  ccSecurity.innerText = securityCodeMasked.value || "123"
})
