let menuAberto = false;

function expandirMenu() {
    const menuExpandido = document.querySelector(".menu-expandido");
    menuExpandido.style.display = "block";
}

function retrairMenu() {
    const menuExpandido = document.querySelector(".menu-expandido");
    menuExpandido.style.display = "none";
}

function toggleMenu() {
    const menuExpandido = document.querySelector(".menu-expandido");
    if (menuAberto) {
        menuExpandido.style.display = "none";
    } else {
        menuExpandido.style.display = "block";
    }
    menuAberto = !menuAberto;
}