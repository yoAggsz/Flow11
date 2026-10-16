
const btnIniciar = document.getElementById("btnIniciar");
const menuInicial = document.getElementById("menuInicial");
const menuModos = document.getElementById("menuModos");
const menuTipos = document.getElementById("menuTipos");

const btnClassico = document.getElementById("btnClassico");
const btnAmigos = document.getElementById("btnAmigos");

const btnCopa = document.getElementById("btnCopa");
const btnChampions = document.getElementById("btnChampions");
const btnCarreira = document.getElementById("btnCarreira");

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

btnChampions.addEventListener("click", function () {
    alert("Modo Champions selecionado!");
});

btnCarreira.addEventListener("click", function () {
    alert("Modo Carreira selecionado!");
});
