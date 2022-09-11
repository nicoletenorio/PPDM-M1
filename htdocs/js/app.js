const container = document.querySelector(".container");
var quantidadeTotalAgua;
var quantidadeAguaPorHora;
var quantidadeTotalHora;

function definePorcentagem(){
  let porcentagemAguaAtual = 0;
  let progressBar = document.getElementById('progress');

  //Obtem valores no storage
  let total = parseFloat(window.localStorage.getItem('quantidadeTotalAgua'));
  let quantidadeBebida;
  
  if(window.localStorage.getItem('quantidadeAguaBebida') != null){
    quantidadeBebida = parseFloat(window.localStorage.getItem('quantidadeAguaBebida'));
  }else{
    quantidadeBebida = 0;
  }
  
  let quantidadePorVez = parseFloat(window.localStorage.getItem('quantidadeAguaPorHora'));
  
  //Calcua percentual
  quantidadeBebida = (quantidadeBebida + quantidadePorVez);
  if(quantidadeBebida <= total){
    porcentagemAguaAtual = (quantidadeBebida * 100) / total;
    //Define percentual na progressBar
    progressBar.setAttribute('style','--porcentagem: ' + porcentagemAguaAtual + '%;');
    localStorage.setItem('quantidadeAguaBebida',quantidadeBebida);
  }else{
    progressBar.setAttribute('style','--porcentagem: ' + 100 + '%;');
    localStorage.setItem('quantidadeAguaBebida',quantidadeBebida);
  }
}

async function defineNotificacao(){
  let horaInico = localStorage.getItem('horaInicio');
  let horaFim = localStorage.getItem('horaFim');
  let usuario = localStorage.getItem('usuario');

  if (horaInico == null & horaFim == null & usuario == null ){
    let progressBar = document.getElementById('progress');
    progressBar.setAttribute('style','--porcentagem: 0%;');
    localStorage.setItem('quantidadeAguaBebida',0);
    window.location.href='index.html';  
  }else{
    let mensagem = 'Olá, ' + localStorage.getItem('usuario') + ' você precisa beber ' + localStorage.getItem('quantidadeAguaPorHora') + 'ml'
    let bebeuAgua = false;
    while(!bebeuAgua){
      var currentTime = new Date();
      
      let horaInico = localStorage.getItem('horaInicio').split(":")[0];
      let horaFim = localStorage.getItem('horaFim').split(":")[0];
      
      let minutoInico = localStorage.getItem('horaInicio').split(":")[1];
      let minutoFim = localStorage.getItem('horaFim').split(":")[1];

      if(
          (currentTime.getHours() > parseInt(horaFim)) || ((currentTime.getHours() == parseInt(horaFim)) & (currentTime.getMinutes() > parseInt(minutoFim)))
      ){
        let progressBar = document.getElementById('progress');
        progressBar.setAttribute('style','--porcentagem: 0%;');
        localStorage.setItem('quantidadeAguaBebida',0);
        bebeuAgua = true;
      }else if(
        (currentTime.getHours() > parseInt(horaInico)) || (currentTime.getHours() == parseInt(horaInico) & (currentTime.getMinutes() > parseInt(minutoFim)))
      ){
        geraNotificao(mensagem);
      }
      await sleep(60000);
    }
  }
}

async function geraNotificao(mensagem){
  const registration = await navigator.serviceWorker.getRegistration();

  const sendNotification = async () => {
    if(Notification.permission === 'granted') {
      showNotification(mensagem);
      //showNotification('Olá, ' + localStorage.getItem('usuario') + ' você precisa beber ' + localStorage.getItem('quantidadeAguaPorHora') + 'ml');
    }
    else {
      if(Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
    
        if(permission === 'granted') {
          showNotification(mensagem);
          //showNotification('Olá, ' + localStorage.getItem('usuario') + ' você precisa beber ' + localStorage.getItem('quantidadeAguaPorHora') + 'ml');
        }
      }
    }
    };
    
    const showNotification = body => {
    const title = 'É importante beber agua';
    
    const payload = {
      body
    };
    
    if('showNotification' in registration) {
      registration.showNotification(title, payload);
    }
    else {
      new Notification(title, payload);
    }
  };
  sendNotification();
}

function salvaHora(){
  const init = document.getElementById("apptini").value;
  const end = document.getElementById("apptfim").value;
  window.localStorage.setItem('horaInicio', init);
  window.localStorage.setItem('horaFim', end);
}

///Define tempo útil a qual o app vai estourar a mensagem
function calcularTempoUtil() {
  // Pega os dois inputs do tipo time.
  const init = document.getElementById("apptini");
  const end = document.getElementById("apptfim");

  const minutosFinal = parseFloat((end.value.split(":")[0]*60))+parseFloat(end.value.split(":")[1]);
  const minutosInicial = parseFloat((init.value.split(":")[0]*60))+parseFloat(init.value.split(":")[1]);

  const diferencaHoras = (minutosFinal - minutosInicial)/60;
  quantidadeTotalHora = diferencaHoras;
  window.localStorage.setItem('quantidadeTotalHora', quantidadeTotalHora);
}

function salvaUsuario(){
  const name = document.getElementById("name").value;
  window.localStorage.setItem('usuario', name);
}

//Define quantide de agua a ser bebida
function calcularQuantidadeAgua(){
  const peso = document.getElementById("peso").value;
  const taxaAguaPorQuilo = 0.035;
  localStorage.setItem('quantidadeAguaBebida',0);
  quantidadeTotalAgua = (peso * taxaAguaPorQuilo)*1000;
  window.localStorage.setItem('quantidadeTotalAgua', quantidadeTotalAgua);
}

function calculaQuantidadeAguaPorHora(){
  quantidadeAguaPorHora = parseInt((quantidadeTotalAgua / quantidadeTotalHora))
  window.localStorage.setItem('quantidadeAguaPorHora', quantidadeAguaPorHora);
}

function salvarDados(){
  salvaUsuario();
  salvaHora();
  calcularTempoUtil();
  calcularQuantidadeAgua();
  calculaQuantidadeAguaPorHora();  
  window.location.href='home.html';  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
