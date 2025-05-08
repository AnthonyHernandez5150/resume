// DOM Elements
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;
const printBtn = document.getElementById('print-btn');
const lastUpdated = document.getElementById('last-updated');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Set last updated date
  const updateDate = new Date();
  lastUpdated.textContent = `Last updated: ${updateDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`;
  
  // Load dynamic content
  loadSkills();
  loadProjects();
  
  // Set up event listeners
  setupEventListeners();
});

// Load skills from JSON
function loadSkills() {
  fetch('skills-data.json')
    .then(response => response.json())
    .then(skills => {
      const skillsContainer = document.getElementById('skills-container');
      let skillsHTML = '';
      
      skills.forEach(category => {
        skillsHTML += `
          <div class="skill-category">
            <h3>${category.category}</h3>
            <ul class="skill-list">
              ${category.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `;
      });
      
      skillsContainer.innerHTML = skillsHTML;
    })
    .catch(error => {
      console.error('Error loading skills:', error);
      document.getElementById('skills-container').innerHTML = `
        <p class="error">Unable to load skills at this time.</p>
      `;
    });
}

// Load projects from JSON
function loadProjects() {
  fetch('projects-data.json')
    .then(response => response.json())
    .then(projects => {
      const projectsContainer = document.getElementById('projects-container');
      let projectsHTML = '';
      
      projects.forEach(project => {
        projectsHTML += `
          <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
              <strong>Technologies:</strong>
              ${project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
              ).join('')}
            </div>
            <div class="project-links">
              ${project.links.demo ? `<a href="${project.links.demo}" target="_blank">Live Demo</a>` : ''}
              ${project.links.code ? `<a href="${project.links.code}" target="_blank">View Code</a>` : ''}
            </div>
          </div>
        `;
      });
      
      projectsContainer.innerHTML = projectsHTML;
    })
    .catch(error => {
      console.error('Error loading projects:', error);
      document.getElementById('projects-container').innerHTML = `
        <p class="error">Unable to load projects. <a href="projects-data.json" target="_blank">View raw data</a></p>
      `;
    });
}

// Set up event listeners
function setupEventListeners() {
  // Dark mode toggle
  darkModeToggle.addEventListener('click', toggleDarkMode);
  
  // Check for saved user preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
  }
  
  // Print button
  printBtn.addEventListener('click', () => {
    window.print();
  });
}

// Toggle dark mode
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}
