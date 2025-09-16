// Seleciona o form
const form = document.querySelector("form");

// Função principal de validação e envio
function validarFormulario(event) {
    event.preventDefault(); // Impede o envio padrão do form

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const profissao = document.getElementById("profissao");
    const nascimento = document.getElementById("nascimento");

    let erros = [];

    // Valida campo nome
    if (nome.value.trim() === "") {
        erros.push("O campo Nome é obrigatório!");
    } else if (!validarNome(nome.value)) {
        erros.push("Nome está inválido!");
    }

    // Valida campo email
    if (email.value.trim() === "") {
        erros.push("O campo E-mail é obrigatório!");
    } else if (!validarEmail(email.value)) {
        erros.push("E-mail inválido!");
    }

    // Valida campo nascimento
    if (nascimento.value.trim() === "") {
        erros.push("O campo Data de Nascimento é obrigatório!");
    } else if (!validarNascimento(nascimento.value)) {
        erros.push("Data de nascimento inválida!");
    }

    // Valida campo profissao
    if (profissao.value.trim() === "") {
        erros.push("O campo Profissão é obrigatório!");
    } else if (!validarProfissao(profissao.value)) {
        erros.push("Profissão inválida!");
    }

    // Se tiver erro, exibe alerta e não envia
    if (erros.length > 0) {
        alert(erros.join("\n"));
        return;
    }

    // Se passou, mostra sucesso e limpa form
    alert("Formulário enviado com sucesso!");
    form.reset();
}

// Função auxiliar para validar formato do email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

// Função auxiliar para validar formato do nome
function validarNome(nome) {
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return regexNome.test(nome.trim());
}

// Função auxiliar para validar formato da profissao
function validarProfissao(profissao) {
    const regexProfissao = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return regexProfissao.test(profissao.trim());
}

// Função auxiliar para validar data de nascimento
function validarNascimento(nascimentoValue) {
    if (!nascimentoValue) return false;

    const dataNasc = new Date(nascimentoValue);
    if (Number.isNaN(dataNasc.getTime())) return false; // data inválida

    const hoje = new Date();
    dataNasc.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    // Não permite datas no futuro
    if (dataNasc > hoje) return false;

    // Idade mínima: 18 anos
    const idadeMinima = 18;
    const dataMinima = new Date();
    dataMinima.setFullYear(dataMinima.getFullYear() - idadeMinima);
    if (dataNasc > dataMinima) return false;

    // Idade máxima: 120 anos
    const idadeMaxima = 120;
    const dataMaxima = new Date();
    dataMaxima.setFullYear(dataMaxima.getFullYear() - idadeMaxima);
    if (dataNasc < dataMaxima) return false;

    return true;
}

// Adiciona o listener de submit
form.addEventListener("submit", validarFormulario);
