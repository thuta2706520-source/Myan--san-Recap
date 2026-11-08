const STORAGE_KEY = "myanmarRecapProjects";
let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function saveProjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  renderProjects();
}

function createProject(projectData) {
  const project = {
    id: Date.now().toString(),
    name: projectData.name,
    type: projectData.type,
    language: projectData.language,
    status: "Draft",
    date: new Date().toLocaleDateString()
  };

  projects.unshift(project);
  saveProjects();
  return project;
}

function changeProjectStatus(id) {
  const project = projects.find(item => item.id === id);
  if (!project) return;

  const statuses = ["Draft", "In Progress", "Completed"];
  const currentIndex = statuses.indexOf(project.status);
  project.status = statuses[(currentIndex + 1) % statuses.length];

  saveProjects();
  notify("Project status updated!");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function renderProjects() {
  $("totalCount").textContent = projects.length;
  $("progressCount").textContent = projects.filter(p => p.status === "In Progress").length;
  $("completedCount").textContent = projects.filter(p => p.status === "Completed").length;
  $("draftCount").textContent = projects.filter(p => p.status === "Draft").length;

  const query = $("search").value.trim().toLowerCase();
  const filter = $("filter").value;
  const visibleProjects = projects.filter(project =>
    project.name.toLowerCase().includes(query) &&
    (filter === "all" || project.status === filter)
  );

  $("projectGrid").innerHTML = visibleProjects.length
    ? visibleProjects.map(project => `
      <article class="project">
        <div class="project-top">
          <div class="project-icon">${project.type.includes("Animation") ? "🎬" : project.type.includes("Series") ? "📺" : "🎞️"}</div>
          <span class="tag ${project.status === "Draft" ? "draft" : ""}">${escapeHTML(project.status)}</span>
        </div>
        <h4>${escapeHTML(project.name)}</h4>
        <p>${escapeHTML(project.type)} · ${escapeHTML(project.language)}</p>
        <div class="progress"><span style="width:${project.status === "Completed" ? 100 : project.status === "In Progress" ? 45 : 8}%"></span></div>
        <div class="project-foot">
          <span>Created ${escapeHTML(project.date)}</span>
          <button type="button" data-status-id="${escapeHTML(project.id)}">Change status ↗</button>
        </div>
      </article>
    `).join("")
    : '<div class="empty">ဒီမှာ Project မရှိသေးပါ။ ＋ New Project ကိုနှိပ်ပြီး စတင်ဖန်တီးပါ။</div>';
}
