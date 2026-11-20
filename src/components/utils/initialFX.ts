import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

let revealed = false;

/**
 * Runs when the loader finishes. Only the 3D character is visible and
 * scrolling stays locked while the face scan runs; everything else lights up
 * in revealSite() once the scan completes.
 */
export function initialFX() {
  revealed = false;
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  document.body.style.overflowY = "hidden";
  smoother?.paused(true);

  window.addEventListener("scanComplete", revealSite, { once: true });
  // Start the scan once the character has finished lighting up
  setTimeout(() => window.dispatchEvent(new Event("startScan")), 1600);
  // Safety net: never leave the visitor stuck if the model/scan fails
  setTimeout(revealSite, 20000);
}

export function revealSite() {
  if (revealed) return;
  revealed = true;
  window.removeEventListener("scanComplete", revealSite);
  document.body.classList.add("site-revealed");
  // the loader hid the real page title until now
  const realTitle = document.documentElement.dataset.realTitle;
  if (realTitle) document.title = realTitle;

  // Light burst from the character's face
  const burst = document.createElement("div");
  burst.className = "reveal-burst";
  document.body.appendChild(burst);
  gsap.fromTo(
    burst,
    { scale: 0.2, opacity: 0.9 },
    { scale: 6, opacity: 0, duration: 1.4, ease: "power2.out", onComplete: () => burst.remove() }
  );
  gsap.fromTo(
    [".landing-circle1", ".landing-circle2"],
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1.6, ease: "power2.out" }
  );
  gsap.set(".landing-intro", { autoAlpha: 1 });
  gsap.fromTo(
    ".landing-roles span",
    { opacity: 0, x: -30 },
    { opacity: 0.85, x: 0, duration: 0.8, stagger: 0.15, delay: 0.9, ease: "power3.out" }
  );

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var landingText2 = new SplitText(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.4,
      // Unlock scrolling only once everything is on screen
      onComplete: () => {
        document.body.style.overflowY = "auto";
        smoother?.paused(false);
      },
    }
  );

  var landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  var landingText4 = new SplitText(".landing-h2-1", TextProps);
  var landingText5 = new SplitText(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SplitText, Text2: SplitText) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
