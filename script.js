/*=========================================
    PORTFOLIO SCRIPT
=========================================*/

const navbar = document.querySelector(".navbar");
const scrollBtn = document.getElementById("scrollTop");
const cursor = document.querySelector(".cursor-glow");
const counters = document.querySelectorAll(".counter");
const reveals = document.querySelectorAll(".glass-card,.project-card,.timeline-item,.education-card,.skill-card,.stat-card");

/*=========================================
    STICKY NAVBAR
=========================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 60)
        navbar.classList.add("scrolled");
    else
        navbar.classList.remove("scrolled");

});

/*=========================================
    SCROLL TO TOP
=========================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500)
        scrollBtn.classList.add("show");
    else
        scrollBtn.classList.remove("show");

});

scrollBtn.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/*=========================================
    CURSOR GLOW
=========================================*/

window.addEventListener("mousemove",e=>{

    cursor.style.left=e.clientX+"px";

    cursor.style.top=e.clientY+"px";

});

/*=========================================
    COUNTERS
=========================================*/

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter=entry.target;

const target=+counter.dataset.target;

let value=0;

const speed=target/80;

const update=()=>{

value+=speed;

if(value<target){

counter.innerText=Math.floor(value);

requestAnimationFrame(update);

}
else{

counter.innerText=target+"+";

}

};

update();

observer.unobserve(counter);

});

},{threshold:.5});

counters.forEach(counter=>observer.observe(counter));

/*=========================================
    REVEAL
=========================================*/

const revealObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{threshold:.2});

reveals.forEach(item=>{

item.classList.add("reveal");

revealObserver.observe(item);

});

/*=========================================
    ACTIVE NAVIGATION
=========================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-150;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*=========================================
    MOBILE MENU
=========================================*/

const hamburger=document.querySelector(".hamburger");

const nav=document.querySelector(".nav-links");

hamburger.addEventListener("click",()=>{

nav.classList.toggle("show");

hamburger.classList.toggle("open");

});

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

nav.classList.remove("show");

});

});

/*=========================================
    PARALLAX HERO
=========================================*/

const hero=document.querySelector(".hero");

window.addEventListener("scroll",()=>{

hero.style.transform=`translateY(${window.scrollY*.15}px)`;

});

/*=========================================
    TYPED TEXT
=========================================*/

new Typed(".hero-tag",{

strings:[

"Senior Game Developer",

"Gameplay Programmer",

"Unity Multiplayer Developer",

"AI & Networking Specialist"

],

typeSpeed:60,

backSpeed:35,

backDelay:1800,

loop:true

});

/*=========================================
    PARTICLES
=========================================*/

const particles=document.getElementById("particles");

for(let i=0;i<50;i++){

let p=document.createElement("span");

let size=Math.random()*6+2;

p.style.width=size+"px";

p.style.height=size+"px";

p.style.left=Math.random()*100+"%";

p.style.animationDuration=(Math.random()*12+8)+"s";

p.style.animationDelay=Math.random()*8+"s";

particles.appendChild(p);

}

/*=========================================
    PARTICLE STYLE
=========================================*/

const style=document.createElement("style");

style.innerHTML=`

#particles{

position:fixed;

inset:0;

overflow:hidden;

pointer-events:none;

z-index:-1;

}

#particles span{

position:absolute;

bottom:-20px;

background:rgba(59,130,246,.35);

border-radius:50%;

animation:particle linear infinite;

}

@keyframes particle{

0%{

transform:translateY(0) scale(0);

opacity:0;

}

20%{

opacity:1;

}

100%{

transform:translateY(-120vh) scale(1);

opacity:0;

}

}

.nav-links.show{

display:flex;

position:absolute;

top:80px;

left:0;

width:100%;

background:#111827;

padding:30px;

flex-direction:column;

gap:20px;

}

.nav-links a.active{

color:#3B82F6;

}

`;

document.head.appendChild(style);

/*=========================================
    BUTTON HOVER EFFECT
=========================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mousemove",e=>{

const x=e.offsetX;

const y=e.offsetY;

btn.style.setProperty("--x",x+"px");

btn.style.setProperty("--y",y+"px");

});

});
/*=========================================
    CONTACT FORM
=========================================*/

const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

if(contactForm){

    contactForm.addEventListener("submit", async (e)=>{

        e.preventDefault();


        const submitBtn = contactForm.querySelector("button");


        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;


        const formData = new FormData(contactForm);


        try{

            const response = await fetch(contactForm.action,{

                method:"POST",

                body:formData,

                headers:{
                    "Accept":"application/json"
                }

            });


            if(response.ok){

                if(formStatus){

                    formStatus.innerHTML = "✓ Message sent successfully!";
                    formStatus.style.color = "#22c55e";

                }


                contactForm.reset();

            }
            else{

                if(formStatus){

                    formStatus.innerHTML = "✗ Failed to send message.";
                    formStatus.style.color = "#ef4444";

                }

            }


        }
        catch(error){


            if(formStatus){

                formStatus.innerHTML = "✗ Something went wrong.";
                formStatus.style.color = "#ef4444";

            }


        }


        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;


    });

}
/*=========================================
    END
=========================================*/