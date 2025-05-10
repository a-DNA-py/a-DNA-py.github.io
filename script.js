document.getElementById("navbarElement").innerHTML = `
    <nav id="navbar" class="topnav">
        <a href="/index.html" id="logo"><img src="/img/logo.png"></a>
        <a class="nav-link" href="/pages/about.html">About Us</a>
        <a class="nav-link" href="/pages/parivartan.html">PARIVARTAN</a>
        <a class="nav-link" href="/pages/involved.html">Get Involved</a>
        <a class="nav-link" href="/pages/contact.html">Contact Us</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
          <i class="fa fa-bars"></i>
        </a>
    </nav>
  `;

function myFunction() {
  var x = document.getElementById("navbar");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}  

const trailer = document.getElementById("trailer");

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}


window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => {
    handleOnMove(e)


    
        const x = e.clientX - trailer.offsetWidth / 2,
            y = e.clientY - trailer.offsetHeight / 2;

        const keyframes = {
            transform: `translate(${x}px, ${y}px)`
        };

        trailer.animate(keyframes, { 
        duration: 800, 
        fill: "forwards" 
        });
};

window.ontouchmove = e => handleOnMove(e.touches[0]);


trailer.style.transform = `translate(${x}px, ${y}px)`;
