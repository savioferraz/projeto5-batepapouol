// Variáveis globais
let name;
let mensagens = [];

// Conexão com o servidor
// const promiseParticipants = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
// const promiseStatus = axios.get("https://mock-api.driven.com.br/api/v6/uol/status");
const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
// promiseParticipants.then(processarRespostaParticipants);
// promiseStatus.then(processarRespostaStatus);
promise.then(processarResposta);

// Teste de requisição servidor
// function processarRespostaParticipants(respostaParticipants){
//     console.log("Voltou a resposta 'participants'");
// }
// function processarRespostaStatus(respostaStatus){
//     console.log("Voltou a resposta 'status'");
// }
function processarResposta(resposta){
    console.log("Requisição retornada com sucesso");
    console.log(resposta.data);
    mensagens = resposta.data;
    renderizarMensagens();
}
console.log("Enviou requisição");

// Renderizar mensagens
function renderizarMensagens() {
    const ul = document.querySelector(".content");
    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[i].type == "status") {
        ul.innerHTML += `<li class="status"><div class="timeStamp">${mensagens[i].time}</div><div class="from">${mensagens[i].from}</div></div>${mensagens[i].text}</li>`
        ul.scrollIntoView();
        }
        if (mensagens[i].type == "message") {
            ul.innerHTML += `<li class="msgs"><div class="timeStamp">${mensagens[i].time}</div><div class="from">${mensagens[i].from}</div>para<div class="to">${mensagens[i].to}</div>${mensagens[i].text}</li>`
        }
    }
    
}