/* ==========================================================
   ACCQUEST TRAINING INSTITUTE — shared front-end behaviour
   NOTE: All form submissions and portal logins here are DEMO
   ONLY. Nothing is sent to a server yet. Hook these up to your
   real backend (see the TODO comments) before going live.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTabs();
  initFooterYear();
  initGenericFormValidation();
  initPortalLogin();
  initApplicationForm();
  initContactForm();
});

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

/* ---------- Generic tabs: <button class="tab-btn" data-tab="id"> + <div class="tab-panel" id="id"> ---------- */
function initTabs() {
  document.querySelectorAll("[data-tabgroup]").forEach((group) => {
    const buttons = group.querySelectorAll(".tab-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab");
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        group.querySelectorAll(".tab-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.id === targetId);
        });
      });
    });
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Minimal required-field validation helper ---------- */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll("[required]").forEach((input) => {
    const field = input.closest(".field") || input.parentElement;
    const isEmpty = !input.value || (input.type === "checkbox" && !input.checked);
    if (isEmpty) {
      valid = false;
      field.classList.add("invalid");
    } else {
      field.classList.remove("invalid");
    }
  });
  return valid;
}
function initGenericFormValidation() {
  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        const field = input.closest(".field");
        if (field) field.classList.remove("invalid");
      });
    });
  });
}

/* ---------- Admissions application form (DEMO submit) ---------- */
function initApplicationForm() {
  const form = document.getElementById("applicationForm");
  if (!form) return;
  const status = document.getElementById("applicationStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(form)) {
      status.className = "form-status error show";
      status.textContent = "Please fill in all required fields marked with *.";
      status.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // TODO (backend): replace this block with a real request, e.g.
    // fetch("/api/applications", { method: "POST", body: new FormData(form) })
    const refNumber = "AQ-" + Math.floor(100000 + Math.random() * 900000);
    status.className = "form-status success show";
    status.innerHTML =
      "Application received. Your reference number is <strong>" +
      refNumber +
      "</strong>. Our admissions office will contact you within 3 working days. " +
      "(Demo mode — connect this form to your backend or an email service to receive real applications.)";
    form.reset();
    status.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* ---------- Contact form (DEMO submit) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("contactStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(form)) {
      status.className = "form-status error show";
      status.textContent = "Please complete the required fields.";
      return;
    }
    // TODO (backend): send via fetch() to your mail/API endpoint.
    status.className = "form-status success show";
    status.textContent = "Thank you — your message has been noted. We'll respond by phone or email shortly. (Demo mode.)";
    form.reset();
  });
}

/* ---------- Portal login (DEMO — no real authentication) ---------- */
function initPortalLogin() {
  const roleButtons = document.querySelectorAll(".role-toggle button");
  const loginForm = document.getElementById("portalLoginForm");
  if (!loginForm) return;

  let role = "student";
  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      roleButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      role = btn.getAttribute("data-role");
      document.getElementById("portalIdLabel").textContent =
        role === "staff" ? "Staff / trainer ID" : "Admission / student number";
    });
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(loginForm)) return;
    // TODO (backend): authenticate against your student information system / staff directory.
    // For now this just opens the illustrative demo dashboard.
    window.location.href = "student-dashboard.html?role=" + role;
  });
}
