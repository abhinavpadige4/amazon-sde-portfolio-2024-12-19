// Theme JavaScript File
// This file handles theme-related functionality that complements main.js

document.addEventListener('DOMContentLoaded', function() {
    // Additional theme-specific functionality can go here
    // For now, the main theme toggle is handled in main.js
    
    // Example: Add theme-specific class to body for CSS targeting
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    
    // Add a class for easier CSS targeting if needed
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const newTheme = mutation.target.getAttribute('data-theme');
                document.body.classList.remove('dark-theme', 'light-theme');
                document.body.classList.add(`${newTheme}-theme`);
            }
        });
    });
    
    observer.observe(htmlElement, { attributes: true });
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only change theme if no user preference is set
    if (!localStorage.getItem('theme')) {
        const htmlElement = document.documentElement;
        if (e.matches) {
            htmlElement.setAttribute('data-theme', 'dark');
            // Update theme toggle icon if needed
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                    themeToggle.setAttribute('aria-label', 'Toggle light mode');
                }
            }
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            // Update theme toggle icon if needed
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
                }
            }
        }
    }
});