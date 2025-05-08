// DOM Elements
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;
const printBtn = document.getElementById('print-btn');
const lastUpdated = document.getElementById('last-updated');

// Data
const aboutContent = `
  <p>I'm a passionate full-stack developer with experience building web applications from concept to deployment. My journey in tech began with a deep curiosity about how things work, which led me to teach myself programming while traveling through Central America.</p>
  
  <p>What sets me apart is my ability to adapt to new technologies quickly and my problem-solving mindset. I thrive in environments where I can tackle complex challenges and create efficient, user-friendly solutions.</p>
  
  <p>When I'm not coding, you can find me hiking in the mountains, contributing to open-source projects, or learning about new technologies. I believe in continuous learning and pushing myself outside my comfort zone.</p>
  
  <div class="fun-fact">
    <strong>Fun fact:</strong> I once built a web app while camping in the Costa Rican jungle, powered by solar panels!
  </div>
`;

const experienceData = [
  {
    date: "2023 - Present",
    title: "Freelance Full-Stack Developer",
    company: "Self-employed",
    description: "Developed web and mobile applications for clients across various industries.",
    details: [
      "Built custom WordPress themes and plugins for small businesses",
      "Developed bilingual (English/Spanish) interfaces for Latin American clients",
      "Created automation scripts to streamline client workflows",
      "Implemented CI/CD pipelines for client projects"
    ]
  },
  {
    date: "2021 - 2023",
    title: "Web Development Consultant",
    company: "Various Clients",
    description: "Provided technical solutions and consulting services to startups and small businesses.",
    details: [
      "Migrated legacy systems to modern web frameworks",
      "Optimized website performance leading to 40% faster load times",
      "Trained non-technical teams on CMS platforms",
      "Implemented analytics and tracking for better user insights"
    ]
  }
];

const educationData = [
  {
    institution: "Aims Community College",
    degree: "Full Stack Web Development",
    year: "2020 - 2021",
    highlights: [
      "Focus on JavaScript, PHP, and database design",
      "Completed capstone project with local business"
    ]
  },
  {
    institution: "Colt Steele's Web Developer Bootcamp",
    degree: "Certificate of Completion",
    year: "2021",
    highlights: [
      "Comprehensive full-stack curriculum",
      "Built 10+ projects including YelpCamp clone"
    ]
  }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Set last updated date
  const updateDate = new Date();
  lastUpdated.textContent = `Last updated: ${updateDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`;
  
  // Load content
  loadAboutContent();
  loadSkills();
  loadProjects();
  loadExperience();
  loadEducation();
  
  // Load GitHub data
  fetchGitHubData();
  
  // Set up event listeners
  setupEventListeners();
});

// Load about content
function loadAboutContent() {
  const aboutContainer = document.getElementById('about-content');
  aboutContainer.innerHTML = aboutContent;
}

// Load skills
function loadSkills() {
  fetch('data/skills.json')
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
        <p>Unable to load skills at this time. Please check back later.</p>
      `;
    });
}

// Load projects
function loadProjects() {
  fetch('data/projects.json')
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
              <strong>Technologies:</strong> ${project.technologies.join(', ')}
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
        <p>Unable to load projects at this time. Please check back later.</p>
      `;
    });
}

// Load experience
function loadExperience() {
  const experienceContainer = document.getElementById('experience-container');
  let experienceHTML = '';
  
  experienceData.forEach(exp => {
    experienceHTML += `
      <div class="timeline-item">
        <div class="timeline-date">${exp.date}</div>
        <div class="timeline-title">${exp.title} • ${exp.company}</div>
        <div class="timeline-description">${exp.description}</div>
        <ul class="timeline-details">
          ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
      </div>
    `;
  });
  
  experienceContainer.innerHTML = experienceHTML;
}

// Load education
function loadEducation() {
  const educationContainer = document.getElementById('education-container');
  let educationHTML = '';
  
  educationData.forEach(edu => {
    educationHTML += `
      <div class="education-item">
        <h3>${edu.institution}</h3>
        <p>${edu.degree} • ${edu.year}</p>
        <ul>
          ${edu.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
      </div>
    `;
  });
  
  educationContainer.innerHTML = educationHTML;
}

// Fetch GitHub data
function fetchGitHubData() {
  const username = 'AnthonyHernandez5150';
  
  // Fetch user data
  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('repo-count').textContent = data.public_repos || '0';
    })
    .catch(error => console.error('Error fetching GitHub user data:', error));
  
  // Fetch repos (to count stars)
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      const starCount = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      document.getElementById('star-count').textContent = starCount;
    })
    .catch(error => console.error('Error fetching GitHub repos:', error));
  
  // Fetch recent activity
  fetch(`https://api.github.com/users/${username}/events`)
    .then(response => response.json())
    .then(events => {
      const activityFeed = document.getElementById('activity-feed');
      let activityHTML = '';
      const recentEvents = events.slice(0, 5); // Get 5 most recent events
      
      recentEvents.forEach(event => {
        let action = '';
        let description = '';
        
        switch(event.type) {
          case 'PushEvent':
            action = 'pushed to';
            description = event.payload.commits[0].message;
            break;
          case 'CreateEvent':
            action = 'created';
            description = `${event.payload.ref_type} in ${event.repo.name}`;
            break;
          case 'PullRequestEvent':
            action = event.payload.action === 'opened' ? 'opened PR in' : 'updated PR in';
            description = `#${event.payload.pull_request.number}: ${event.payload.pull_request.title}`;
            break;
          case 'IssuesEvent':
            action = event.payload.action === 'opened' ? 'opened issue in' : 'updated issue in';
            description = `#${event.payload.issue.number}: ${event.payload.issue.title}`;
            break;
          default:
            action = 'performed action in';
            description = event.repo.name;
        }
        
        const date = new Date(event.created_at).toLocaleDateString();
        
        activityHTML += `
          <div class="activity-item">
            <div class="activity-item-header">
              <span>${date}</span>
              <span>${event.type.replace('Event', '')}</span>
            </div>
            <div class="activity-item-title">
              ${action} ${event.repo.name.replace(`${username}/`, '')}
            </div>
            <div class="activity-item-desc">
              ${description}
            </div>
          </div>
        `;
      });
      
      // Update commit count
      const pushEvents = events.filter(e => e.type === 'PushEvent');
      document.getElementById('commit-count').textContent = pushEvents.length;
      
      activityFeed.innerHTML = activityHTML || '<p>No recent activity found</p>';
    })
    .catch(error => {
      console.error('Error fetching GitHub activity:', error);
      document.getElementById('activity-feed').innerHTML = `
        <p>Unable to load GitHub activity at this time.</p>
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
    darkModeToggle.querySelector('.dark-mode-icon').style.display = 'none';
    darkModeToggle.querySelector('.light-mode-icon').style.display = 'block';
  }
  
  // Print button
  printBtn.addEventListener('click', () => {
    window.print();
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

// Toggle dark mode
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  
  if (isDarkMode) {
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.querySelector('.dark-mode-icon').style.display = 'none';
    darkModeToggle.querySelector('.light-mode-icon').style.display = 'block';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkModeToggle.querySelector('.dark-mode-icon').style.display = 'block';
    darkModeToggle.querySelector('.light-mode-icon').style.display = 'none';
  }
}

// Animation on scroll
function animateOnScroll() {
  const cards = document.querySelectorAll('.card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);
