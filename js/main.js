/* ============================================================
   Debre Selam — Pre Sunday School
   Vanilla JS: carousel, navigation, scroll effects, form.
   No jQuery, no framework.
   ============================================================ */
(function () {
  "use strict";

  // Mark that JS is active (enables reveal-on-scroll hiding via CSS)
  document.documentElement.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Footer year ---------- */
    var year = document.getElementById("copyrightYear");
    if (year) { year.textContent = new Date().getFullYear(); }

    /* ---------- Sticky nav: shrink/darken on scroll ---------- */
    var nav = document.getElementById("siteNav");
    function onScroll() {
      if (!nav) return;
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    function closeMenu() {
      if (!toggle || !links) return;
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) { closeMenu(); }
      });
    }

    /* ---------- Active nav link on scroll ---------- */
    var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
    var sections = navAnchors
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = "#" + entry.target.id;
            navAnchors.forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === id && !a.classList.contains("nav-cta"));
            });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      sections.forEach(function (s) { spy.observe(s); });
    }

    /* ---------- Reveal on scroll ---------- */
    var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if ("IntersectionObserver" in window && reveals.length) {
      var revObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { revObs.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- Hero carousel ---------- */
    (function carousel() {
      var slides = Array.prototype.slice.call(document.querySelectorAll("#heroSlides .hero-slide"));
      var dotsWrap = document.getElementById("heroDots");
      var prev = document.getElementById("heroPrev");
      var next = document.getElementById("heroNext");
      if (!slides.length) return;

      var index = Math.floor(Math.random() * slides.length);
      var timer = null;
      var INTERVAL = 6000;
      var dots = [];

      slides.forEach(function (_, i) {
        var b = document.createElement("button");
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Slide " + (i + 1));
        b.addEventListener("click", function () { go(i); restart(); });
        dotsWrap && dotsWrap.appendChild(b);
        dots.push(b);
      });

      function go(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach(function (s, n) { s.classList.toggle("active", n === index); });
        dots.forEach(function (d, n) { d.classList.toggle("active", n === index); });
      }
      function nextSlide() { go(index + 1); }
      function start() { timer = setInterval(nextSlide, INTERVAL); }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      function restart() { stop(); start(); }

      prev && prev.addEventListener("click", function () { go(index - 1); restart(); });
      next && next.addEventListener("click", function () { go(index + 1); restart(); });

      var hero = document.querySelector(".hero");
      if (hero) {
        hero.addEventListener("mouseenter", stop);
        hero.addEventListener("mouseleave", start);
      }
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) { stop(); } else { restart(); }
      });

      go(index);
      start();
    })();

    /* ---------- Registration form -> email (mailto) ---------- */
    (function form() {
      // CHANGE THIS to the church email that should receive registrations.
      var RECIPIENT_EMAIL = "registrations@example.com";

      var formEl = document.getElementById("registrationForm");
      var statusEl = document.getElementById("formStatus");
      if (!formEl) return;

      function setStatus(msg, type) {
        if (!statusEl) return;
        statusEl.className = "form-status" + (type ? " " + type : "");
        statusEl.textContent = msg || "";
      }
      function val(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      }

      formEl.addEventListener("submit", function (e) {
        e.preventDefault();
        var fields = {
          "Name / ስም": val("inputFirstName"),
          "Last Name / የአያት ስም": val("inputLastName"),
          "Age / እድሜ": val("inputAge"),
          "Address / አድራሻ": val("inputAddress"),
          "City / ከተማ": val("inputCity"),
          "Parent E-mail / ኢ-ሜል": val("inputEmail")
        };

        if (!fields["Name / ስም"] || !fields["Last Name / የአያት ስም"] || !fields["Parent E-mail / ኢ-ሜል"]) {
          setStatus("Please fill in name and email. / እባክዎ ስምና ኢ-ሜል ይሙሉ።", "is-error");
          return;
        }

        var child = (fields["Name / ስም"] + " " + fields["Last Name / የአያት ስም"]).trim();
        var subject = "New Sunday School Registration — " + child;
        var body = "New registration / አዲስ ምዝገባ\n--------------------------------\n";
        Object.keys(fields).forEach(function (k) { body += k + ": " + (fields[k] || "-") + "\n"; });

        window.location.href = "mailto:" + encodeURIComponent(RECIPIENT_EMAIL) +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);

        setStatus("Opening your email app… please press Send. / የኢሜል መተግበሪያዎ እየተከፈተ ነው፤ Send ይጫኑ።", "is-success");
        formEl.reset();
      });
    })();

  });
})();
