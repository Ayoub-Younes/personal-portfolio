import { projects }  from './project-data.js';
import { experiences } from './experiences-data.js';
import { certificates} from './certificates-data.js';

const body = document.body
const loadMore = document.getElementById('load-more')
const wrapper = document.querySelector(".projects-wrapper")
const expsContainer = document.querySelector('.experiences-wrapper');
const domsContainer = document.querySelector('.domains-wrapper');
const certificateDisplayWrapper = document.querySelector('.certificates-display');
const menuHamburger = document.getElementById("hamburger-menu");
const mobileHamburger = document.getElementById("hamburger-mobile");
const desktopHamburger = document.getElementById("hamburger-desktop");
const navSections = document.getElementById("navbar");
const domainbar = document.querySelector(".domains");
const scrollBtn = document.getElementById('scrollToTop');
const welcomeSection = document.getElementById('welcome');

let currentCertificates = [];
let currentProjects = Object.values(projects).flat(); // default to all
let num = 0;


menuHamburger.addEventListener('click', () =>{
navSections.classList.toggle("show");
document.body.classList.toggle("disable-scroll");
})

document.querySelectorAll(".section").forEach(nav => 
  nav.addEventListener('click', () =>{
    navSections.classList.toggle("show");
    document.body.classList.remove("disable-scroll");
}));
;



// PROJECTS


document.querySelectorAll('.portfolio-sorting a').forEach(link => {
  const filterKey = link.getAttribute('data-filter'); 
  const numSpan = link.querySelector('.num');

  // Update the count
  if (projects[filterKey]) {
    numSpan.textContent = projects[filterKey].length.toString().padStart(2, '0');
  } else {
    numSpan.textContent = '00';
  }

  // Add click behavior
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Set active class
    document.querySelectorAll('.portfolio-sorting a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Update current projects
    if (filterKey === 'all') {
      currentProjects = Object.values(projects).flat();
    } else {
      currentProjects = projects[filterKey] || [];
    }

    // Reset grid
    num = 0;
    wrapper.innerHTML = '';
    displayNext();
  });
});

const totalProjects = Object.values(projects)
  .reduce((acc, group) => acc + group.length, 0);

document.querySelector('[data-filter="all"] .num').textContent = totalProjects.toString().padStart(2, '0');

const displayNext = () => {

    if (num >= currentProjects.length) {
        loadMore.style.cursor = "not-allowed";
        return;
    }
    let newProjects = currentProjects.slice(num, num + 6);
    newProjects.forEach((project) => {

      let dataZoom = "false"
      wrapper.innerHTML += `
        <div class="project-wrapper fade-in" style="display: none">
          <div data-zoom= "${dataZoom}" class="project-image">
            <div class="zoom-container">
              <img class="zoom-image" src="${project.img}">
            </div>
            <div class="img-wrapper" style="background-image: linear-gradient(to top, rgba(255, 255, 255, 0.74) 1%, rgba(9, 0, 0, 0)), url(./${project.img})"></div>
          </div>
          <div class="project-text">
              <h3 class="project-tile">${project.projectName}</h3>
              <p class="project-description">${project.descrption}</p>
              <span class="project-tech">${project.tech}</span>
          </div>
          <div class="project-link">
            <a href=${project.link} target="_blank"><svg style="height:1em; width:1em" viewBox="0 0 1024 1024" transform="scale(1.2)"><path fill="currentColor" d="M698.027 597.333C701.44 569.173 704 541.013 704 512c0-29.013-2.56-57.173-5.973-85.333H842.24c6.827 27.306 11.093 55.893 11.093 85.333 0 29.44-4.266 58.027-11.093 85.333M622.507 834.56c25.6-47.36 45.226-98.56 58.88-151.893h125.866c-40.96 70.4-106.24 125.013-184.746 151.893M611.84 597.333H412.16c-4.267-28.16-6.827-56.32-6.827-85.333 0-29.013 2.56-57.6 6.827-85.333h199.68c3.84 27.733 6.827 56.32 6.827 85.333 0 29.013-2.987 57.173-6.827 85.333M512 851.627c-35.413-51.2-64-107.947-81.493-168.96h162.986C576 743.68 547.413 800.427 512 851.627M341.333 341.333H216.747c40.533-70.826 106.24-125.44 184.32-151.893-25.6 47.36-44.8 98.56-59.734 151.893M216.747 682.667h124.586C356.267 736 375.467 787.2 401.067 834.56c-78.08-26.88-143.787-81.493-184.32-151.893m-34.987-85.334c-6.827-27.306-11.093-55.893-11.093-85.333 0-29.44 4.266-58.027 11.093-85.333h144.213C322.56 454.827 320 482.987 320 512c0 29.013 2.56 57.173 5.973 85.333M512 171.947c35.413 51.2 64 108.373 81.493 169.386H430.507C448 280.32 476.587 223.147 512 171.947m295.253 169.386H681.387C667.733 288 648.107 236.8 622.507 189.44c78.506 26.88 143.786 81.067 184.746 151.893M512 85.333c-235.947 0-426.667 192-426.667 426.667 0 235.52 191.147 426.667 426.667 426.667 235.52 0 426.667-191.147 426.667-426.667C938.667 276.48 747.52 85.333 512 85.333z"></path></svg></a>
            <a href=${project.git} target="_blank"><svg viewBox="0 0 120.78 117.79" style="height: 1em; width: 1em; transform: scale(1.05);"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" fill="currentColor" d="M60.39 0A60.39 60.39 0 0 0 41.3 117.69c3 .56 4.12-1.31 4.12-2.91 0-1.44-.05-6.19-.08-11.24C28.54 107.19 25 96.42 25 96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67 6.07.43 9.26 6.22 9.26 6.22 5.39 9.23 14.13 6.57 17.57 5 .55-3.9 2.11-6.56 3.84-8.07C36 85.55 21.85 80.37 21.85 57.23A23.35 23.35 0 0 1 28.08 41c-.63-1.52-2.7-7.66.58-16 0 0 5.07-1.62 16.61 6.19a57.36 57.36 0 0 1 30.25 0C87 23.42 92.11 25 92.11 25c3.28 8.32 1.22 14.46.59 16a23.34 23.34 0 0 1 6.21 16.21c0 23.2-14.12 28.3-27.57 29.8 2.16 1.87 4.09 5.55 4.09 11.18 0 8.08-.06 14.59-.06 16.57 0 1.61 1.08 3.49 4.14 2.9A60.39 60.39 0 0 0 60.39 0Z"></path><path class="cls-2" d="M22.87 86.7c-.13.3-.6.39-1 .19s-.69-.61-.55-.91.61-.39 1-.19.69.61.54.91ZM25.32 89.43c-.29.27-.85.14-1.24-.28a.92.92 0 0 1-.17-1.25c.3-.27.84-.14 1.24.28s.47 1 .17 1.25ZM27.7 92.91c-.37.26-1 0-1.35-.52s-.37-1.18 0-1.44 1 0 1.35.51.37 1.19 0 1.45ZM31 96.27a1.13 1.13 0 0 1-1.59-.27c-.53-.49-.68-1.18-.34-1.54s1-.27 1.56.23.68 1.18.33 1.54ZM35.46 98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7 1.51-.49 1.13.76 1 1.24ZM40.4 98.58c0 .5-.56.91-1.28.92s-1.3-.38-1.31-.88.56-.91 1.29-.92 1.3.39 1.3.88ZM45 97.8c.09.49-.41 1-1.12 1.12s-1.35-.17-1.44-.66.42-1 1.12-1.12 1.35.17 1.44.66Z"></path></g></g></svg></a>
            </div>
        </div>
      `
      document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('click', () => {
          img.classList.toggle('zoom')
          img.dataset.zoom = img.dataset.zoom === "true" ? "false" : "true";
          body.style.overflow = img.dataset.zoom === "true" ? 'hidden' : "";
          let image = img.firstElementChild;
          image.classList.toggle('zoom')
        });
      });
    })

    num += 6 
    imageLoad()
}

loadMore.addEventListener("click", displayNext)

const imageLoad = () => {
    const porjectsList =  Array.from(document.getElementsByClassName('project-wrapper'))
    const images = Array.from(document.getElementsByClassName("image"))
    let imagesLoaded = 0;
    
    // Function to show content after all images are loaded
    function showContent() {
        images.forEach(img => img.classList.remove("image"))
        porjectsList.forEach(div  => div.style.display = "flex")
    }

    // Remove the fade-in class after animation completes
    setTimeout(() => {
    porjectsList.forEach(div => div.classList.remove("fade-in"));
    }, 1000); // Duration of the animation

    // Function to check if all images are loaded
    function checkAllImagesLoaded() {
        if (imagesLoaded === images.length) {
            showContent();
        }
    }

    // Check each image if it's already cached
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
            checkAllImagesLoaded();
        } else {
            // If the image is not cached, wait for the load event
            img.onload = function() {
            imagesLoaded++;
            checkAllImagesLoaded();
            };
        }
        });
    
        // Fallback in case the images take too long or fail to load
        setTimeout(function() {
        showContent();  // Show content after the timeout, regardless of images loaded
        }, 500);

}








// EXPERIENCE
experiences.forEach((exp, index) => {
  const expWrapper = document.createElement('div');
  expWrapper.className = 'experience-wrapper';
  expWrapper.id = exp.id; 

  expWrapper.innerHTML = `
    <h5>
      <div>
        <span class="position">${exp.title}</span>
        <span class="time">${exp.time}</span>
      </div>
    </h5>
    <svg class="toggle-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
  `;

  const expItem = document.createElement('div');
  expItem.className = 'experience-item';

  expItem.innerHTML = `
    <div class="info">
      <div class="location-link">
        <ul>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path  stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span>${exp.location}</span>
          </li>
          <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
          <a href="${exp.link}" target="_blank"><span>${exp.website}</a>
          </li>
        </ul>
      </div>
      <div class="description">
        <p>${exp.description}</p>
      </div>

      <div class="technologies-used">
        <ul>${exp.tech.map(skill => `<li><span>${skill}</span></li>`).join('')}</ul>
      </div>
    </div>
    <div class="logo">
      <img class="image" src=${exp.image}>
    </div>
  `;

  expsContainer.appendChild(expWrapper);
  expsContainer.appendChild(expItem);

  // Toggle click
  expWrapper.querySelector('.toggle-icon').addEventListener('click', () => {
    expItem.classList.toggle('active');
    expWrapper.classList.toggle('active');

    const isActive = expItem.classList.contains('active');

    expWrapper.querySelector('.toggle-icon').innerHTML = isActive
      ? `<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />`
      : `<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />`;
  });
});








// CERTIFICATES

Object.entries(certificates).forEach(([domainKey, domainData]) => {
  const { title: domainTitle, certs, svg } = domainData;

  // Collect unique sources and their certs
  const sourceMap = {};
  certs.forEach(cert => {
    if (!sourceMap[cert.source]) {
      sourceMap[cert.source] = [];
    }
    sourceMap[cert.source].push(cert.title);
  });

  // Build source-cert lines
  const sourceLines = Object.entries(sourceMap).map(([source, titles]) => {
    if (titles.length === 1) {
      return `<div class="domain-certs"><span class="certs-source">${source}:&nbsp; </span><p class="certs-list">${titles[0]}</p></div>`;
    } else {
      const titleList = titles.join(', ');
      return `<div class="domain-certs"><span class="certs-source">${source}:&nbsp; </span><p class="certs-list">${titleList}</p></div>`;
    }
  }).join('');
  let active = (domainKey == "web") ? "active" : "";
  // Append domain block
  domsContainer.innerHTML += `
    
    <div class="domain-wrapper ${active}">
      <div class="domain-header" >
        <div class="svg-container" >${svg}</div>
        <div class="domain-title" id="${domainKey}">
        <span>${domainTitle}</span>
        </div>
      </div>
      ${sourceLines}
    </div>
  `;
  domsContainer.querySelector('svg').classList.add('active');
});



let slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  if (slides.length === 0) return;  // No slides, prevent errors

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

const slideDisplay = (domainData) => {
  currentCertificates = domainData.certs;

  let slidesHTML = '';
  let thumbnailsHTML = '';

  currentCertificates.forEach((cert, index) => {
    const slideNumber = index + 1;

    slidesHTML += `
      <div class="mySlides">
        <div class="numbertext">${slideNumber} / ${currentCertificates.length}</div>
        <a href="${cert.link}" target="_blank">
          <img src="${cert.img}" style="width:100%" alt="${cert.title} Certificate"">
        </a>
        <div class="caption-container">
          <p>${cert.title}</p>
        </div>
      </div>
    `;

    thumbnailsHTML += `
      <div class="column">
        <img class="demo cursor" src="${cert.img}" style="width:100%" data-slide="${slideNumber}" alt="${cert.title}">
      </div>
    `;
  });

  certificateDisplayWrapper.innerHTML = `
    ${slidesHTML}

    <a class="prev" id="prevBtn">❮</a>
    <a class="next" id="nextBtn">❯</a>

    <div class="row">
      ${thumbnailsHTML}
    </div>
  `;
      slideIndex = 1;
      showSlides(slideIndex);
  // Attach event listeners for thumbnails
  document.querySelectorAll('.demo.cursor').forEach(img => {
    img.addEventListener('click', () => {
      const n = parseInt(img.getAttribute('data-slide'));
      currentSlide(n);
    });
  });

  // Attach next/prev button click listeners
  document.getElementById('prevBtn').addEventListener('click', () => plusSlides(-1));
  document.getElementById('nextBtn').addEventListener('click', () => plusSlides(1));
};




//////////////////////////////////
function openSlideshow(domainData, startIndex = 0) {
  const overlay = document.getElementById('slideshow-overlay');
  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div class="close-btn">
      <span>&times;</span>
    </div>
    <div class="slideshow-container"></div>
  `;

  // Prepare slide HTML
  let slidesHTML = '';
  let thumbnailsHTML = '';
  domainData.certs.forEach((cert, index) => {
    slidesHTML += `
      <div class="mySlides">
        <div class="numbertext">${index + 1} / ${domainData.certs.length}</div>
        <img src="${cert.img}" alt="${cert.title}">
        <div class="caption-container">
          <p>${cert.title}</p>
        </div>
      </div>`;

    thumbnailsHTML += `
      <img class="demo cursor" src="${cert.img}" data-slide="${index + 1}" alt="${cert.title}">
    `;
  });

  overlay.querySelector('.slideshow-container').innerHTML = `
    ${slidesHTML}
    <a class="prev">❮</a>
    <a class="next">❯</a>
    <div class="row">${thumbnailsHTML}</div>
  `;

  let slideIndex = startIndex + 1;
  showSlides(slideIndex);

  function showSlides(n) {
    let i;
    let slides = overlay.querySelectorAll(".mySlides");
    let dots = overlay.querySelectorAll(".demo");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
  }

  overlay.querySelector('.prev').addEventListener('click', () => showSlides(--slideIndex));
  overlay.querySelector('.next').addEventListener('click', () => showSlides(++slideIndex));
  overlay.querySelectorAll('.demo').forEach(dot => {
    dot.addEventListener('click', () => showSlides(slideIndex = parseInt(dot.dataset.slide)));
  });

  overlay.querySelector('.close-btn').addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.innerHTML = '';
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      overlay.innerHTML = '';
    }
  });
}
/////////////////////////////////





const certsShow = (action) => {
  mobileHamburger.classList[action]("side");
  desktopHamburger.classList[action]("side");
  domainbar.classList[action]("show");
  certificateDisplayWrapper.classList[action]("side")
  document.querySelectorAll(".domain-title").forEach(title => {
    title.classList[action]("show");
  });
};

const certsisplay = (domainData) => {
  certificateDisplayWrapper.innerHTML = '';

  if (domainData && domainData.certs) {
    currentCertificates = domainData.certs;
    currentCertificates.forEach((cert, index) => {
      const credsLink = cert.link ? `<div class="cert-link"><a href="${cert.link}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg></a></div>`: "";
      const credsId = cert.id ? `<span class="cert-id">Credential ID ${cert.id}</span>` : "";

      certificateDisplayWrapper.innerHTML += `
        <div class="certificate-card fade-in">
          <div class="image-container">
            <img src="${cert.img}" alt="${cert.title}" data-index="${index}">
          </div>
          <div class="details-container">
            <span class="cert-title">${cert.title}</span>
            <div class="info">
              <div class="footer">
                <span class="cert-source">${cert.source}</span>
                <span class="cert-date">Issued ${cert.date}</span>
              </div>
              ${credsLink}
            </div>
          </div>
        </div>
      `;
    });

    // Add click listener after rendering
    certificateDisplayWrapper.querySelectorAll('.certificate-card img').forEach(img => {
      img.addEventListener('click', () => {
        const index = parseInt(img.dataset.index);
        openSlideshow(domainData, index);
      });
    });
  }
};

certsisplay(certificates.web) 

document.querySelectorAll('.domain-wrapper').forEach(domainEl => {
  const domainKey = domainEl.querySelector('.domain-title').id;

  domainEl.addEventListener('click', () => {
    if (window.innerWidth < 1200 && !domainEl.querySelector('.show')) {
      certsShow("toggle")
    }

    document.querySelectorAll('.domain-wrapper').forEach(el => {
      el.classList.remove('active')
      const svg = el.querySelector('svg');
      if (svg) svg.classList.remove('active');
    });
    domainEl.classList.add('active');
    const svg = domainEl.querySelector('svg');
    if (svg) svg.classList.add('active');

    certificateDisplayWrapper.innerHTML = '';
    certsisplay(certificates[domainKey])
  });
});




[mobileHamburger, desktopHamburger].forEach(hamb => {
  if (hamb) {
    hamb.addEventListener("click", () => {
  certsShow("toggle")

});
  }
});


function handleResponsiveSidebar() {
  if (window.innerWidth <= 1200) {
    certsShow("add", false); 
  } else {
    certsShow("remove")
  } 

}

window.addEventListener("resize", handleResponsiveSidebar);
window.addEventListener("load", handleResponsiveSidebar); 
window.addEventListener('scroll', () => {
  const rect = welcomeSection.getBoundingClientRect();
  if (rect.bottom < 0) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

// Optional: Smooth scroll behavior
document.querySelector('html').style.scrollBehavior = 'smooth';

displayNext()