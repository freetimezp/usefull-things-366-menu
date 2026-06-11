const btn = document.getElementById("profile-btn");
const social = document.getElementById("profile-social");

const links = gsap.utils.toArray(".profile__link");

const positions = [
    { x: 10, y: -80 },
    { x: 55, y: -55 },
    { x: 80, y: 0 },
    { x: 55, y: 55 },
    { x: 10, y: 80 },
];

let opened = false;

// initial state
gsap.set(social, {
    scale: 0,
    opacity: 0,
    visibility: "hidden",
});

gsap.set(links, {
    x: 0,
    y: 0,
    scale: 0,
    opacity: 0,
});

btn.addEventListener("click", () => {
    if (!opened) {
        const tl = gsap.timeline();

        tl.set(social, { visibility: "visible" });

        tl.to(social, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
        });

        tl.to(
            links,
            {
                x: (i) => positions[i].x,
                y: (i) => positions[i].y,
                scale: 1,
                opacity: 1,
                duration: 1.2,
                stagger: 0.25,
                ease: "elastic.out(1,0.45)",
            },
            "-=0.2"
        );

        tl.to(
            ".profile__menu",
            {
                rotate: -180,
                scale: 0,
                opacity: 0,
                duration: 0.25,
            },
            0
        );

        tl.fromTo(
            ".profile__close",
            {
                rotate: 180,
                scale: 0,
                opacity: 0,
            },
            {
                rotate: 0,
                scale: 1,
                opacity: 1,
                duration: 0.35,
            },
            0.1
        );

        tl.fromTo(
            ".profile__card",
            {
                y: 0,
            },
            {
                y: -5,
                duration: 0.25,
                yoyo: true,
                repeat: 1,
            },
            0
        );

        opened = true;
    } else {
        const tl = gsap.timeline();

        tl.to(links, {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: {
                each: 0.04,
                from: "end",
            },
            ease: "power3.in",
        });

        tl.to(
            social,
            {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "back.in(2)",
                onComplete: () => {
                    gsap.set(social, {
                        visibility: "hidden",
                    });
                },
            },
            "-=0.15"
        );

        tl.to(
            ".profile__close",
            {
                rotate: 180,
                scale: 0,
                opacity: 0,
                duration: 0.2,
            },
            0
        );

        tl.to(
            ".profile__menu",
            {
                rotate: 0,
                scale: 1,
                opacity: 1,
                duration: 0.3,
            },
            0.1
        );

        opened = false;
    }
});

gsap.to(".profile__card", {
    y: -8,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "sine.inOut",
});

const card = document.querySelector(".profile__card");

card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 15;
    const rotateX = (y / rect.height - 0.5) * -15;

    gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
    });
});

card.addEventListener("mouseleave", () => {
    gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1,0.5)",
    });
});
