

let mensagens =[];
let participantes = [];
let para = 'Todos'
let tipo = 'message'
let tipoTexto = '';

buscarParticipantes();
pegarMensagens();
setInterval(pegarMensagens, 3000);
setInterval(manterConexao, 5000);
setInterval(buscarParticipantes, 10000);


function pegarMensagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(respostaMsgChegou);
    promessa.catch(respostaMsgErro);

    
}

function respostaMsgChegou(resposta){
    //console.log('Resposta das mensagens chegou!!!')
    mensagens = resposta.data
    renderizarMensagem();
}

function respostaMsgErro(){
    console.log('Resposta das mensagens deu ERRO!!!')
}

function manterConexao(){
    let nome = {
        name: usuario
    }

    const promesse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
    promesse.then(manterNomeCerto);
    promesse.catch(manterNomeErrado);
}

function manterNomeCerto(resposta) {
    //console.log(`${usuario} continua na sala.`)
    pegarMensagens()
}

function manterNomeErrado(erro) {
    console.log(`${usuario} saiu da sala.`)
}

function enviarMensagens(){
    let msg = document.querySelector('.enviar-msg').value;

    let novaMsg = 
        {
            from: usuario,
            to: para,
            text: msg,
            type: tipo
        }


    let promese = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",novaMsg);
    promese.then(enviarMsgDeuCerto);
    promese.catch(enviarMsgDeuErrado);

    renderizarMensagem();
}

function enviarMsgDeuCerto(resposta) {
    pegarMensagens();
    console.log(resposta.status)
    console.log("Sua mensagem foi adicionada!")    
    let zerarImput = document.querySelector("input")
    zerarImput.value = ""
}

function enviarMsgDeuErrado(erro) {
    alert("Desconectado!")
    window.location.reload();
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

function botaoContatos(){
    const botao1 = document.querySelector('aside');
    const botao2 = document.querySelector('.fundo');
    console.log(botao1)
    console.log(botao2)
    botao1.classList.toggle('esconde')
    botao2.classList.toggle('esconde')
}

function buscarParticipantes(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(participantesOk);
}

function participantesOk(elemento){
    
    participantes = elemento.data;

    const listaUsuarios = document.querySelector('.user');
    listaUsuarios.innerHTML = `
    <div onclick="check(this)" class="item" data-identifier="participant">
        <img src="assets/img/people.svg" />
        <p>Todos</p>
    </div>
    `;

    for(let i=0; i<participantes.length; i++){
        let userOn = participantes[i];

        if(userOn.name != usuario){
            listaUsuarios.innerHTML +=`
            <div onclick="check(this)" class="item" data-identifier="participant">
                <img src="assets/img/user.svg" />
                <p>${userOn.name}</p>
            </div>
            `;
        }
    }
}

function check(pessoa){
    const jaSelecionado = document.querySelector('.user .selecionado')
    if(jaSelecionado !== null){
        jaSelecionado.classList.remove('selecionado');
    }
    pessoa.classList.add('selecionado');

    let pessoaVar = pessoa.querySelector('p')
    para = pessoaVar.innerHTML

    mostrandoDestino();
}

function checkTipo(tipoTela){
    const jaSelecionado = document.querySelector('.tipoMsg .selecionado')
    if(jaSelecionado !== null){
        jaSelecionado.classList.remove('selecionado');
    }
    tipoTela.classList.add('selecionado');
    
    let tipoVar = tipoTela.querySelector('p')
    

    if(tipoVar.innerHTML === 'Público'){
        tipo = 'message'
        tipoTexto = 'Público'
    }else if(tipoVar.innerHTML === 'Reservadamente'){
        tipo = 'private_message'
        tipoTexto = 'Reservadamente'
    }

    mostrandoDestino();
}

function mostrandoDestino(){
    let destino = document.querySelector('.user-check')
    destino.innerHTML = para

    console.log(destino)

    let tipoGarda = document.querySelector('.tipo-check')
    tipoGarda.innerHTML = `(${tipoTexto})`

    console.log(tipoTexto)

}

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {    
        var btn = document.querySelector('.botao');      
      btn.click();    
    }
  });