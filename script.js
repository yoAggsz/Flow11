
const menuInicial = document.getElementById("menuInicial");
const menuModos = document.getElementById("menuModos");
const menuTipos = document.getElementById("menuTipos");
const menuChampions = document.getElementById("menuChampions");

const btnIniciar = document.getElementById("btnIniciar");
const btnClassico = document.getElementById("btnClassico");
const btnAmigos = document.getElementById("btnAmigos");
const btnCopa = document.getElementById("btnCopa");
const btnChampions = document.getElementById("btnChampions");
const btnCarreira = document.getElementById("btnCarreira");

const btnRoletar = document.getElementById("btnRoletar");
const equipeSorteada = document.getElementById("equipeSorteada");
const listaJogadores = document.getElementById("listaJogadores");
const meuTime = document.getElementById("meuTime");

const equipes = [
    "Bastard München",
    "PXG",
    "Manshine City",
    "FC Barcha",
    "Ubers"
];

const jogadoresPorEquipe = {
    "Bastard München": [
        { nome: "Noel Noa", overall: 100 },
        { nome: "Michael Kaiser", overall: 98 },
        { nome: "Alexis Ness", overall: 92 },
        { nome: "Yoichi Isagi", overall: 88 },
        { nome: "Rensuke Kunigami", overall: 85 },
        { nome: "Kenyu Yukimiya", overall: 84 },
        { nome: "Yo Hiori", overall: 83 },
        { nome: "Gin Gagamaru", overall: 82 },
        { nome: "Ranze Kurona", overall: 80 },
        { nome: "Erik Gesner", overall: 80 },
        { nome: "Benedict Grim", overall: 85 }
    ],

    "PXG": [
        { nome: "Julian Loki", overall: 99 },
        { nome: "Rin Itoshi", overall: 96 },
        { nome: "Ryusei Shidou", overall: 94 },
        { nome: "Charles Chevalier", overall: 87 },
        { nome: "Tabito Karasu", overall: 86 },
        { nome: "Aoshi Tokimitsu", overall: 83 },
        { nome: "Jyubei Aryu", overall: 82 },
        { nome: "Zantetsu Tsurugi", overall: 80 },
        { nome: "Jin Kiyora", overall: 79 },
        { nome: "Nijiro Nanase", overall: 77 },
        { nome: "Haru Hayate", overall: 75 }
    ]
};

let timeEscolhido = [];
let equipeAtual = null;
let aguardandoEscolha = false;

btnIniciar.addEventListener("click", function () {
    menuInicial.hidden = true;
    menuModos.hidden = false;
});

btnClassico.addEventListener("click", function () {
    menuModos.hidden = true;
    menuTipos.hidden = false;
});

btnAmigos.addEventListener("click", function () {
    alert("Modo Com Amigos selecionado!");
});

btnCopa.addEventListener("click", function () {
    alert("Modo Copa selecionado!");
});

btnCarreira.addEventListener("click", function () {
    alert("Modo Carreira selecionado!");
});

btnChampions.addEventListener("click", function () {
    menuTipos.hidden = true;
    menuChampions.hidden = false;

    timeEscolhido = [];
    equipeAtual = null;
    aguardandoEscolha = false;

    atualizarMeuTime();
    listaJogadores.innerHTML = "";

    equipeSorteada.textContent =
        "Clique em RODAR ROLETA para sortear uma equipe.";

    btnRoletar.disabled = false;
});

btnRoletar.addEventListener("click", function () {
    // Impede uma nova roleta antes de escolher um jogador.
    if (aguardandoEscolha) {
        return;
    }

    // Impede continuar depois de completar o time.
    if (timeEscolhido.length >= 11) {
        equipeSorteada.textContent = "TIME COMPLETO!";
        btnRoletar.disabled = true;
        return;
    }

    roletarEquipe();
});

function roletarEquipe() {
    const numeroAleatorio = Math.floor(
        Math.random() * equipes.length
    );

    equipeAtual = equipes[numeroAleatorio];
    aguardandoEscolha = true;

    equipeSorteada.textContent =
        "Equipe sorteada: " + equipeAtual +
        " — escolha um jogador!";

    btnRoletar.disabled = true;

    mostrarJogadores(equipeAtual);
}

function mostrarJogadores(equipe) {
    listaJogadores.innerHTML = "";

    const jogadores = jogadoresPorEquipe[equipe];

    if (!jogadores || jogadores.length === 0) {
        listaJogadores.textContent =
            "O elenco desta equipe ainda não foi cadastrado.";

        // Libera a roleta para que seja possível continuar.
        aguardandoEscolha = false;
        btnRoletar.disabled = false;
        return;
    }

    jogadores.forEach(function (jogador) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent =
            jogador.nome + " — OVR " + jogador.overall;

        const jaEscolhido = timeEscolhido.some(function (escolhido) {
            return escolhido.nome === jogador.nome;
        });

        if (jaEscolhido) {
            botao.disabled = true;
            botao.textContent += " — JÁ ESCOLHIDO";
        }

        botao.addEventListener("click", function () {
            escolherJogador(jogador);
        });

        listaJogadores.appendChild(botao);
    });
}

function escolherJogador(jogador) {
    if (!aguardandoEscolha || timeEscolhido.length >= 11) {
        return;
    }

    const jaEscolhido = timeEscolhido.some(function (escolhido) {
        return escolhido.nome === jogador.nome;
    });

    if (jaEscolhido) {
        alert("Você já escolheu esse jogador!");
        return;
    }

    timeEscolhido.push({
        nome: jogador.nome,
        overall: jogador.overall,
        equipe: equipeAtual
    });

    aguardandoEscolha = false;
    atualizarMeuTime();

    if (timeEscolhido.length >= 11) {
        equipeSorteada.textContent =
            "TIME COMPLETO! Você escolheu 11 jogadores.";

        listaJogadores.innerHTML = "";
        btnRoletar.disabled = true;
        return;
    }

    // Mostra a escolha e sorteia a próxima equipe automaticamente.
    equipeSorteada.textContent =
        jogador.nome + " escolhido! Sorteando a próxima equipe...";

    listaJogadores.innerHTML = "";
    btnRoletar.disabled = true;

    setTimeout(function () {
        roletarEquipe();
    }, 1000);
}

function atualizarMeuTime() {
    meuTime.innerHTML = "";

    const contador = document.createElement("p");
    contador.textContent =
        "Jogadores escolhidos: " +
        timeEscolhido.length + "/11";

    meuTime.appendChild(contador);

    timeEscolhido.forEach(function (jogador, indice) {
        const item = document.createElement("p");

        item.textContent =
            (indice + 1) + ". " +
            jogador.nome +
            " — OVR " + jogador.overall +
            " (" + jogador.equipe + ")";

        meuTime.appendChild(item);
    });
}
