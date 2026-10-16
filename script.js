
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

// EQUIPES DISPONÍVEIS NA ROLETA
const equipes = [
    "Bastard München",
    "PXG",
    "Manshine City",
    "FC Barcha",
    "Ubers"
];

// ELENCOS INICIAIS
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

// TIME QUE O JOGADOR ESTÁ MONTANDO
let timeEscolhido = [];
let equipeAtual = null;

// ABRIR O MENU INICIAL
btnIniciar.addEventListener("click", function () {
    menuInicial.hidden = true;
    menuModos.hidden = false;
});

// ABRIR OS MODOS DE JOGO
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

// ABRIR O CHAMPIONS
btnChampions.addEventListener("click", function () {
    menuTipos.hidden = true;
    menuChampions.hidden = false;

    timeEscolhido = [];
    equipeAtual = null;

    atualizarMeuTime();
    listaJogadores.innerHTML = "";
    equipeSorteada.textContent =
        "Clique em RODAR ROLETA para sortear uma equipe.";
});

// GIRAR A ROLETA
btnRoletar.addEventListener("click", function () {
    if (timeEscolhido.length >= 11) {
        equipeSorteada.textContent =
            "Seu time já está completo!";
        return;
    }

    const numeroAleatorio = Math.floor(
        Math.random() * equipes.length
    );

    equipeAtual = equipes[numeroAleatorio];

    equipeSorteada.textContent =
        "Equipe sorteada: " + equipeAtual;

    mostrarJogadores(equipeAtual);
});

// MOSTRAR OS JOGADORES DA EQUIPE SORTEADA
function mostrarJogadores(equipe) {
    listaJogadores.innerHTML = "";

    const jogadores = jogadoresPorEquipe[equipe];

    if (!jogadores) {
        listaJogadores.textContent =
            "O elenco desta equipe ainda não foi cadastrado.";
        return;
    }

    jogadores.forEach(function (jogador) {
        const botao = document.createElement("button");

        botao.textContent =
            jogador.nome + " — OVR " + jogador.overall;

        botao.type = "button";

        const jaEscolhido = timeEscolhido.some(function (escolhido) {
            return escolhido.nome === jogador.nome;
        });

        if (jaEscolhido) {
            botao.disabled = true;
            botao.textContent += " — ESCOLHIDO";
        }

        botao.addEventListener("click", function () {
            escolherJogador(jogador, botao);
        });

        listaJogadores.appendChild(botao);
    });
}

// ESCOLHER UM JOGADOR
function escolherJogador(jogador, botao) {
    if (timeEscolhido.length >= 11) {
        alert("Seu time já tem 11 jogadores!");
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

    botao.disabled = true;
    botao.textContent += " — ESCOLHIDO";

    atualizarMeuTime();

    if (timeEscolhido.length === 11) {
        equipeSorteada.textContent =
            "TIME COMPLETO! Você escolheu 11 jogadores.";
        btnRoletar.disabled = true;
    } else {
        equipeSorteada.textContent =
            jogador.nome + " escolhido! " +
            timeEscolhido.length + "/11 jogadores.";
    }
}

// ATUALIZAR A LISTA DO SEU TIME
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

    if (timeEscolhido.length >= 11) {
        btnRoletar.disabled = true;
    } else {
        btnRoletar.disabled = false;
    }
}
