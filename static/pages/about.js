const About={
    template:`
    <div class="container py-5">
        <h1 class="mb-4"><i class="bi bi-info-circle-fill text-primary"></i> About Tour Planner AI</h1>

        <p class="lead">
        Tour Planner AI helps you create personalized travel itineraries with ease. Powered by cutting-edge AI models like Gemini, 
        it suggests the best places to visit, hotels, food spots, and travel tips tailored to your preferences.
        </p>

        <h3 class="mt-4">Features</h3>
        <ul class="list-group list-group-flush mb-4">
        <li class="list-group-item">
            <i class="bi bi-check-circle-fill text-success me-2"></i> Personalized daily itineraries
        </li>
        <li class="list-group-item">
            <i class="bi bi-check-circle-fill text-success me-2"></i> Hotel and food recommendations with booking links
        </li>
        <li class="list-group-item">
            <i class="bi bi-check-circle-fill text-success me-2"></i> Estimated cost breakdown and travel tips
        </li>
        <li class="list-group-item">
            <i class="bi bi-check-circle-fill text-success me-2"></i> PDF download and print your plans easily
        </li>
        </ul>

        <h3>Technologies Used</h3>
        <p>
        This app is built with:
        <ul>
            <li>Vue.js for the frontend</li>
            <li>Flask as the backend server</li>
            <li>SQLite for data storage</li>
            <li>Gemini AI for generating smart travel plans</li>
        </ul>
        </p>

        <h3>Contact</h3>
        <p>
        For questions or feedback, please reach out via <a href="mailto:support@tourplannerai.com">support@tourplannerai.com</a>.
        </p>

        <router-link to="/" class="btn btn-primary mt-3">
        <i class="bi bi-arrow-left-circle"></i> Back to Home
        </router-link>
    </div>

`
}

export default About