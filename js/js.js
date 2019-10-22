window.addEventListener("DOMContentLoaded", function() {
  "use strict";

  (function() {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      w = (canvas.width = innerWidth),
      h = (canvas.height = innerHeight),
      particles = [],
      properties = {
        bgColor: "rgba(9, 9, 41, 1)",
        particleColor: "rgba(151, 226, 240, 1)",
        particleRadius: 4,
        particleCount: 180,
        particleMaxVelocity: 0.3,
        lineLength: 150,
        particleLife: 16
      };

    document.querySelector(".canvas_conteiner").appendChild(canvas);

    window.onresize = function() {
      (w = canvas.width = innerWidth), (h = canvas.height = innerHeight);
    };

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.velocityY =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 860;
      }
      position() {
        (this.x + this.velocityX > w && this.velocityX > 0) ||
        (this.x + this.velocityX < 0 && this.velocityX < 0)
          ? (this.velocityX *= -1)
          : this.velocityX;
        (this.y + this.velocityY > h && this.velocityY > 0) ||
        (this.y + this.velocityY < 0 && this.velocityY < 0)
          ? (this.velocityY *= -1)
          : this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
      reDraw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
      reCalculateLife() {
        if (this.life < 1) {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.velocityX =
            Math.random() * (properties.particleMaxVelocity * 2) -
            properties.particleMaxVelocity;
          this.velocityY =
            Math.random() * (properties.particleMaxVelocity * 2) -
            properties.particleMaxVelocity;
          this.life = Math.random() * properties.particleLife * 60;
        }
        this.life--;
      }
    }

    function reDrawBackground() {
      ctx.fillStyle = properties.bgColor;
      ctx.fillRect(0, 0, w, h);
    }

    function drawLines() {
      var x1, y1, x2, y2, length, opacity;
      for (var i in particles) {
        for (var j in particles) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 1 - length / properties.lineLength;
            ctx.lineWidth = "1.7";
            ctx.strokeStyle = "rgba(151, 226, 240, " + opacity + ")";
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    }

    function reDrawParticles() {
      for (var i in particles) {
        particles[i].reCalculateLife();
        particles[i].position();
        particles[i].reDraw();
      }
    }

    function loop() {
      reDrawBackground();
      reDrawParticles();
      drawLines();
      requestAnimationFrame(loop);
    }

    function init() {
      for (var i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    }

    init();
  })();

  const tab = document.querySelectorAll(".menu__button"),
    info = document.querySelector(".menu-top"),
    tabContent = document.querySelectorAll(".info__block");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  }
  info.addEventListener("click", function(event) {
    const target = event.target;
    if (target && target.classList.contains("menu__button")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  const seeMore = document.querySelector(".anime-button"),
    newPage = document.querySelector(".conteiner-top");
  seeMore.addEventListener("click", function() {
    newPage.classList.add("fade");
    newPage.style.zIndex = "20";
  });

  const cameBack = document.querySelector(".anime-button_came-back"),
    oldPage = document.querySelector(".conteiner-top");
  cameBack.addEventListener("click", function() {
    oldPage.style.zIndex = "-10";
    newPage.classList.remove("fade");
  });
});
