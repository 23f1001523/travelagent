const Home={
    template:`
    <div class="container text-center py-5">
    <h1 class="display-4 mb-3">
      <i class="bi bi-compass-fill text-primary"></i> Welcome to Tour Planner AI
    </h1>
    <p class="lead mb-4">
      Plan your perfect trip with personalized itineraries, hotel & food recommendations powered by AI.
    </p>

    <img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
      alt="Travel"
      class="img-fluid rounded shadow mb-4"
      style="max-height: 350px; object-fit: cover;"
    />

    <div>
      <router-link to="/tourplan" class="btn btn-primary btn-lg me-3">
        <i class="bi bi-geo-alt-fill"></i> Plan Your Trip
      </router-link>
      <router-link to="/about" class="btn btn-outline-secondary btn-lg">
        <i class="bi bi-info-circle-fill"></i> About
      </router-link>
    </div>

    <footer class="mt-5 text-muted">
      &copy; 2025 Tour Planner AI. Made with ❤️ using Vue, Flask & Gemini AI.
    </footer>
  </div>
    `
}

export default Home