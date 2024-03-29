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
    this.element.setAttribute("style", "fill:blue;stroke:blue;stroke-width:2");

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
      } else if (xdir > 0 && this.xpos + this.spd * xdir + this.width < this.contenedor.clientWidth) {
        //Comprobamos si está dentro de los límites de la pantalla
        this.xpos = parseInt(this.xpos + xdir * this.spd);
        this.element.setAttribute("x", this.xpos);
      }
    }
  }

  pewPew() {
    //La nave dispara (en construcción)
    let disparo = new Disparo(this.xpos + this.width / 2, this.ypos - this.height, "Nave"); 
    //Creamos un objeto de tipo Disparo con un autor "Nave" y en la posición de la nave
    return disparo; //Devolvemos el objeto
  }
}

class Marciano {
  //Clase marciano
  constructor(xpos, ypos, width, height, color){
    this.xpos = xpos; // posicion en X
    this.ypos = ypos; // posición en Y
    this.width = width;//Altura marciano
    this.height = height;//anchura marciano
    this.color = color;//color marciano

    this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect"); //Creamos el elemento HTML que representará la nave
    this.element.setAttribute("x", this.xpos);
    this.element.setAttribute("y", this.ypos);
    this.element.setAttribute("width", this.width);
    this.element.setAttribute("height", this.height);
    this.element.setAttribute("style", "fill:grey;stroke:grey;stroke-width:2");

    this.isAppended = false ; //comprobar si esta anclado en el HTML

  }

  appendMarciano(contenedor){
    this.contenedor = contenedor;
    this.contenedor.appendChild(this.element);
    this.isAppended = true;
  }//
  
}

class Disparo {
  //Clase Disparo
  constructor(xpos, ypos, author) {
    this.author = author;
    this.xpos = xpos;
    this.ypos = ypos;
    this.spd = 18;
    if (this.author == "Nave") {
      //Si el autor es la nave, el disparo va hacia arriba. En caso contrario, va hacia abajo
      this.ydir = -1;
    } else {
      this.ydir = 1;
    }
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect"); //Creamos el elemento HTML que representará el disparo
    this.element.setAttribute("x", this.xpos);
    this.element.setAttribute("y", this.ypos);
    this.element.setAttribute("width", 3);
    this.element.setAttribute("height", 8);
    this.element.setAttribute("style", "fill:yellow;stroke:yellow;stroke-width:2");

    this.isAppended = false;
  }

  appendDisparo(contenedor) {
    //Anclar el disparo a un elemento HTML
    this.contenedor = contenedor;
    this.contenedor.appendChild(this.element);
    this.isAppended = true;
  }

  moverDisparo() {
    //el disparo se mueve
    if (this.isAppended) {
      //Comprobamos si está anclado en la página HTML
      this.ypos = parseInt(this.ypos + this.ydir * this.spd);
      this.element.setAttribute("y", this.ypos);
    }
  }

  detectarColision(){
    
  }
   
}

class Bloque {
  constructor(x, y, color, ancho, alto, spd, dir) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ancho = ancho;
    this.alto = alto;
    this.spd = spd;
    this.dir = dir;
    this.tag = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.tag.setAttribute("x", this.x);
    this.tag.setAttribute("y", this.y);
    this.tag.setAttribute("width", this.ancho);
    this.tag.setAttribute("height", this.alto);
    this.tag.setAttribute("fill", this.color);
  }
  dibujarBloque() {
    this.tag.setAttribute("x", this.x);
    this.tag.setAttribute("y", this.y);
    this.tag.setAttribute("width", this.ancho);
    this.tag.setAttribute("height", this.alto);
    this.tag.setAttribute("fill", this.color);
  }
  moverBloque() {//Si existe mueve el bloque y lo dibuja
    if (this.isAppended == true) {
      this.x = parseInt(this.x + this.spd * this.dir);
      if (this.x <= 0) {//comprobamos si ha llegado al limite 
        this.dir = 1;//mover a la derecha
      }
      if (this.x + this.ancho >= this.contenedor.clientWidth) {//comprueba las dimensiones del contenedor
        this.dir = -1;//mover izquierda
      }
      this.dibujarBloque();
    }
  }
  appendBloque(contenedor) {
    //tenemos acceso al bloque y comprobamos que se ha dibujado
    this.contenedor = contenedor;
    this.contenedor.appendChild(this.tag);//agrega al contenedor el tag
    this.isAppended = true;//devolver true
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
      this.bloque.appendBloque(this.svg);
    }
    // for (this.marciano of this.marcianos) {
    //   this.marciano.dibujarMarciano();
    // }
    this.generarJuego();
  }
  generarJuego() {
    this.bloque.dibujarBloque();
    // this.marciano.dibujarMarciano();
  }
  
}