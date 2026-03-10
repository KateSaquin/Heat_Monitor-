let simulationInterval = null
let temperature = 35

const tempValue = document.getElementById("tempValue")
const statusText = document.getElementById("statusText")

// Chart setup

const ctx = document.getElementById("tempChart").getContext("2d")

const tempChart = new Chart(ctx,{

type:"line",

data:{
labels:[],
datasets:[{

label:"Temperature °C",

data:[],

borderColor:"#38bdf8",

backgroundColor:"rgba(56,189,248,0.2)",

tension:0.3

}]
},

options:{

scales:{
y:{
beginAtZero:false
}
}

}

})


// AI temperature logic

function checkTemperature(temp){

let status=""

if(temp < 40){

status="Safe"
statusText.className="safe"

}

else if(temp >=40 && temp <45){

status="Warning"
statusText.className="warning"

showAlert("⚠ Warning: Temperature Rising! Monitor Your Pet Closely!")

}

else{

status="Danger"
statusText.className="danger"

showAlert("🚨 Danger! Temperature Too High! CHECK YOUR PET IMMEDIATELY!")

}

statusText.innerText=status

}



function showAlert(message){

const popup=document.createElement("div")

popup.innerText=message

popup.style.position="fixed"
popup.style.bottom="20px"
popup.style.right="20px"

popup.style.background="#ef4444"

popup.style.padding="15px"

popup.style.borderRadius="10px"

popup.style.color="white"

popup.style.boxShadow="0 5px 20px rgba(0,0,0,0.5)"

document.body.appendChild(popup)

setTimeout(()=>{

popup.remove()

},3000)

}



function updateChart(temp){

const time=new Date().toLocaleTimeString()

tempChart.data.labels.push(time)

tempChart.data.datasets[0].data.push(temp)

if(tempChart.data.labels.length>12){

tempChart.data.labels.shift()

tempChart.data.datasets[0].data.shift()

}

tempChart.update()

}



function simulateTemperature(){

temperature += (Math.random()*4 -2)

temperature=Math.max(30,Math.min(55,temperature))

tempValue.innerText=temperature.toFixed(1)

checkTemperature(temperature)

updateChart(temperature)

}



function startSimulation(){

if(simulationInterval !== null) return

simulationInterval=setInterval(()=>{

simulateTemperature()

},2000)

}



function stopSimulation(){

if(simulationInterval !== null){

clearInterval(simulationInterval)

simulationInterval=null

}

}