class Bloques {
  constructor(x, y, color, ancho, alto) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ancho = ancho;
    this.alto = alto;
    this.tag = document.createElementNS("http://www.w3.org/2000/svg", "rectangle");
    this.tag.setAttribute("x", this.x);
    this.tag.setAttribute("y", this.y);
    this.tag.setAttribute("width", this.ancho);
    this.tag.setAttribute("height", this.alto);
  }
  dibujarBloque() {
      
  }
}
window.onload = () => {

};
