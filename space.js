class Bloques {
  constructor(x, y, color, ancho, alto) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ancho = ancho;
    this.alto = alto;
    this.tag = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.tag.setAttribute("x", this.x);
    this.tag.setAttribute("y", this.y);
    this.tag.setAttribute("width", this.ancho);
    this.tag.setAttribute("height", this.alto);
  }
  dibujarBloque() {
    this.tag.setAttribute("x", this.x);
    this.tag.setAttribute("y", this.y);
  }
}
class Nave {
  //Clase Nave que controlará el jugador
  constructor(xpos = 0, ypos = 0, width = 19, height = 19, xdir = 1, spd = 2) {
    this.xpos = parseInt(xpos); //Posición de la nave en el eje x
    this.ypos = parseInt(ypos); //Posición de la nave en el eje y
    this.spd = spd; //Velocidad de desplazamiento de la nave
    this.width = width; //Anchura del cuadrado
    this.height = height; //Altura del cuadrado

    this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect"); //Creamos el elemento HTML que representará la nave
    this.element.setAttribute("x", this.xpos);
    this.element.setAttribute("y", this.ypos);
    this.element.setAttribute("width", this.width);
    this.element.setAttribute("height", this.height);
    this.element.setAttribute("style", "fill:black;stroke:black;stroke-width:2");

    this.isAppended = false; //Boleano para comprobar antes de hacer nada si la nave está anclada en la página HTML
  }

  appendNave(contenedor) {
    //Anclar la nave a un elemento HTML
    this.contenedor = contenedor;
    this.contenedor.appendChild(this.element);
    this.isAppended = true;
  }

  moverNave(xdir) {
    //La nave se mueve proveyéndole la dirección
    if (this.isAppended) {
      //Comprobamos si está anclada en la página HTML
      if (xdir < 0 && this.xpos + this.spd * xdir > 0) {
        //Comprobamos si está dentro de los límites de la pantalla
        this.xpos = parseInt(this.xpos + xdir * this.spd);
        this.element.setAttribute("x", this.xpos);
      } else if (xdir > 0 && this.xpos + this.spd * xdir + width < this.contenedor.clientHeight) {
        //Comprobamos si está dentro de los límites de la pantalla
        this.xpos = parseInt(this.xpos + xdir * this.spd);
        this.element.setAttribute("x", this.xpos);
      }
    }
  }

  Disparo() {
    //La nave dispara (en construcción)
    let disparo = new Disparo(this.xpos, this.ypos, "Nave"); //Creamos un objeto de tipo Disparo 
    //con un autor "Nave" y en la posición de la nave
    return disparo; //Devolvemos el objeto
  }
}

//clase juego
class Juego {
  constructor(ancho, largo, ...bloques) {
    this.ancho = ancho;
    this.largo = largo;
    this.bloques = bloques;
    this.div = document.getElementById("juego");
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.style.border = "1px solid rgb(80, 75, 75)";
    this.div.setAttribute("height", this.largo);
    this.div.setAttribute("width", this.ancho);
    this.svg.setAttribute("height", this.largo);
    this.svg.setAttribute("width", this.ancho);
    this.div.appendChild(this.svg);
    for (this.bloque of this.bloques) {
      this.svg.appendChild(this.bloque.tag);
    }
    this.generarJuego();
  }
  generarJuego() {
    this.bloque.dibujarBloque();
  }
}

window.onload = () => {
  var x1 = Math.round(Math.random() * (500 - 100) + 100);
  var y1 = Math.round(Math.random() * (400 - 200) + 200);
  var x2 = Math.round(Math.random() * (500 - 100) + 100);
  var y2 = Math.round(Math.random() * (400 - 200) + 200);

  var bloque1 = new Bloques(x1, y1, "black", 20, 20);
  var bloque2 = new Bloques(x2, y2, "black", 20, 20);
  var juego = new Juego(500, 500, bloque1, bloque2);
};
