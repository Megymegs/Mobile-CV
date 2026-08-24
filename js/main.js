// Megan Meyer, CV / Portfolio
// Vanilla JS only (no jQuery). Bootstrap 5 handles the navbar collapse,
// tabs, accordion and modals declaratively via data attributes.
//
// App-style navigation: the site opens on a landing page and each nav item
// swaps in a single content "page" (with a brief loading screen) instead of
// continuously scrolling through every section. This is all progressive
// enhancement. If this script fails to load, every section is still present
// in the DOM (nothing is hidden by default in the HTML/CSS) and the page
// simply reads as one long, scrollable document.

document.addEventListener("DOMContentLoaded", function () {
  var SECTION_IDS = ["about", "education", "skills", "services", "careers", "portfolio", "contact"];

  var landing = document.getElementById("home");
  var footerEl = document.getElementById("siteFooter");
  var loaderEl = document.getElementById("pageLoader");
  var sectionEls = SECTION_IDS.map(function (id) {
    return document.getElementById(id);
  });

  function setActiveNav(id) {
    document.querySelectorAll("#mainNavbar .nav-link").forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function focusHeading(container) {
    if (!container) return;
    var heading = container.querySelector("h1, h2");
    if (!heading) return;
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }

  function showLanding() {
    sectionEls.forEach(function (section) {
      if (section) section.classList.add("d-none");
    });
    landing.classList.remove("d-none");
    if (footerEl) footerEl.classList.add("d-none");
    document.body.classList.remove("app-active");
    setActiveNav(null);
  }

  function showSection(id) {
    landing.classList.add("d-none");
    sectionEls.forEach(function (section) {
      if (section) section.classList.toggle("d-none", section.id !== id);
    });
    if (footerEl) footerEl.classList.remove("d-none");
    document.body.classList.add("app-active");
    setActiveNav(id);
  }

  function applyView(id) {
    if (id === "home") {
      showLanding();
      focusHeading(landing);
    } else {
      showSection(id);
      focusHeading(document.getElementById(id));
    }
    window.scrollTo(0, 0);
  }

  function navigateTo(id, options) {
    options = options || {};
    var isValidTarget = id === "home" || SECTION_IDS.indexOf(id) !== -1;
    if (!isValidTarget) return;

    if (options.immediate) {
      applyView(id);
      if (options.updateHistory !== false) {
        history.replaceState({ section: id }, "", id === "home" ? location.pathname : "#" + id);
      }
      return;
    }

    if (loaderEl) loaderEl.classList.add("show");

    window.setTimeout(function () {
      applyView(id);
      if (options.updateHistory !== false) {
        history.pushState({ section: id }, "", id === "home" ? location.pathname : "#" + id);
      }
      window.setTimeout(function () {
        if (loaderEl) loaderEl.classList.remove("show");
      }, 200);
    }, 500);
  }

  // Any in-page link that points at the landing page or one of the content
  // sections should drive the app navigation instead of a plain anchor jump.
  var navSelector = '#mainNavbar .nav-link, .hero-nav a, .navbar-brand, footer a[href^="#"]';
  document.querySelectorAll(navSelector).forEach(function (link) {
    link.addEventListener("click", function (event) {
      var href = link.getAttribute("href") || "";
      if (href.charAt(0) !== "#" || href.length < 2) return;
      var id = href.slice(1);
      if (id !== "home" && SECTION_IDS.indexOf(id) === -1) return;
      event.preventDefault();
      navigateTo(id);
    });
  });

  // Support the browser's back/forward buttons.
  window.addEventListener("popstate", function (event) {
    var id = (event.state && event.state.section) || (location.hash ? location.hash.slice(1) : "home");
    navigateTo(id, { immediate: true, updateHistory: false });
  });

  // Initial view: honour a deep link straight to a section, otherwise open
  // on the landing page so the entrance animation plays.
  var initialHash = location.hash ? location.hash.slice(1) : "";
  if (SECTION_IDS.indexOf(initialHash) !== -1) {
    navigateTo(initialHash, { immediate: true, updateHistory: false });
  } else {
    showLanding();
  }

  // Collapse the mobile navbar after a nav link is clicked.
  var navbarCollapse = document.getElementById("navbarNav");
  var navLinks = document.querySelectorAll("#navbarNav .nav-link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Back-to-top button.
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Populate the lightbox modal with whichever gallery image was clicked.
  var lightboxModalEl = document.getElementById("lightboxModal");
  if (lightboxModalEl) {
    lightboxModalEl.addEventListener("show.bs.modal", function (event) {
      var trigger = event.relatedTarget;
      var src = trigger.getAttribute("data-image-src");
      var caption = trigger.getAttribute("data-image-caption") || "";
      lightboxModalEl.querySelector("#lightboxImage").src = src;
      lightboxModalEl.querySelector("#lightboxCaption").textContent = caption;
    });
  }

  // "Career Age" / "Earthly Age" / "Dev Age": all calculated live from
  // today's date so they're always correct, rather than numbers that need
  // updating by hand. Shown youngest-first: Career Age, Earthly Age, Dev Age.
  //
  // - Career Age:  straight count of years since my first job (no
  //                multiplier, just years worked, of any kind).
  // - Earthly Age: straight age from date of birth.
  // - Dev Age:     Earthly Age + extra cellular aging accumulated over the
  //                years actually spent working as a developer (dev career
  //                start -> today). That extra aging is modelled as three
  //                contributing factors, each inspired by published
  //                research (rounded for fun, not clinical precision):
  //   - Power naps:  short/poor sleep is linked to faster telomere
  //                  shortening (a measurable marker of cellular aging).
  //   - Ambition:    Epel et al., PNAS 2004 found sustained high perceived
  //                  stress corresponded to roughly a decade of extra
  //                  telomere aging.
  //   - Will power:  sustained heavy cognitive load taps the same
  //                  stress-response (HPA axis) pathway, compounding the
  //                  effect above.
  //
  // Steal this formula for your own Dev Age:
  //   Dev Age = Earthly Age + years worked as a developer x (0.3 + 0.35 + 0.4)
  //   (0.3 power naps + 0.35 ambition + 0.4 will power, tune those three to taste)
  var careerAgeEl = document.getElementById("careerAge");
  var earthlyAgeEl = document.getElementById("earthlyAge");
  var devAgeEl = document.getElementById("devAge");
  if (careerAgeEl && earthlyAgeEl && devAgeEl) {
    // Extra years of cellular aging per year worked as a developer,
    // one contribution per factor.
    var EXTRA_AGING_PER_DEV_YEAR = {
      powerNaps: 0.3,
      ambition: 0.35,
      willPower: 0.4
    };

    // Every age on this card uses the same method: whole completed months,
    // expressed in years and rounded down to the nearest tenth (i.e.
    // rounded down to the nearest completed month, never rounded up).
    function wholeMonthsBetween(start, end) {
      var months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      if (end.getDate() < start.getDate()) {
        months -= 1;
      }
      return Math.max(0, months);
    }

    function ageInYears(start, end) {
      return Math.floor((wholeMonthsBetween(start, end) / 12) * 10) / 10;
    }

    var birthDate = new Date(1993, 4, 14); // 14 May 1993
    var careerStartDate = new Date(2010, 11, 1); // December 2010, first job (PSG Prime)
    var devStartDate = new Date(2017, 7, 1); // August 2017, started learning to code
    var now = new Date();

    var careerAgeYears = ageInYears(careerStartDate, now);
    var earthlyAgeYears = ageInYears(birthDate, now);
    var yearsAsDev = ageInYears(devStartDate, now);
    var extraAgingPerYear =
      EXTRA_AGING_PER_DEV_YEAR.powerNaps +
      EXTRA_AGING_PER_DEV_YEAR.ambition +
      EXTRA_AGING_PER_DEV_YEAR.willPower;
    var devAgeYears = Math.floor((earthlyAgeYears + yearsAsDev * extraAgingPerYear) * 10) / 10;

    careerAgeEl.textContent = careerAgeYears.toFixed(1) + " years";
    earthlyAgeEl.textContent = earthlyAgeYears.toFixed(1) + " years";
    devAgeEl.textContent = devAgeYears.toFixed(1) + " years";

    // Worked example using today's actual values (same rounding as above),
    // so it's never a made-up illustration, it's always this exact page's
    // numbers.
    var devAgeExampleEl = document.getElementById("devAgeExample");
    if (devAgeExampleEl) {
      devAgeExampleEl.textContent =
        "Example: " + earthlyAgeYears.toFixed(1) + " + " + yearsAsDev.toFixed(1) +
        " years as a dev \u00d7 (0.3 + 0.35 + 0.4) = " + devAgeYears.toFixed(1);
    }
  }
});
