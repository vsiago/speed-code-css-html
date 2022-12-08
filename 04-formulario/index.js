'use-strict';

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('numero').value
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}

const eNumero = (numero) => /^[0-9]+$/.test(numero)
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')) {
           const endereco = document.getElementById('endereco')
           endereco.value = 'CEP não encontrado'
           document.getElementById('bairro').value = ''
           document.getElementById('cidade').value = ''
           document.getElementById('estado').value = ''
        } else {
            preencherFormulario(endereco)
        }
    } else {
        endereco.value = 'CEP incorreto!!'
        document.getElementById('bairro').value = ''
        document.getElementById('cidade').value = ''
        document.getElementById('estado').value = ''
    }
}


document.getElementById('cep').addEventListener('focusout', pesquisarCep);
