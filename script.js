// scroll triggger
function scrolltrigger() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
scrolltrigger();

function navbarAnimation() {
  gsap.to("#left img", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: 1,
    },
  });
  gsap.to("#right #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: 2,
    },
  });
}
navbarAnimation();

// Heading animation
function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.4,
    duration: 0.9,
    stagger: 0.2,
  });
  gsap.from("#page1 #video-container", {
    opacity: 0,
    scale: 0.9,
    delay: 1.2,
    duration: 0.3,
  });
}
loadinganimation();

// video button animation
function videoanimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");

  videocon.addEventListener("mouseenter", () => {
    gsap.to(playbtn, {
      opacity: 1,
      scale: 1,
    });
  });

  videocon.addEventListener("mouseleave", () => {
    gsap.to(playbtn, {
      opacity: 0,
      scale: 0,
    });
  });

  videocon.addEventListener("mousemove", (dets) => {
    gsap.to(playbtn, {
      left: dets.x,
      top: dets.y,
    });
  });
}
videoanimation();

// tracking cursor
function cursoranimation() {
  document.addEventListener("mousemove", (dets) => {
    gsap.to(".cursor", {
      left: dets.x,
      top: dets.y,
    });
  });
}
cursoranimation();


// word scrolling animation
const scrollers = document.querySelectorAll(".scroller")

if(!window.matchMedia("(prefers-reduce-motion: reduce)").matches){
    addAnimation()
}

function addAnimation(){
    scrollers.forEach(scroller=>{
        scroller.setAttribute('data-animated',true);

        const scrollerInner = scroller.querySelector(".inner_scroller");
        const scrollrContent = Array.from(scrollerInner.children);

        scrollrContent.forEach((item)=>{
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden",true);
            scrollerInner.appendChild(duplicatedItem)
        })
    })
}