let alunos = [];

document.addEventListener("DOMContentLoaded", function () {
    carrega();

    let btnNovoAluno = document.getElementById("btnNovoAluno");
    let modalNovoAluno = document.getElementById("modalNovoAluno");
    let spanNovoAluno = modalNovoAluno.querySelector(".close");

    btnNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "block";
    };

    spanNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoAluno) {
            modalNovoAluno.style.display = "none";
        }
    };

    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

function identifica(matricula) {
    for (let aluno of alunos) {
        if (aluno.matricula === matricula.id) {
            return aluno;
        }
    }
    return null;
}

function modal(button) {
    let aluno = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    let matriculaModal = modal.querySelector("#matriculaModal");
    let nomeModal = modal.querySelector("#nomeModal");
    let serieModal = modal.querySelector("#serieModal");
    let turmaModal = modal.querySelector("#turmaModal");
    let itnerarioModal = modal.querySelector("#itnerarioModal");
    let mediaNotasModal = modal.querySelector("#mediaNotasModal");
    let btnExcluirAluno = modal.querySelector("#btnExcluirAluno");

    if (!matriculaModal || !nomeModal || !serieModal || !turmaModal || !itnerarioModal || !mediaNotasModal || !btnExcluirAluno) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    matriculaModal.innerHTML = aluno.matricula;
    nomeModal.innerHTML = aluno.nome;
    serieModal.innerHTML = aluno.serie;
    turmaModal.innerHTML = aluno.turma;
    itnerarioModal.innerHTML = aluno.itnerario;
    mediaNotasModal.innerHTML = aluno.mediaNotas;

    btnExcluirAluno.onclick = function () {
        excluirAluno(aluno.matricula);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

function excluirAluno(matricula) {
    alunos = alunos.filter(aluno => aluno.matricula !== matricula);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    carrega();
}

function carrega() {
    let tabela = document.getElementById("carros");
    alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    tabela.innerHTML = "";

    for (let aluno of alunos) {
        let botaoid = `<td><button id='${aluno.matricula}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${aluno.matricula}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.serie}</td>
            <td>${aluno.turma}</td>
            <td>${aluno.itnerario}</td>
            <td>${aluno.mediaNotas}</td>            
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

function cadastrarAluno() {
    let matricula = document.getElementById("matricula").value;
    let nome = document.getElementById("nome").value;
    let serie = document.getElementById("serie").value;
    let turma = document.getElementById("turma").value;
    let itnerario = document.getElementById("itnerario").value;
    let mediaNotas = document.getElementById("mediaNotas").value;

    if (alunoExistente(matricula)) {
        alert("matricula já cadastrada. Insira uma matricula única.");
        return;
    }

    let novoAluno = {
        matricula: matricula,
        nome: nome,
        serie: serie,
        turma: turma,
        itnerario: itnerario,
        mediaNotas: mediaNotas
    };

    alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(novoAluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    carrega();

    modalNovoAluno.style.display = "none";
}

function alunoExistente(matricula) {
    return alunos.some(aluno => aluno.matricula === matricula);
}