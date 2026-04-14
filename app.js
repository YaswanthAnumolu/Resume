const data = window.resumeData;

const heroName = document.getElementById("hero-name");
const heroSummary = document.getElementById("hero-summary");
const heroHook = document.getElementById("hero-hook");
const heroIntro = document.getElementById("hero-intro");
const heroRibbon = document.getElementById("hero-ribbon");
const heroMetrics = document.getElementById("hero-metrics");
const snapshotRole = document.getElementById("snapshot-role");
const snapshotGrid = document.getElementById("snapshot-grid");
const powerGrid = document.getElementById("power-grid");
const timelineList = document.getElementById("timeline-list");
const timelineDetail = document.getElementById("timeline-detail");
const projectGrid = document.getElementById("project-grid");
const skillCloud = document.getElementById("skill-cloud");
const principles = document.getElementById("principles");
const recruiterGrid = document.getElementById("recruiter-grid");
const educationGrid = document.getElementById("education-grid");
const credentialGrid = document.getElementById("credential-grid");
const contactSummary = document.getElementById("contact-summary");
const contactLinks = document.getElementById("contact-links");

let activeIndex = 0;

function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function renderHero() {
  heroName.textContent = data.hero.name;
  heroSummary.textContent = data.hero.summary;
  heroHook.textContent = data.hero.hook;

  data.hero.intro.forEach((item) => {
    heroIntro.append(el("div", "hero-intro-card", item));
  });

  data.hero.ribbon.forEach((item) => {
    heroRibbon.append(el("span", "hero-pill", item));
  });

  data.hero.metrics.forEach((item, index) => {
    const card = el("div", `metric fade-up delay-${Math.min(index, 3)}`);
    const value = el("strong", "", item.value);
    const label = el("span", "", item.label);
    card.append(value, label);
    heroMetrics.append(card);
  });

  const role = el("div", "snapshot-role");
  role.append(
    el("strong", "", data.hero.snapshot.title),
    el("span", "", data.hero.snapshot.subtitle)
  );
  snapshotRole.append(role);

  data.hero.snapshot.facts.forEach((fact) => {
    snapshotGrid.append(el("div", "fact-card", fact));
  });
}

function renderPowerSections() {
  data.powerSections.forEach((item) => {
    const card = el("article", "power-card");
    card.append(el("h4", "", item.title), el("p", "", item.body));
    powerGrid.append(card);
  });
}

function renderCredentials() {
  data.education.forEach((item) => {
    const card = el("article", "credential-card");
    card.append(el("h4", "", item.title), el("p", "", item.subtitle), el("p", "", item.meta));
    educationGrid.append(card);
  });

  data.credentials.forEach((item) => {
    const card = el("article", "credential-card");
    card.append(el("h4", "", item.title), el("p", "", item.subtitle), el("p", "", item.meta));
    credentialGrid.append(card);
  });
}

function renderTimeline() {
  timelineList.innerHTML = "";

  data.experience.forEach((job, index) => {
    const button = document.createElement("button");
    button.className = `timeline-item ${index === activeIndex ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <p><strong>${job.role}</strong> at ${job.company}</p>
      <small>${job.period}</small><br />
      <small>${job.theme}</small>
    `;
    button.addEventListener("click", () => {
      activeIndex = index;
      renderTimeline();
      renderDetail(job);
    });
    timelineList.append(button);
  });

  renderDetail(data.experience[activeIndex]);
}

function renderDetail(job) {
  timelineDetail.innerHTML = "";

  const titleRow = el("div", "detail-title fade-up");
  const titleWrap = el("div");
  const roleHeading = document.createElement("h4");
  roleHeading.textContent = `${job.role} | ${job.type}`;

  titleWrap.append(el("p", "eyebrow", job.company), roleHeading, el("p", "", job.summary));

  const metaWrap = el("div", "");
  metaWrap.append(el("small", "", job.period), el("small", "", job.location));
  titleRow.append(titleWrap, metaWrap);

  const chipRow = el("div", "chip-row fade-up delay-1");
  chipRow.append(el("span", "chip", job.theme));

  const impactRow = el("div", "impact-row fade-up delay-1");
  job.impact.forEach((item) => {
    impactRow.append(el("span", "impact-chip", item));
  });

  const highlights = el("ul", "detail-list fade-up delay-2");
  job.highlights.forEach((point) => {
    const li = el("li", "", point);
    highlights.append(li);
  });

  const stackRow = el("div", "stack-row fade-up delay-3");
  job.stack.forEach((item) => {
    stackRow.append(el("span", "stack", item));
  });

  timelineDetail.append(titleRow, chipRow, impactRow, highlights, stackRow);
}

function renderProjects() {
  data.projects.forEach((project, index) => {
    const card = el("article", `project-card fade-up delay-${Math.min(index, 3)}`);
    card.append(
      el("p", "eyebrow", project.subtitle),
      el("h4", "", project.title),
      el("p", "", project.description)
    );

    const list = el("ul", "");
    project.bullets.forEach((bullet) => list.append(el("li", "", bullet)));
    card.append(list);
    projectGrid.append(card);
  });
}

function renderSkills() {
  data.skillGroups.forEach((group) => {
    const card = el("article", "skill-group");
    card.append(el("h4", "", group.name));
    const tags = el("div", "skill-tags");
    group.skills.forEach((skill) => tags.append(el("span", "skill-tag", skill)));
    card.append(tags);
    skillCloud.append(card);
  });
}

function renderPrinciples() {
  data.principles.forEach((item) => {
    const card = el("div", "principle-card");
    card.append(el("p", "", item));
    principles.append(card);
  });
}

function renderRecruiterReasons() {
  data.recruiterReasons.forEach((item, index) => {
    const card = el("div", "recruiter-card");
    card.append(el("strong", "", `0${index + 1}`), el("p", "", item));
    recruiterGrid.append(card);
  });
}

function renderContact() {
  contactSummary.textContent = data.contact.summary;
  data.contact.links.forEach((item) => {
    const card = el("div", "contact-link");
    const anchor = document.createElement("a");
    anchor.href = item.href;
    anchor.textContent = item.value;
    anchor.target = item.href.startsWith("http") ? "_blank" : "_self";
    anchor.rel = "noreferrer";
    card.append(el("span", "", item.label), anchor);
    contactLinks.append(card);
  });
}

function attachTilt() {
  document.querySelectorAll(".hero, .timeline-detail, .project-card, .timeline-item, .skill-group").forEach((node) => {
    node.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 980) {
        return;
      }

      const bounds = node.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
      const rotateX = offsetY * -3;
      const rotateY = offsetX * 4;
      const scale = node.classList.contains("hero") ? 1.015 : 1.025;
      node.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    });

    node.addEventListener("mouseleave", () => {
      node.style.transform = "";
    });
  });
}

renderHero();
renderPowerSections();
renderTimeline();
renderProjects();
renderSkills();
renderPrinciples();
renderRecruiterReasons();
renderCredentials();
renderContact();
attachTilt();
