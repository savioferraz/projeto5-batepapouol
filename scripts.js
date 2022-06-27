// Variáveis globais
let mensagens = [];
let usuario;
let usuariosOn = [];

// Cadastrar usuário
function entrarSala () {
    nomeUsuario = document.querySelector("input").value
    usuario = {name: nomeUsuario}
    const requisiçãoEntrar = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
    setInterval(manterConexao, 5000);
    requisiçãoEntrar.then(entradaLiberada);
    requisiçãoEntrar.catch(entradaErro);
    setInterval(renderizarMensagens, 3000);
}
function entradaLiberada() {
    alert ("Seja bem vindo ao bate-papo Driven!");
    document.querySelector(".telaLogin").classList.add("escondido");
    listarMensagens();
}
function entradaErro () {
    alert ("Nome de usuario inválido ou em uso. Tente outro nome.");
    // entrarSala();
    return;
}

// Conexão com o servidor
function listarMensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(processarResposta);
}
function processarResposta(resposta){
    mensagens = resposta.data;
    renderizarMensagens();
}

// Manter conexão
function manterConexao() {
    const online = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario);
    online.then(listarMensagens);
}

// Renderizar mensagens
function renderizarMensagens() {
    const ul = document.querySelector(".content");
    ul.innerHTML = "";
    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[i].type == "status") {
        ul.innerHTML += `<li class="status x"><div class="timeStamp">${mensagens[i].time}</div><div class="from">${mensagens[i].from}</div></div>${mensagens[i].text}</li>`
        ul.scrollIntoView();
        }
        if (mensagens[i].type == "message") {
            ul.innerHTML += `<li class="msgs x"><div class="timeStamp">${mensagens[i].time}</div><div class="from">${mensagens[i].from}</div>para<div class="to">${mensagens[i].to}</div>${mensagens[i].text}</li>`
        }
    const ultimaMensagem = document.querySelector(".x:last-child");
    ultimaMensagem.scrollIntoView();
    }
}

// Enviar mensagens
function enviarMensagens () {
    texto = document.querySelector(".areatexto").value;
    const mensagemEnviada = {
        from: `${usuario.name}`, 
        to: "Todos", 
        text: texto, 
        type: "message"
    };
    const requisiçãoEnviar = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemEnviada);
    requisiçãoEnviar.then(renderizarMensagens);
    requisiçãoEnviar.catch(envioErro);
    document.querySelector(".areatexto").value = "";
}

function envioErro(erro) {
    statusCode = erro.response.status;
    alert (`Opa! Algo deu errado...
Erro ${statusCode}`);
}

// Mostrar/ocultar barra lateral com usuários online
function mostrarOcultar() {
    document.querySelector(".listaUsuarios").classList.toggle("escondido");
    const requisitarUsuarios = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    requisitarUsuarios.then(popularListaUsuarios);
}
function popularListaUsuarios(listaUsuarios) {
    usuariosOn = listaUsuarios.data
    document.querySelector(".usuariosOnline").innerHTML = "";
    for (let i = 0; i < usuariosOn.length; i++) {
        document.querySelector(".usuariosOnline").innerHTML += `<li onclick="mostrarOcultar()">
        <ion-icon name="person-circle"></ion-icon>
        <p>${usuariosOn[i].name}</p>
    </li>`
    }
}