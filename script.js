const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "PixelCraft Labs",
    domain: "Web Development",
    location: "Remote",
    type: "3 months",
    mode: "Remote",
    description: "Build responsive interfaces and reusable UI components using modern HTML, CSS and JavaScript."
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "InsightWorks",
    domain: "Data Science",
    location: "Bengaluru",
    type: "6 months",
    mode: "Hybrid",
    description: "Clean datasets, create dashboards and communicate useful business insights with data."
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Northstar Studio",
    domain: "Design",
    location: "Remote",
    type: "4 months",
    mode: "Remote",
    description: "Create accessible user flows, wireframes and polished interface designs for digital products."
  },
  {
    id: 4,
    title: "Backend Developer Intern",
    company: "CloudNest Systems",
    domain: "Backend Development",
    location: "Chennai",
    type: "6 months",
    mode: "On-site",
    description: "Work with REST APIs, databases and server-side logic to support scalable applications."
  },
  {
    id: 5,
    title: "Machine Learning Intern",
    company: "Nova Intelligence",
    domain: "Artificial Intelligence",
    location: "Remote",
    type: "5 months",
    mode: "Remote",
    description: "Prepare datasets and experiment with machine learning models under mentor guidance."
  },
  {
    id: 6,
    title: "Cybersecurity Intern",
    company: "SecureGrid",
    domain: "Cybersecurity",
    location: "Hyderabad",
    type: "3 months",
    mode: "Hybrid",
    description: "Learn security monitoring, vulnerability assessment and secure development practices."
  },
  {
    id: 7,
    title: "Full Stack Developer Intern",
    company: "BrightStack",
    domain: "Web Development",
    location: "Coimbatore",
    type: "6 months",
    mode: "Hybrid",
    description: "Develop end-to-end features across frontend and backend using JavaScript technologies."
  },
  {
    id: 8,
    title: "Business Analyst Intern",
    company: "MarketBridge",
    domain: "Business Analytics",
    location: "Mumbai",
    type: "4 months",
    mode: "On-site",
    description: "Translate business requirements into actionable insights, reports and process improvements."
  },
  {
    id: 9,
    title: "Cloud Engineering Intern",
    company: "Skyline Cloud",
    domain: "Cloud Computing",
    location: "Remote",
    type: "5 months",
    mode: "Remote",
    description: "Explore cloud infrastructure, deployment workflows and monitoring with experienced engineers."
  }
];

const grid = document.querySelector("#internship-grid");
const searchInput = document.querySelector("#search-input");
const domainFilter = document.querySelector("#domain-filter");
const clearButton = document.querySelector("#clear-filters");
const emptyClearButton = document.querySelector("#empty-clear");
const resultCount = document.querySelector("#result-count");
const statusMessage = document.querySelector("#status-message");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");
const retryButton = document.querySelector("#retry-button");
document.querySelector("#year").textContent = new Date().getFullYear();

function setupDomains() {
  const domains = [...new Set(internships.map((item) => item.domain))].sort();
  domainFilter.innerHTML = '<option value="all">All domains</option>';

  domains.forEach((domain) => {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    domainFilter.append(option);
  });
}

function createCard(item) {
  const article = document.createElement("article");
  article.className = "card";

  article.innerHTML = `
    <div class="card-top">
      <div>
        <p class="company">${item.company}</p>
        <h3>${item.title}</h3>
      </div>
      <span class="domain">${item.domain}</span>
    </div>

    <p class="card-description">${item.description}</p>

    <div class="meta" aria-label="Internship details">
      <span>${item.location}</span>
      <span>${item.mode}</span>
      <span>${item.type}</span>
    </div>

    <a class="card-link" href="#" data-id="${item.id}" aria-label="View ${item.title} at ${item.company}">
      View internship
    </a>
  `;

  return article;
}

function getFilteredInternships() {
  const query = searchInput.value.trim().toLowerCase();
  const domain = domainFilter.value;

  return internships.filter((item) => {
    const searchableText = [
      item.title,
      item.company,
      item.domain,
      item.location,
      item.mode,
      item.description
    ].join(" ").toLowerCase();

    const matchesSearch = !query || searchableText.includes(query);
    const matchesDomain = domain === "all" || item.domain === domain;

    return matchesSearch && matchesDomain;
  });
}

function render() {
  try {
    errorState.hidden = true;

    const filtered = getFilteredInternships();
    grid.replaceChildren();

    filtered.forEach((item) => grid.append(createCard(item)));

    const countText = `${filtered.length} ${filtered.length === 1 ? "internship" : "internships"} found`;
    resultCount.textContent = countText;
    statusMessage.textContent = filtered.length
      ? `Showing ${countText.toLowerCase()}.`
      : "No matching internships.";

    emptyState.hidden = filtered.length !== 0;
    grid.hidden = filtered.length === 0;
  } catch (error) {
    console.error(error);
    showError();
  }
}

function clearFilters() {
  searchInput.value = "";
  domainFilter.value = "all";
  render();
  searchInput.focus();
}

function showError() {
  grid.hidden = true;
  emptyState.hidden = true;
  errorState.hidden = false;
  resultCount.textContent = "";
  statusMessage.textContent = "Internship data could not be displayed.";
}

searchInput.addEventListener("input", render);
domainFilter.addEventListener("change", render);
clearButton.addEventListener("click", clearFilters);
emptyClearButton.addEventListener("click", clearFilters);
retryButton.addEventListener("click", () => {
  setupDomains();
  render();
});

/* Keyboard-friendly interaction: pressing "/" focuses search unless the user
   is already typing in another control. */
document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName;
  const isTyping = ["INPUT", "SELECT", "TEXTAREA"].includes(activeTag);

  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }
});

grid.addEventListener("click", (event) => {
  const link = event.target.closest("[data-id]");
  if (!link) return;

  event.preventDefault();
  const item = internships.find((internship) => internship.id === Number(link.dataset.id));

  statusMessage.textContent = item
    ? `${item.title} at ${item.company} selected.`
    : "Internship details are unavailable.";
});

setupDomains();
render();
