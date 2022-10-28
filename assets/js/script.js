let mensagens =[];

function pegarMensagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(respostaChegou);
    promessa.catch(erro);
}

pegarMensagens();

function respostaChegou(resposta){
    console.log('Resposta chegou!!!')
    mensagens = resposta.data
    console.log(mensagens)
    renderizarMensagem();
}

function erro(){
    console.log('Resposta deu ERRO!!!')
}

function addMensagens(){

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

    console.log(listaMensagens);
}