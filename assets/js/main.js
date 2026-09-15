// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initAnimations();
    initModal();
    initYear();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme === 'dark');
        
        // Add transition class to prevent flicker
        htmlElement.classList.add('no-transition');
        requestAnimationFrame(() => {
            htmlElement.classList.remove('no-transition');
        });
    });
    
    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.setAttribute('aria-label', 'Toggle light mode');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        }
    }
}

// Animation Initialization
function initAnimations() {
    // Initialize skill bar animations
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        // Set progress width based on the inline style
        const progressBar = item.querySelector('.skill-progress');
        if (progressBar) {
            const width = progressBar.parentElement.style.width || '0%';
            item.style.setProperty('--progress-width', width);
        }
        
        // Observe when skill items enter viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
    
    // Initialize timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
}

// Modal Functionality
function initModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContainer = document.getElementById('modalContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const projectBtns = document.querySelectorAll('.project-btn');
    
    // Project data
    const projects = {
        1: {
            title: 'E-Commerce Platform',
            description: 'Built a full-stack e-commerce platform using React, Node.js, AWS, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.',
            tech: ['React', 'Node.js', 'AWS (EC2, RDS, S3)', 'PostgreSQL', 'Redux', 'JWT Authentication'],
            features: [
                'User authentication and authorization',
                'Product catalog with search and filtering',
                'Shopping cart and checkout process',
                'Payment integration with Stripe',
                'Admin dashboard for inventory management',
                'Responsive design for mobile and desktop'
            ],
            challenges: [
                'Implemented JWT-based authentication with refresh token rotation',
                'Optimized database queries reducing response time by 65%',
                'Designed scalable microservices architecture',
                'Implemented CI/CD pipeline with automated testing'
            ],
            link: '#',
            github: '#'
        },
        2: {
            title: 'Real-time Analytics Dashboard',
            description: 'Created a real-time analytics dashboard for monitoring business metrics using WebSocket connections and streaming data processing.',
            tech: ['Vue.js', 'Python (FastAPI)', 'Apache Kafka', 'Redis', 'PostgreSQL', 'D3.js'],
            features: [
                'Real-time data visualization with WebSocket updates',
                'Customizable dashboard widgets',
                'Historical data analysis and reporting',
                'Alert system for threshold breaches',
                'Role-based access control',
                'Export reports in PDF and CSV formats'
            ],
            challenges: [
                'Handled high-volume data streams (10K+ events/second)',
                'Implemented efficient data aggregation algorithms',
                'Optimized WebSocket connections for low latency',
                'Designed fault-tolerant message processing system'
            ],
            link: '#',
            github: '#'
        },
        3: {
            title: 'Serverless Microservices Architecture',
            description: 'Designed and implemented a serverless microservices architecture using AWS Lambda, API Gateway, and DynamoDB for a scalable backend system.',
            tech: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Step Functions', 'SQS', 'CloudWatch'],
            features: [
                'Fully serverless backend with auto-scaling',
                'Event-driven architecture with SQS queues',
                'Workflow orchestration with Step Functions',
                'Comprehensive monitoring and logging',
                'Automated deployment with CloudFormation',
                'Cost optimization through resource right-sizing'
            ],
            challenges: [
                'Solved cold start issues with provisioned concurrency',
                'Implemented distributed tracing with X-Ray',
                'Designed idempotent operations for message processing',
                'Optimized Lambda functions for cost and performance'
            ],
            link: '#',
            github: '#'
        },
        4: {
            title: 'CI/CD Pipeline Automation',
            description: 'Automated continuous integration and deployment pipelines using GitHub Actions, Docker, Kubernetes, and Terraform for multiple microservices.',
            tech: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Helm', 'Prometheus', 'Grafana'],
            features: [
                'Multi-stage CI/CD pipelines with automated testing',
                'Infrastructure as Code with Terraform modules',
                'Blue-green deployment strategy',
                'Automated rollback on health check failures',
                'Security scanning and vulnerability assessment',
                'Performance monitoring and alerting'
            ],
            challenges: [
                'Implemented GitOps workflow with ArgoCD',
                'Optimized build times through layer caching',
                'Designed canary release strategies for risk mitigation',
                'Integrated security scanning in CI pipeline'
            ],
            link: '#',
            github: '#'
        }
    };
    
    // Open modal when project button is clicked
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-modal'));
            const project = projects[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                
                // Build modal content
                modalBody.innerHTML = `
                    <p class="mb-4">${project.description}</p>
                    
                    <div class="mb-4">
                        <h3 class="font-semibold mb-2">Technologies Used</h3>
                        <div class="flex flex-wrap gap-2">
                            ${project.tech.map(tech => `<span class="badge bg-primary">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <h3 class="font-semibold mb-2">Key Features</h3>
                        <ul class="list-disc list-inside space-y-2">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="mb-4">
                        <h3 class="font-semibold mb-2">Technical Challenges Overcome</h3>
                        <ul class="list-disc list-inside space-y-2">
                            ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="flex justify-end space-x-3">
                        <a href="${project.link}" target="_blank" class="btn btn-sm btn-secondary">Live Demo</a>
                        <a href="${project.github}" target="_blank" class="btn btn-sm btn-primary">GitHub Repository</a>
                    </div>
                `;
                
                // Show modal
                modalOverlay.classList.add('active');
                
                // Focus trap for accessibility
                const focusableElements = modalContainer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                function trapFocus(e) {
                    if (e.key === 'Tab') {
                        if (e.shiftKey) { // shift + tab
                            if (document.activeElement === firstFocusable) {
                                e.preventDefault();
                                lastFocusable.focus();
                            }
                        } else { // tab
                            if (document.activeElement === lastFocusable) {
                                e.preventDefault();
                                firstFocusable.focus();
                            }
                        }
                    }
                    
                    // Close modal with Escape key
                    if (e.key === 'Escape') {
                        closeModal();
                    }
                }
                
                document.addEventListener('keydown', trapFocus);
                firstFocusable.focus();
            }
        });
    });
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.removeEventListener('keydown', trapFocus);
    }
}

// Initialize current year in footer
function initYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Form validation and submission will be handled in form.js
// Timeline animations will be handled in timeline.js