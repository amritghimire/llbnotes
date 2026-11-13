const KEY = "llbnotes-read";
const load = () => new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
const save = (read) => localStorage.setItem(KEY, JSON.stringify([...read]));
const pageKey = (href) => new URL(href, location.href).pathname;

function markNav(read) {
  document.querySelectorAll(".md-nav__link[href]").forEach((link) => {
    link.classList.toggle("is-read", read.has(pageKey(link.getAttribute("href"))));
  });
}

document$.subscribe(() => {
  const read = load();
  markNav(read);
  const article = document.querySelector("article.md-content__inner");
  const isCase = location.pathname.includes("/cases/");
  if (!article || !(isCase || location.pathname.includes("/unit-"))) return;

  const here = pageKey(location.href);
  const button = document.createElement("button");
  button.className = "md-button read-toggle";
  const render = () => {
    const done = read.has(here);
    button.textContent = done ? "✓ Read (click to undo)" : isCase ? "Mark as read" : "Mark this unit as read";
    button.classList.toggle("md-button--primary", done);
  };
  button.addEventListener("click", () => {
    read.has(here) ? read.delete(here) : read.add(here);
    save(read);
    render();
    markNav(read);
  });
  render();
  article.appendChild(button);
});
