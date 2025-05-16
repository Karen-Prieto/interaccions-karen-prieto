console.clear();

const friction = -0.8;
let vw = window.innerWidth;
let vh = window.innerHeight;

gsap.defaults({
    overwrite: true
});

const figuras = [];

document.querySelectorAll(".figura").forEach((figura) => {
    const figuraProps = gsap.getProperty(figura);


    const w = figura.offsetWidth;
    const h = figura.offsetHeight;


    const startX = Math.random() * (vw - w);
    const startY = Math.random() * (vh - h);

    gsap.set(figura, {
        x: startX,
        y: startY
    });

    const datos = {
        figura,
        figuraProps,
        w,
        h,
        vx: 0,
        vy: 0
    };

    figuras.push(datos);


    Draggable.create(figura, {
        bounds: window,
        onPress() {
            gsap.killTweensOf(figura);
        },
        onDrag() {
            datos.vx = this.getDirection("x") === "left" ? -10 : 10;
            datos.vy = this.getDirection("y") === "up" ? -10 : 10;
        },
        onRelease() {
            moverConRebote(datos);
        }
    });
});

function moverConRebote(datos) {
    gsap.ticker.add(update);

    function update() {
        let x = datos.figuraProps("x") + datos.vx;
        let y = datos.figuraProps("y") + datos.vy;


        if (x + datos.w > vw) {
            x = vw - datos.w;
            datos.vx *= friction;
        } else if (x < 0) {
            x = 0;
            datos.vx *= friction;
        }


        if (y + datos.h > vh) {
            y = vh - datos.h;
            datos.vy *= friction;
        } else if (y < 0) {
            y = 0;
            datos.vy *= friction;
        }

        gsap.set(datos.figura, {
            x,
            y
        });

        if (Math.abs(datos.vx) < 0.5 && Math.abs(datos.vy) < 0.5) {
            gsap.ticker.remove(update);
        }
    }
}

window.addEventListener("resize", () => {
    vw = window.innerWidth;
    vh = window.innerHeight;
});






const episodis = [
    
    {
        titol: "Minimalisme vs. recarregat: dues estètiques, un sol debat",
        participants: "Laura Amigó, Katherinne Rangel i  Paola Agamez",
        data: "24 / 03 / 2025",
        arxiu: "audio/publicitaria.mp3"
  },
    {
        titol: "Disseny Digital vs. Disseny Artesanal: Conflictes i Convivència",
        participants: "Guiomar Borrellas, Eva Pacheco i Clara Romeu",
        data: "24 / 03 / 2025",
        arxiu: "audio/interactiva cinco.mp3"
  },

    
    
    {
        titol: "IA i grans corporacions: entre la innovació i el control",
        participants: "Sofia Vera, Karen Prieto i Aleix Martinez",
        data: "24 / 03 / 2025",
        arxiu: "audio/interactiva uno.wav"
  },
    
    {
        titol: "Intel·ligència Artificial: Progrés, perill o nova dependència?",
        participants: "Rocío Delgado, Dariel Curbelo i Aitana Doncel",
        data: "24 / 03 / 2025",
        arxiu: "audio/interactiva tres.wav"
  },
    {
        titol: "Realitat Virtual: Eina de futur o risc per a la societat?",
        participants:"Laura Cuesta, Jingxian Chi i Noa Pizarro",
        data: "24 / 03 / 2025",
        arxiu: "audio/interactiva cuatro.mp3"
  },
    {
        titol: "IA i Art: Revolució creativa o amenaça?",
        participants: "Juana Triviño, David Aguirre i Ariadna Rodríguez",
        data: "24 / 03 / 2025",
        arxiu: "audio/interactiva dos.mp3"
  },
    
    

];


const llista = document.getElementById("llista-episodis");
let audioActiu = null;


episodis.forEach(epi => {
    const div = document.createElement("div");
    div.className = "episodi";
    div.innerHTML = `
    <h2>${epi.titol}</h2>
    <p><strong>Participants:</strong> ${epi.participants}</p>
    <p><strong>Data:</strong> ${epi.data}</p>
    <audio controls src="${epi.arxiu}"></audio>
  `;
    const audio = div.querySelector("audio");


    audio.addEventListener("play", () => {
        if (audioActiu && audioActiu !== audio) {
            audioActiu.pause();
        }


        audioActiu = audio;

        document.querySelectorAll(".episodi").forEach(el => el.classList.remove("actiu"));
        div.classList.add("actiu");
    });

    audio.addEventListener("pause", () => {
        if (audio === audioActiu) {
            div.classList.remove("actiu");
            audioActiu = null;
        }
    });

    llista.appendChild(div);
});

document.getElementById("cta").addEventListener("click", () => {
    llista.scrollIntoView({
        behavior: "smooth"
    });
});
