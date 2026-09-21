(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var form = document.getElementById("signup-form");
  var emailInput = document.getElementById("email");
  var message = document.getElementById("form-message");
  var navLinks = document.querySelectorAll("#site-nav a");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setMenuOpen(isOpen) {
    nav.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", function () {
    var isOpen = !nav.classList.contains("open");
    setMenuOpen(isOpen);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = emailInput.value.trim();
    var looksValid = email.indexOf("@") > 0 && email.indexOf(".") > email.indexOf("@");

    if (!looksValid) {
      message.classList.add("error");
      message.textContent = "Please enter a valid email address.";
      emailInput.focus();
      return;
    }

    message.classList.remove("error");
    message.textContent = "You are on the list. We will email your first interview link.";
    form.reset();
  });

  buildWaveform();
  animateScores();
  cycleQuestions();

  function buildWaveform() {
    var wave = document.getElementById("wave");
    if (!wave) {
      return;
    }

    var i;
    for (i = 0; i < 18; i += 1) {
      var bar = document.createElement("span");
      bar.className = "wave-bar";
      bar.style.animationDelay = i * 0.08 + "s";
      bar.style.height = 18 + ((i * 7) % 34) + "px";
      wave.appendChild(bar);
    }
  }

  function animateScores() {
    var fills = document.querySelectorAll(".meter-fill");
    var values = document.querySelectorAll(".meter-value");

    window.setTimeout(function () {
      fills.forEach(function (fill) {
        fill.style.width = fill.getAttribute("data-score") + "%";
      });
    }, 250);

    if (reduceMotion) {
      values.forEach(function (el) {
        el.textContent = el.getAttribute("data-target");
      });
      return;
    }

    values.forEach(function (el) {
      countUp(el, Number(el.getAttribute("data-target")));
    });
  }

  function countUp(el, target) {
    var current = 0;
    var step = Math.max(1, Math.round(target / 32));
    var timer = window.setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        window.clearInterval(timer);
      }
      el.textContent = String(current);
    }, 40);
  }

  function cycleQuestions() {
    var questionEl = document.getElementById("stage-question");
    if (!questionEl || reduceMotion) {
      return;
    }

    var questions = [
      "Tell me about a time you shipped under pressure.",
      "How would you design a notification system?",
      "Walk me through a disagreement with a teammate.",
      "What trade-off did you make in your last project?"
    ];
    var index = 0;

    window.setInterval(function () {
      index = (index + 1) % questions.length;
      questionEl.style.opacity = "0";
      window.setTimeout(function () {
        questionEl.textContent = questions[index];
        questionEl.style.opacity = "1";
      }, 280);
    }, 4200);

    questionEl.style.transition = "opacity 0.28s ease";
  }
})();
