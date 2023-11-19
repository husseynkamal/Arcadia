class TypeWriter {
  constructor() {
    this.txtContainer = document.querySelector(".typed_text");
    this.cursor = document.querySelector(".cursor");
    this.texts = [
      "We make websites",
      "Web design with diffence",
      "24/6 date of started",
    ];
    this.typingDelay = 100;
    this.erasingDelay = 50;
    this.newTextDelay = 2000;
    this.currIndex = 0;
    this.charIndex = 0;
  }

  type() {
    if (this.charIndex < this.texts[this.currIndex].length) {
      if (!this.cursor.classList.contains("type"))
        this.cursor.classList.add("type");

      this.txtContainer.textContent += this.texts[this.currIndex].charAt(
        this.charIndex
      );
      this.charIndex++;

      setTimeout(() => this.type(), this.typingDelay);
    } else {
      this.cursor.classList.remove("type");
      setTimeout(() => this.erase(), this.newTextDelay);
    }
  }

  erase() {
    if (this.charIndex > 0) {
      if (!this.cursor.classList.contains("type"))
        this.cursor.classList.add("type");

      this.txtContainer.textContent = this.texts[this.currIndex].substring(
        0,
        this.charIndex - 1
      );
      this.charIndex--;
      setTimeout(() => this.erase(), this.erasingDelay);
    } else {
      this.cursor.classList.remove("type");

      this.currIndex++;
      if (this.currIndex >= this.texts.length) this.currIndex = 0;

      setTimeout(() => this.type(), this.typingDelay + 1100);
    }
  }
}

const body = document.querySelector("body");
const html = document.querySelector("html");

body.setAttribute("style", "overflow: hidden;");
html.style.scrollBehavior = "auto";

const setLoading = () => {
  const loading = document.querySelector(".load");

  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    html.style.scrollBehavior = "smooth";

    setTimeout(() => {
      loading.style.display = "none";
      body.removeAttribute("style");

      const typeWriter = new TypeWriter();
      typeWriter.type();
    }, 5000);
  });
};

const showSidebar = () => {
  const navOpenBtn = document.getElementById("btn");
  const navCloseBtn = document.getElementById("cancel");
  const sideBar = document.querySelector(".slide_bar");

  navOpenBtn.addEventListener("click", () => sideBar.classList.add("show"));
  navCloseBtn.addEventListener("click", () => sideBar.classList.remove("show"));
};

const sections = document.querySelectorAll(".main__content");

const createLists = () => {
  const ul = document.querySelector(".nav__bar");
  const fragment = document.createDocumentFragment();

  sections.forEach((section) => {
    const dataNav = section.getAttribute("data-nav");
    const dataTarget = section.getAttribute("data-target");

    const li = document.createElement("li");
    li.textContent = dataNav;
    li.classList.add("navBar__li", dataTarget);

    fragment.appendChild(li);

    li.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth" });
      sideBar.classList.remove("show");
      html.style.overflow = "visible";
    });

    changeActive(li);
  });

  ul.appendChild(fragment);
  ul.children[0].classList.add("activate");
};

function changeActive(list) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionHeight = section.clientHeight;
      if (scrollY > section.offsetTop - sectionHeight / 3)
        current = section.getAttribute("data-target");
    });

    const lists = [list];
    lists.forEach((li) => {
      li.classList.remove("activate");
      if (li.classList.contains(current)) li.classList.add("activate");
      else li.classList.remove("activate");
    });
  });
}

const slidesContainer = document.querySelector(".slides__container");
const slides = document.querySelectorAll(".slider__bar");
const navDotsContainer = document.querySelector(".navigation__dots");
const slidesLength = slides.length;

const setSlidesPostions = () => {
  slides.forEach((slide, i) => (slide.style.left = `${i * 100}%`));

  createNavigationDots();
};

function createNavigationDots() {
  for (let i = 0; i < slidesLength; i++) {
    const dot = document.createElement("div");
    dot.classList.add("single__dot");
    navDotsContainer.appendChild(dot);
  }
  navDotsContainer.children[0].classList.add("active");
}

const slider = () => {
  const dots = document.querySelectorAll(".single__dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
      dots.forEach((dot) => dot.classList.remove("active"));
      e.currentTarget.classList.add("active");
      slidesContainer.style.transform = `translateX(${index * -100}%)`;
    });
  });
};

function sendMessage() {
  const buttonForm = document.getElementById("btnForm");
  buttonForm.addEventListener("click", () => {
    window.open("mailto:ihusseinkamal@gmail.com?subject=subject&body=body");
  });
}

function backToTop() {
  const btn = document.getElementById("toTop");
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setLoading();
  showSidebar();
  createLists();
  setSlidesPostions();
  slider();
  sendMessage();
  backToTop();

  console.log(
    `${document.lastModified} By %cHussein Kamal`,
    "color: red; text-transform: uppercase"
  );
});
