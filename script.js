const btnIniciar = document.getElementById("btnIniciar");
const menuInicial = document.getElementById("menuInicial");
const menuModos = document.getElementById("menuModos");

const btnClassico = document.getElementById("btnClassico");
const btnAmigos = document.getElementById("btnAmigos");

btnIniciar.addEventListener("click", function () {
    menuInicial.hidden = true;
    menuModos.hidden = false;
});

btnClassico.addEventListener("click", function () {
    alert("Modo Clássico selecionado!");
});

btnAmigos.addEventListener("click", function () {
    alert("Modo Com Amigos selecionado!");
});
