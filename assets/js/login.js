let usuario = '';

function entrarSala(){
    alert("teste")

    let nome = document.querySelector('input').value;

    usuario = nome;
    const nomeServ = {
        name: usuario
    }    

    const promesse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeServ);
    promesse.then(entradaNomeCerto);
    promesse.catch(entradaNomeErrado);
}

function entradaNomeCerto(resposta) {
    alert(`${usuario} entou!!`)
    window.location.href='../../entrada.html'
}

function entradaNomeErrado(erro) {
    console.log(erro);
    
    if ( erro.response.status === 400) {
        alert("Nome ja exixte");
        window.location.reload();
        entrarSala();
    }
}

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {    
        var btn = document.querySelector('button');      
      btn.click();    
    }
  });