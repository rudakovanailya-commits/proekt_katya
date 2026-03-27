(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  const toast = document.getElementById("formToast");
  if (!form || !toast) return;

  const toasts = {
    show(msg) {
      toast.textContent = msg;
      toast.hidden = false;
      window.clearTimeout(toasts._t);
      toasts._t = window.setTimeout(() => {
        toast.hidden = true;
      }, 7000);
    },
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (form.elements["name"]?.value || "").trim();
    const contact = (form.elements["contact"]?.value || "").trim();
    const message = (form.elements["message"]?.value || "").trim();
    const email = form.getAttribute("data-email") || "";

    if (!name) {
      toasts.show("Укажите ваше имя.");
      return;
    }
    if (!contact || contact.length < 3) {
      toasts.show("Укажите телефон или email.");
      return;
    }
    if (!message || message.length < 10) {
      toasts.show("Опишите задачу (коротко, но не пусто).");
      return;
    }

    const subject = `Заявка на бухгалтерию (ООО/ИП) — ${name}`;
    const body = [
      `Имя: ${name}`,
      `Контакты: ${contact}`,
      "",
      `Что нужно:`,
      message,
      "",
      "— Сайт: бухгалтер для ресторанов",
    ].join("\n");

    if (!email || !email.includes("@")) {
      toasts.show("Добавьте email получателя в атрибут `data-email` в форме.");
      return;
    }

    // Откроем письмо в почтовом клиенте.
    const href =
      `mailto:${email}?` +
      `subject=${encodeURIComponent(subject)}&` +
      `body=${encodeURIComponent(body)}`;

    toasts.show("Открываю письмо…");
    window.location.href = href;
  });
})();

