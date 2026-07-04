/* AZFAR YUSRI — TACTICAL TELEMETRY
   GSAP core + ScrollTrigger. All motion gated on prefers-reduced-motion. */

gsap.registerPlugin(ScrollTrigger);

/* ---- Live clock (SGT) — runs regardless of motion prefs (content, not motion) ---- */
const clockEl = document.getElementById("clock");
if (clockEl) {
  const tick = () => {
    clockEl.textContent =
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false, timeZone: "Asia/Singapore",
      }).format(new Date()) + " SGT";
  };
  tick();
  setInterval(tick, 1000);
}

const mm = gsap.matchMedia();

mm.add(
  {
    motionOK: "(prefers-reduced-motion: no-preference)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { reduceMotion } = context.conditions;

    if (reduceMotion) {
      // Everything visible, nothing moves.
      gsap.set(".reveal, .hero-word, .spec-cell, .hero-thesis, .hero-meta-row", {
        clearProps: "all",
      });
      return;
    }

    /* ---- Hero load sequence ---- */
    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro
      .from(".hero-meta-row", { autoAlpha: 0, duration: 0.5 })
      .from(".hero-word", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
      }, "-=0.2")
      .from(".spec-cell", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
      }, "-=0.55")
      .from(".hero-thesis, .hero-scroll", {
        autoAlpha: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.3");

    /* ---- Hero portrait: settle zoom on load, flicker the HUD frame ---- */
    gsap.from(".hero-bg img", {
      scale: 1.12,
      autoAlpha: 0,
      duration: 1.6,
      ease: "power2.out",
    });
    gsap.from(".hero-bg-frame", {
      autoAlpha: 0,
      duration: 0.5,
      delay: 0.9,
      ease: "steps(4)",
    });

    /* ---- Hero portrait: parallax drift (scrub) ---- */
    gsap.to(".hero-bg img", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    /* ---- Hero name: subtle scroll drift (scrub) ---- */
    gsap.to(".hero-name", {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    /* ---- Marquee: continuous conveyor ---- */
    gsap.to(".marquee-track", {
      xPercent: -50,
      duration: 22,
      ease: "none",
      repeat: -1,
    });

    /* ---- Scroll reveals (batched) ----
       gsap.from(): elements are visible by default; if a trigger never
       fires (mid-page reload, headless render), nothing ships hidden. */
    ScrollTrigger.batch(".reveal", {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.from(batch, {
          autoAlpha: 0,
          y: 26,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          overwrite: true,
        }),
    });

    /* ---- Case index counters flicker in ---- */
    ScrollTrigger.batch(".case-index", {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.from(batch, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "steps(3)",
          stagger: 0.08,
        }),
    });

    /* ---- Scroll cue nudge ---- */
    gsap.to(".scroll-arrow", {
      y: 5,
      duration: 0.7,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
);

/* ---- Safety: if fonts load late, recalc trigger positions ---- */
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
