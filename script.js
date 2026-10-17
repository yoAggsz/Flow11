
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

const menuPartida = document.getElementById("menuPartida");

const progressoPartidas = document.getElementById("progressoPartidas");
const forcaMeuTime = document.getElementById("forcaMeuTime");
const nomeAdversario = document.getElementById("nomeAdversario");
const forcaAdversario = document.getElementById("forcaAdversario");
const placarPartida = document.getElementById("placarPartida");
const resultadoPartida = document.getElementById("resultadoPartida");

const btnJogarPartida = document.getElementById("btnJogarPartida");
const btnProximaPartida = document.getElementById("btnProximaPartida");
const btnVoltarChampions = document.getElementById("btnVoltarChampions");


// Equipes disponíveis na roleta.
const equipes = [
    "Bastard München",
    "PXG",
    "Manshine City",
    "FC Barcha",
    "Ubers"
];

// Elencos e overalls personalizados para o jogo.
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
        { nome: "Julian Loki", overall: 96 },
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
    ],

    "Manshine City": [
        { nome: "Chris Prince", overall: 99 },
        { nome: "Seishiro Nagi", overall: 91 },
        { nome: "Agi", overall: 89 },
        { nome: "Hyoma Chigiri", overall: 88 },
        { nome: "Reo Mikage", overall: 87 },
        { nome: "Kazuma Niou", overall: 76 },
        { nome: "Young", overall: 78 },
        { nome: "Junichi Wanima", overall: 72 },
        { nome: "Hajime Nishioka", overall: 75 },
        { nome: "Taiga Tsunzaki", overall: 74 },
        { nome: "Kairu Saramadara", overall: 73 }
    ],

    "FC Barcha": [
        { nome: "Lavinho", overall: 97 },
        { nome: "Bunny Iglesias", overall: 92 },
        { nome: "Meguru Bachira", overall: 88 },
        { nome: "Eita Otoya", overall: 83 },
        { nome: "Miroku Darai", overall: 76 },
        { nome: "Kitsunezato", overall: 72 },
        { nome: "Hayate", overall: 70 },
        { nome: "Wakatsuki", overall: 70 },
        { nome: "Gyeo", overall: 70 },
        { nome: "Teru Kitsunezato", overall: 71 },
        { nome: "Shizuka Haiji", overall: 72 }
    ],

    "Ubers": [
        { nome: "Marc Snuffy", overall: 98 },
        { nome: "Don Lorenzo", overall: 96 },
        { nome: "Shoei Barou", overall: 94 },
        { nome: "Oliver Aiku", overall: 89 },
        { nome: "Jyubei Aryu", overall: 82 },
        { nome: "Ikki Niko", overall: 81 },
        { nome: "Shuto Sendou", overall: 79 },
        { nome: "Gen Fukaku", overall: 78 },
        { nome: "Canali", overall: 76 },
        { nome: "Peron", overall: 74 },
        { nome: "Abdi", overall: 73 }
    ]
};

let timeEscolhido = [];
let equipeAtual = null;
let aguardandoEscolha = false;
let adversariosRestantes = [];
let adversarioAtual = null;
let partidasVencidas = 0;
let partidaFinalizada = false;


// Esconde todos os menus.
function esconderMenus() {
    menuInicial.hidden = true;
    menuModos.hidden = true;
    menuTipos.hidden = true;
    menuChampions.hidden = true;
}

// Navegação dos menus.
btnIniciar.addEventListener("click", function () {
    esconderMenus();
    menuModos.hidden = false;
});

btnClassico.addEventListener("click", function () {
    esconderMenus();
    menuTipos.hidden = false;
});

btnAmigos.addEventListener("click", function () {
    alert("O modo com amigos será desenvolvido depois.");
});

btnCopa.addEventListener("click", function () {
    alert("O modo Copa será desenvolvido depois.");
});

btnCarreira.addEventListener("click", function () {
    alert("O modo Carreira será desenvolvido depois.");
});

// Inicia a montagem do time.
btnChampions.addEventListener("click", function () {
    esconderMenus();
    menuChampions.hidden = false;

    timeEscolhido = [];
    equipeAtual = null;
    aguardandoEscolha = false;

    equipeSorteada.textContent =
        "Clique em RODAR ROLETA para sortear uma equipe.";

    listaJogadores.innerHTML = "";
    meuTime.innerHTML = "";

    btnRoletar.disabled = false;
    atualizarMeuTime();
});

// Botão da roleta.
btnRoletar.addEventListener("click", function () {
    if (aguardandoEscolha) {
        return;
    }

    if (timeEscolhido.length >= 11) {
        return;
    }

    roletarEquipe();
});

// Sorteia uma equipe aleatória.
function roletarEquipe() {
    if (timeEscolhido.length >= 11) {
        finalizarTime();
        return;
    }

    const indice = Math.floor(Math.random() * equipes.length);
    equipeAtual = equipes[indice];

    aguardandoEscolha = true;
    btnRoletar.disabled = true;

    equipeSorteada.textContent =
        "Equipe sorteada: " + equipeAtual;

    mostrarJogadores();
}

// Mostra os jogadores da equipe sorteada.
function mostrarJogadores() {
    listaJogadores.innerHTML = "";

    const jogadores = jogadoresPorEquipe[equipeAtual];

    jogadores.forEach(function (jogador) {
        const jaEscolhido = timeEscolhido.some(function (escolhido) {
            return escolhido.nome === jogador.nome;
        });

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao-jogador";

        botao.textContent =
            jogador.nome + " | OVR " + jogador.overall;

        if (jaEscolhido) {
            botao.disabled = true;
            botao.textContent += " — JÁ ESCOLHIDO";
        } else {
            botao.addEventListener("click", function () {
                escolherJogador(jogador);
            });
        }

        listaJogadores.appendChild(botao);
    });
}

// Adiciona o jogador escolhido ao time.
function escolherJogador(jogador) {
    if (!aguardandoEscolha || timeEscolhido.length >= 11) {
        return;
    }

    const jaEscolhido = timeEscolhido.some(function (escolhido) {
        return escolhido.nome === jogador.nome;
    });

    if (jaEscolhido) {
        return;
    }

    timeEscolhido.push({
        nome: jogador.nome,
        overall: jogador.overall,
        equipe: equipeAtual
    });

    aguardandoEscolha = false;

    atualizarMeuTime();
    listaJogadores.innerHTML = "";

    if (timeEscolhido.length === 11) {
        finalizarTime();
        return;
    }

    equipeSorteada.textContent =
        jogador.nome + " escolhido! Próxima roleta em 1 segundo...";

    setTimeout(function () {
        roletarEquipe();
    }, 1000);
}

// Atualiza a lista do time montado.
function atualizarMeuTime() {
    meuTime.innerHTML = "";

    const contador = document.createElement("p");
    contador.textContent =
        "Jogadores escolhidos: " + timeEscolhido.length + "/11";

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

    if (timeEscolhido.length > 0) {
        const soma = timeEscolhido.reduce(function (total, jogador) {
            return total + jogador.overall;
        }, 0);

        const media = (soma / timeEscolhido.length).toFixed(1);

        const textoMedia = document.createElement("p");
        textoMedia.textContent = "Overall médio: " + media;

        meuTime.appendChild(textoMedia);
    }
}

// Encerra a montagem quando houver 11 jogadores.
function finalizarTime() {
    aguardandoEscolha = false;
    btnRoletar.disabled = true;
    listaJogadores.innerHTML = "";

    equipeSorteada.textContent =
        "TIME COMPLETO! Você escolheu 11 jogadores.";

    const mensagem = document.createElement("p");
    mensagem.textContent =
        "Seu time está pronto para a próxima etapa.";

    meuTime.appendChild(mensagem);
}
