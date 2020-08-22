import { gsap, ScrollTrigger } from 'gsap/all';

export default {
  data() {
    return {
      tl: gsap.timeline(),
      tl2: gsap.timeline(),
    };
  },
  methods: {
    // init() {
    //   animation = new AdditiveAnimation("#box");
    //   TweenLite.ticker.addEventListener("tick", () => animation.render());
    //   main.addEventListener("click", e => animation.addTween(e.clientX, e.clientY, time));
    // },
    // Tween() {
    //   constructor(duration, config) {
    //     this.x = 0;
    //     this.y = 0;
    //     this.tween = TweenLite.from(this, duration, config);
    //   };
    // },
    // AdditiveAnimation() {
    //   constructor(target) {
    //     var x = this.x = window.innerWidth  / 2;
    //     var y = this.y = window.innerHeight / 2;
    //     this.target = document.querySelector(target);
    //     TweenLite.set(this.target, { x, y, xPercent: -50, yPercent: -50 });
    //     this.tweens = new LinkedList();
    //   }
    //   addTween(x, y, duration = 1.5) {
    //     var dx = this.x - x;
    //     var dy = this.y - y;
    //     var tween = new Tween(duration, {
    //       x: dx,
    //       y: dy,
    //       ease,
    //       onComplete: () => this.removeTween(tween)
    //     });
    //     this.tweens.add(tween);
    //     this.x = x;
    //     this.y = y;
    //     updateCount();
    //     return this;
    //   },
    //   removeTween(tween) {
    //     this.tweens.remove(tween);
    //     updateCount();
    //     return this;
    //   },
    //   render() {
    //     var size = this.tweens.size;
    //     if (!size) return;
    //     var tween = this.tweens.last;
    //     var x = this.x;
    //     var y = this.y;
    //     while (size--) {
    //       x += tween.x;
    //       y += tween.y;
    //       tween = tween.prev;
    //     }
    //     TweenLite.set(this.target, { x, y });
    //     return this;
    //   },
    // }
  },
  mounted() {
    // let ease  = Power1.easeInOut;
    // let time  = 1.5;
    // let animation;
    gsap.registerPlugin(ScrollTrigger);
    this.tl.to('.long h1:first-child', {
      x: '-=10em',
      repeat: -1,
      duration: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.long',
        markers: true,
      },
    })
      .to('.long h1:last-child', {
        x: '+=10em',
        repeat: -1,
        duration: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.long',
          markers: true,
        },
      });
    this.tl2.to('.long h1:first-child', {
      x: '-=10em',
      scrollTrigger: {
        trigger: '.long',
        markers: true,
        scrub: true,
      },
      ease: 'none',
    });
    this.tl2.to('.long h1:last-child', {
      scrollTrigger: {
        trigger: '.long',
        markers: true,
        scrub: true,
      },
      x: '+=10em',
      ease: 'none',
    });
    this.tl.play();
  },
};

// init();
