const devices = document.querySelectorAll("[data-device]")
const potencia = document.querySelector("#potencia")
const calcularButton = document.querySelector("#calcular")
const dropdown = document.querySelector(".dropdown-content")

const DEVICE_LIST = 
[{
    name: "Placa elétrica",
    power: 1.35
},{
    name: "Máquina de Café",
    power: 1.2
},{
    name: "Frigorífico",
    power: 0.15
},{
    name: "Máquina da louça",
    power: 1.125
},{
    name: "Aspirador",
    power: 1.6
},{
    name: "Televisão",
    power: 0.12
},{
    name: "Aparelhagem de som",
    power: 0.06
},{
    name: "Computador",
    power: 0.3
},{
    name: "Impressora a laser",
    power: 0.8
},{
    name: "Secador de cabelo",
    power: 1.5
},{
    name: "Radiador",
    power: 2.0
}]

var DEVICE_NAME = undefined
var POWER = null
var TIME = null
var PRICE_KWH = null

devices.forEach(d => {
    d.addEventListener("click", e => {
        DEVICE_NAME = e.target.textContent
        POWER = DEVICE_LIST.find(x => x.name == DEVICE_NAME).power

        potencia.value = POWER*1000
    })
})

calcularButton.addEventListener("click", e => {
    TIME = document.querySelector("#tempo").value
    PRICE_KWH = document.querySelector("#preco").value
    POWER = document.querySelector("#potencia").value

    if(POWER && TIME && PRICE_KWH) {
        const KWH = POWER * TIME / 1000
        const PRICE = KWH * PRICE_KWH
        const KWH_STRING = KWH.toFixed(2)
        const PRICE_STRING = PRICE.toFixed(2)

        const resultsDiv = document.querySelector("#results")
        resultsDiv.style.display = "flex"

        resultsDiv.innerHTML = `
        <table>
            <tr>
                <th>Tempo</th>
                <th>Consumo</th>
                <th>Preço</th>
            </tr>
            <tr>
                <td>Diário</td>
                <td>${(KWH_STRING*1).toFixed(2)} kWh</td>
                <td>${(PRICE_STRING*1).toFixed(2)} €</td>
            </tr>
            <tr>
                <td>Semanal</td>
                <td>${(KWH_STRING*7).toFixed(2)} kWh</td>
                <td>${(PRICE_STRING*7).toFixed(2)} €</td>
            </tr>
            <tr>
                <td>Mensal</td>
                <td>${(KWH_STRING*30).toFixed(2)} kWh</td>
                <td>${(PRICE_STRING*30).toFixed(2)} €</td>
            </tr>
            <tr>
                <td>Anual</td>
                <td>${(KWH_STRING*365).toFixed(2)} kWh</td>
                <td>${(PRICE_STRING*365).toFixed(2)} €</td>
            </tr>
        </table>
        `

        setTimeout(() => {
            resultsDiv.style.opacity = `100%`
        }, 1)

        resultsDiv.scrollIntoView()
        

    } else {
        alert("Preencha todos os campos")
    }

})

/*

    Potência: kW
    Tempo (diário): h
    Preço: €

    Energia = P*t
    Custo = energia * preço (*30 mensal, *365 anual)

*/

//https://goldenergy.pt/blog/poupanca/tabela-consumo-energia-eletrodomesticos/
