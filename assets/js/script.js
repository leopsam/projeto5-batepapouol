let mensagens =[];
let usuario = '';

pegarMensagens();
entrarSala();
setInterval(pegarMensagens, 3000);
setInterval(manterConexao, 5000);


function pegarMensagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(respostaMsgChegou);
    promessa.catch(respostaMsgErro);

    
}

function respostaMsgChegou(resposta){
    console.log('Resposta das mensagens chegou!!!')
    mensagens = resposta.data
    renderizarMensagem();
}

function respostaMsgErro(){
    console.log('Resposta das mensagens deu ERRO!!!')
}

function manterConexao(){
    const nome = {
        name: "Leonardo Sampaio"
    }

    const promesse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
    promesse.then(manterNomeCerto);
    promesse.catch(manterNomeErrado);
}

function manterNomeCerto(resposta) {
    console.log(`${usuario} continua na sala.`)
    pegarMensagens()
}

function manterNomeErrado(erro) {
    console.log(`${usuario} saiu da sala.`)
}

function entrarSala(){
    const nome = {
        name: "Leonardo Sampaio"
    }
    usuario = nome.name;

    const promesse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
    promesse.then(entradaNomeCerto);
    promesse.catch(entradaNomeErrado);
}

function entradaNomeCerto(resposta) {
    console.log(`${usuario} entou!!`)
    pegarMensagens()
}

function entradaNomeErrado(erro) {
    console.log(erro);
    
    if ( erro.response.status === 400) {
        alert("Nome ja exixte");
    }else{
        alert("ocorreu um erro!");
    }
}

function enviarMensagens(){
    let msg = document.querySelector('.enviar-msg').value;

    let novaMsg = 
        {
            from: usuario,
            to: "Todos",
            text: msg,
            type: "message"
        }


    let promese = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",novaMsg);
    promese.then(enviarMsgDeuCerto);
    promese.catch(enviarMsgDeuErrado);

    renderizarMensagem();
}

function enviarMsgDeuCerto(resposta) {
    console.log(resposta.status)
    console.log("Sua mensagem foi adicionada!")
    pegarMensagens();
}

function enviarMsgDeuErrado(erro) {
    alert("Desconectado!")
    window.location.reload()
}

function renderizarMensagem(){
    const listaMensagens = document.querySelector('main');
    listaMensagens.innerHTML = '';

    for(let i=0; i<mensagens.length; i++){
        let mensagem = mensagens[i];
        listaMensagens.innerHTML +=`
            <div class="msg ${mensagem.type}">
                <time class="item hora">(${mensagem.time})</time>
                <strong class="item usuario">${mensagem.from}</strong>
                <div class="item para">para <strong>${mensagem.to}:</strong></div>
                <div class="item mensagem">${mensagem.text}</div>
            </div>
        `;
    }
    rolarUltima();
}

function rolarUltima(){
    let elementoVisivel = document.querySelectorAll('.msg');
    elementoVisivel = elementoVisivel[elementoVisivel.length-1];
    elementoVisivel.scrollIntoView();
}