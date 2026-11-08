function openModal() {
  $("modal").classList.add("show");
  $("projectName").focus();
}

function closeModal() {
  $("modal").classList.remove("show");
  $("projectForm").reset();
}

function notify(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.style.display = "block";
  window.clearTimeout(notify.timeoutId);
  notify.timeoutId = window.setTimeout(() => {
    toast.style.display = "none";
  }, 2400);
}

function setupButtonEvents() {
  ["navNew", "sideCreate", "topNew", "heroNew"].forEach(id => {
    $(id).addEventListener("click", openModal);
  });

  $("closeModal").addEventListener("click", closeModal);
  $("cancelModal").addEventListener("click", closeModal);

  $("modal").addEventListener("click", event => {
    if (event.target === $("modal")) closeModal();
  });

  $("projectForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("projectName").value.trim();
    if (!name) return;

    createProject({
      name,
      type: $("contentType").value,
      language: $("language").value
    });

    closeModal();
    notify("Project created successfully!");
  });

  $("projectGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-status-id]");
    if (button) changeProjectStatus(button.dataset.statusId);
  });

  $("search").addEventListener("input", renderProjects);
  $("filter").addEventListener("change", renderProjects);

  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      const view = button.dataset.view;
      $("crumbPage").textContent = view === "projects"
        ? "My Projects"
        : view.charAt(0).toUpperCase() + view.slice(1);

      $("listTitle").textContent = view === "settings"
        ? "Project Settings"
        : view === "projects"
          ? "My Projects"
          : "Recent Projects";

      if (view === "settings") notify("Settings will be added in a future version.");
    });
  });
}
