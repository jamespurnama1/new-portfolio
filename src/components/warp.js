export default {
  data() {
    return {
      mobile: false,
      canvasWidth: 800,
      canvasHeight: 300,
      ctx: this.canvas.getContext('2d'),
      imageData: this.ctx.getImageData(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight,
      ),
      pix: this.imageData.data,
      canvas: document.getElementById('canvas'),
      MATHPI180: Math.PI / 180,
      MATHPI2: Math.PI * 2,
      center: { x: this.canvas.width / 2, y: this.canvas.height / 2 },
      mouseActive: false,
      mouseDown: false,
      mousePos: { x: this.center.x, y: this.center.y },
      rotationSpeed: -1.0,
      rotationSpeedFactor: { x: 0, y: 0 },
      fov: 300,
      fovMin: 210,
      fovMax: this.fov,
      starHolderCount: 6666,
      starHolder: [],
      starBgHolder: [],
      starSpeed: 20,
      starSpeedMin: this.starSpeed,
      starSpeedMax: 200,
      starDistance: 8000,
      starRotation: 0,
      backgroundColor: {
        r: 0, g: 0, b: 0, a: 0,
      },
      colorInvertValue: 0,
    };
  },
  methods: {
    clearImageData() {
      for (let i = 0, l = this.pix.length; i < l; i += 4) {
        this.pix[i] = this.backgroundColor.r;
        this.pix[i + 1] = this.backgroundColor.g;
        this.pix[i + 2] = this.backgroundColor.b;
        this.pix[i + 3] = this.backgroundColor.a;
      }
    },
    setPixel(x, y, r, g, b, a) {
      const i = (x + y * this.canvasWidth) * 4;

      this.pix[i] = r;
      this.pix[i + 1] = g;
      this.pix[i + 2] = b;
      this.pix[i + 3] = a;
    },
    setPixelAdditive(x, y, r, g, b, a) {
      const i = (x + y * this.canvasWidth) * 4;

      this.pix[i] = +r;
      this.pix[i + 1] = +g;
      this.pix[i + 2] = +b;
      this.pix[i + 3] = a;
    },
    drawLine(x1, y1, x2, y2, r, g, b, a) {
      const dx = Math.abs(x2 - x1);
      const dy = Math.abs(y2 - y1);

      const sx = x1 < x2 ? 1 : -1;
      const sy = y1 < y2 ? 1 : -1;

      let err = dx - dy;

      let lx = x1;
      let ly = y1;

      while (true) {
        if (
          lx > 0
          && lx < this.canvasWidth
          && ly > 0
          && ly < this.canvasHeight
        ) {
          this.setPixel(lx, ly, r, g, b, a);
        }

        if (lx === x2 && ly === y2) break;

        const e2 = 2 * err;

        if (e2 > -dx) {
          err -= dy;
          lx += sx;
        }

        if (e2 < dy) {
          err += dx;
          ly += sy;
        }
      }
    },
    addParticle(x, y, z, ox, oy, oz) { // eslint-disable-line
      const particle = {};
      particle.x = x;
      particle.y = y;
      particle.z = z;
      particle.ox = ox;
      particle.oy = oy;
      particle.x2d = 0;
      particle.y2d = 0;

      return particle;
    },
    addParticles() {
      let i;

      let x;
      let y;
      let z;

      let colorValue;
      let particle;

      for (i = 0; i < this.starHolderCount / 3; +i) {
        x = Math.random() * 24000 - 12000;
        y = Math.random() * 4500 - 2250;
        z = Math.round(Math.random() * this.starDistance); // Math.random() * 700 - 350;

        colorValue = Math.floor(Math.random() * 55) + 5;

        particle = this.addParticle(x, y, z, x, y, z);
        particle.color = {
          r: colorValue,
          g: colorValue,
          b: colorValue,
          a: 255,
        };

        this.starBgHolder.push(particle);
      }

      for (i = 0; i < this.starHolderCount; +i) {
        x = Math.random() * 10000 - 5000;
        y = Math.random() * 10000 - 5000;
        z = Math.round(Math.random() * this.starDistance); // Math.random() * 700 - 350;

        colorValue = Math.floor(Math.random() * 155) + 100;

        particle = this.addParticle(x, y, z, x, y, z);
        particle.color = {
          r: colorValue,
          g: colorValue,
          b: colorValue,
          a: 255,
        };
        particle.oColor = {
          r: colorValue,
          g: colorValue,
          b: colorValue,
          a: 255,
        };
        particle.w = 1;
        particle.distance = this.starDistance - z;
        particle.distanceTotal = Math.round(
          this.starDistance + this.fov - particle.w,
        );

        this.starHolder.push(particle);
      }
    },
    animloop() {
      this.requestAnimFrame(this.animloop);
      this.render();
    },
    render() {
      this.clearImageData();

      //---

      let i;
      // let j;
      let l;
      // let k;
      // let m;
      // let n;

      //---

      // let rx;
      // let rz;

      let star;
      let scale;

      //---

      if (this.mouseActive) {
        this.starSpeed += 2;

        if (this.starSpeed > this.starSpeedMax) this.starSpeed = this.starSpeedMax;
      } else {
        this.starSpeed -= 1;

        if (this.starSpeed < this.starSpeedMin) this.starSpeed = this.starSpeedMin;
      }

      //---

      if (!this.mouseActive) {
        this.fov += 0.5;

        if (this.fov > this.fovMax) this.fov = this.fovMax;
      } else {
        this.fov -= 1;

        if (this.fov < this.fovMin) this.fov = this.fovMin;
      }

      //---

      let warpSpeedValue;

      if (this.mobile) {
        warpSpeedValue = this.starSpeed * (this.starSpeed / this.starSpeedMax);
      } else {
        warpSpeedValue = this.starSpeed * (this.starSpeed / (this.starSpeedMax / 2));
      }

      //---

      for (i = 0, l = this.starBgHolder.length; i < l; +i) {
        star = this.starBgHolder[i];

        scale = this.fov / (this.fov + star.z);

        star.x2d = star.x * scale + this.center.x;
        star.y2d = star.y * scale + this.center.y;

        if (
          star.x2d > 0
          && star.x2d < this.canvasWidth
          && star.y2d > 0
          && star.y2d < this.canvasHeight
        ) {
          this.setPixel(
            star.x2d | 0, // eslint-disable-line
            star.y2d | 0, // eslint-disable-line
            star.color.r,
            star.color.g,
            star.color.b,
            255,
          );
        }
      }

      //---

      for (i = 0, l = this.starHolder.length; i < l; +i) {
        star = this.starHolder[i];

        star.z -= this.starSpeed;
        star.distance += this.starSpeed;

        if (star.z < -this.fov + star.w) {
          star.z = this.starDistance;
          star.distance = 0;
        }

        //---
        // star color

        const distancePercent = star.distance / star.distanceTotal;

        star.color.r = Math.floor(star.oColor.r * distancePercent);
        star.color.g = Math.floor(star.oColor.g * distancePercent);
        star.color.b = Math.floor(star.oColor.b * distancePercent);

        //---
        // star draw

        scale = this.fov / (this.fov + star.z);

        star.x2d = star.x * scale + this.center.x;
        star.y2d = star.y * scale + this.center.y;

        if (
          star.x2d > 0
          && star.x2d < this.canvasWidth
          && star.y2d > 0
          && star.y2d < this.canvasHeight
        ) {
          this.setPixelAdditive(
            star.x2d | 0, // eslint-disable-line
            star.y2d | 0, // eslint-disable-line
            star.color.r,
            star.color.g,
            star.color.b,
            255,
          );
        }

        if (this.starSpeed !== this.starSpeedMin) {
          const nz = star.z + warpSpeedValue;

          scale = this.fov / (this.fov + nz);

          const x2d = star.x * scale + this.center.x;
          const y2d = star.y * scale + this.center.y;

          if (
            x2d > 0
            && x2d < this.canvasWidth
            && y2d > 0
            && y2d < this.canvasHeight
          ) {
            this.drawLine(
              star.x2d | 0, // eslint-disable-line
              star.y2d | 0, // eslint-disable-line
              x2d | 0, // eslint-disable-line
              y2d | 0, // eslint-disable-line
              star.color.r,
              star.color.g,
              star.color.b,
              255,
            );
          }
        }

        if (this.mouseDown) {
          // rotation
          const radians = this.MATHPI180 * this.starRotation;

          const cos = Math.cos(radians);
          const sin = Math.sin(radians);

          this.star.x = cos * (star.ox - this.center.x)
          + sin * (star.oy - this.center.y) + this.center.x;
          this.star.y = cos * (star.oy - this.center.y)
          - sin * (star.ox - this.center.x) + this.center.y;
        }
      }

      //---

      this.ctx.putImageData(this.imageData, 0, 0);

      //---

      if (this.mouseActive) {
        this.center.x += (this.mousePos.x - this.center.x) * 0.015;
      } else {
        this.enter.x += (this.canvas.width / 2 - this.center.x) * 0.015;
      }

      //---

      if (this.mouseDown) {
        this.starRotation -= 0.5;
      }
    },
    mouseMoveHandler(event) {
      this.mousePos = this.getMousePos(this.canvas, event);
    },

    mouseEnterHandler(event) { // eslint-disable-line
      this.mouseActive = true;
    },

    mouseLeaveHandler(event) { // eslint-disable-line
      this.mouseActive = false;

      this.mouseDown = false;
    },

    mouseDownHandler(event) { // eslint-disable-line
      this.mouseDown = true;

      this.speed = 0;
    },

    mouseUpHandler(event) { // eslint-disable-line
      this.mouseDown = false;

      this.speed = 0.25;
    },

    //---

    getMousePos(canvas, event) {
      const rect = canvas.getBoundingClientRect();

      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    },

    //---

    touchStartHandler(event) {
      event.preventDefault();

      this.mouseDown = true;
      this.mouseActive = true;
    },

    touchEndHandler(event) {
      event.preventDefault();

      this.mouseDown = false;
      this.mouseActive = false;
    },

    touchMoveHandler(event) {
      event.preventDefault();

      this.mousePos = this.getTouchPos(this.canvas, event);
    },

    touchCancelHandler(event) { // eslint-disable-line
      this.mouseDown = false;
      this.mouseActive = false;
    },

    //---

    getTouchPos(canvas, event) {
      const rect = canvas.getBoundingClientRect();

      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    },
  },
  //---
  mounted() {
    // if (isMobile.phone || isMobile.tablet) {
    //   this.mobile = true;
    // }

    //---

    this.canvas.setAttribute('width', this.canvasWidth);
    this.canvas.setAttribute('height', this.canvasHeight);
    this.canvas.oncontextmenu = (e) => {
      e.preventDefault();
    };

    if (!this.mobile) {
      this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
      this.canvas.addEventListener('mousedown', this.mouseDownHandler);
      this.canvas.addEventListener('mouseup', this.mouseUpHandler);
      this.canvas.addEventListener('mouseenter', this.mouseEnterHandler);
      this.canvas.addEventListener('mouseleave', this.mouseLeaveHandler);

      // $(this.canvas).css('cursor', 'pointer');
    } else {
      this.canvas.addEventListener('touchstart', this.touchStartHandler, false);
      this.canvas.addEventListener('touchend', this.touchEndHandler, false);
      this.canvas.addEventListener('touchmove', this.touchMoveHandler, false);
      this.canvas.addEventListener(
        'touchcancel',
        this.touchCancelHandler,
        false,
      );
    }

    // document.getElementById('effect').appendChild(this.canvas);

    this.rotationSpeedFactor.x = this.rotationSpeed / this.center.x;
    this.rotationSpeedFactor.y = this.rotationSpeed / this.center.y;

    window.requestAnimFrame = (() => (
      window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    ))();
    this.addParticles();
    this.animloop();
  },
};
