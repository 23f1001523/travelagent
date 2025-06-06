// Toggle between light and dark theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.opacity = 0;  // Hide sun icon
        moonIcon.style.opacity = 1;  // Show moon icon
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        sunIcon.style.opacity = 1;  // Show sun icon
        moonIcon.style.opacity = 0;  // Hide moon icon
    }

}

function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
        if (storedTheme === 'dark') {
            sunIcon.style.opacity = 0;  // Hide sun icon in dark mode
            moonIcon.style.opacity = 1;  // Show moon icon in dark mode
        } else {
            sunIcon.style.opacity = 1;  // Show sun icon in light mode
            moonIcon.style.opacity = 0;  // Hide moon icon in light mode
        }
    } else {
        // Default theme (light)
        document.documentElement.setAttribute('data-theme', 'light');
        sunIcon.style.opacity = 1;  // Show sun icon
        moonIcon.style.opacity = 0;  // Hide moon icon
    }
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', applyStoredTheme);