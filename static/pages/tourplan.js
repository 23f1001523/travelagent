const TourPlanner={
    template:`
      <div class="container-fluid py-4" ref="printSection">
          <div class="row p-5">
          <div class="col shadow-lg rounded">
            <h2 class="mb-4 text-primary text-center">
              <i class="bi bi-map-fill"></i> Plan Your Trip
            </h2>
              <router-link to="/" class="btn btn-primary mt-3">
              <i class="bi bi-arrow-left-circle"></i> Back to Home
              </router-link>
            <!-- Compact Inline Form -->
            <form @submit.prevent="planTrip" class="d-flex flex-wrap gap-3 mb-4 align-items-end justify-content-center">
              <div>
                <label class="form-label">Source</label>
                <input v-model="source" class="form-control" placeholder="From" required />
              </div>
              <div>
                <label class="form-label">Destination</label>
                <input v-model="destination" class="form-control" placeholder="To" required />
              </div>
              <div>
                <label class="form-label">Travel Date</label>
                <input v-model="travelDates" type="date" class="form-control" />
              </div>
              <div>
                <label class="form-label">Budget</label>
                <input v-model="budget" type="text" class="form-control" placeholder="e.g., ₹20000 - ₹40000" />
              </div>
              <div>
                <label class="form-label">Travelers</label>
                <input v-model="travelers" type="number" class="form-control" min="1" />
              </div>
              <div class="flex-grow-1">
                <label class="form-label">Preferences</label>
                <input v-model="preferences" type="text" class="form-control" placeholder="e.g., adventure, food, temples" />
              </div>
              <div>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-send-fill"></i> Generate
                </button>
              </div>
            </form>
        </div>
        </div>
        <!-- Loading Spinner -->
        <div v-if="loading" class="text-center my-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2">Creating your personalized trip plan...</p>
        </div>

        <!-- Error -->
        <div v-if="tripPlan?.error" class="alert alert-danger">{{ tripPlan.error }}</div>

        <!-- Trip Plan -->
       <div v-if="tripPlan && !tripPlan.error && !loading" class="row">
  <div class="col shadow-lg rounded">

    <!-- Actions on Top -->
    <div class="d-flex justify-content-end gap-3 my-3">
      <button @click="downloadPDF" class="btn btn-outline-success">
        <i class="bi bi-file-earmark-arrow-down"></i> Download PDF
      </button>
      <button @click="printPlan" class="btn btn-outline-secondary">
        <i class="bi bi-printer"></i> Print
      </button>
    </div>

    <!-- Report Introduction -->
    <div class="mb-3">
      <h5 class="text-muted">Here is your personalized and detailed travel plan based on your preferences.</h5>
      <p class="fst-italic">Explore recommended hotels, food spots, a day-wise itinerary, cost estimates, and useful travel tips.</p>
    </div>

    <!-- Scrollable Report Section -->
    <div style="max-height: 75vh; overflow-y: auto; padding-right: 10px;" class="pe-2">
      <!-- Duration -->
      <div class="mb-4">
        <h4 class="text-info"><i class="bi bi-clock"></i> Duration</h4>
        <p class="fs-5">{{ tripPlan.duration }}</p>
      </div>

      <!-- Hotels -->
      <div v-if="tripPlan.hotels?.length" class="mb-5">
        <h4 class="text-primary"><i class="bi bi-building-fill"></i> Hotels</h4>
        <div class="row">
          <div class="col-md-4 mb-3" v-for="(hotel, i) in tripPlan.hotels" :key="i">
            <div class="card border-primary shadow-sm">
              <div class="card-body">
                <h5 class="card-title text-danger">{{ hotel.name }}</h5>
                <p class="mb-1"><strong>Location:</strong> {{ hotel.location }}</p>
                <p class="mb-1"><strong>Price:</strong> {{ hotel.price_range }}</p>
                <p class="mb-1"><strong>Rating:</strong> <span v-html="getStars(hotel.rating)"></span></p>
                <p>{{ hotel.description }}</p>
                <a v-if="hotel.contact_or_website" :href="hotel.contact_or_website" target="_blank" class="btn btn-sm btn-outline-info">
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Food -->
      <div v-if="tripPlan.food_places?.length" class="mb-5">
        <h4 class="text-success"><i class="bi bi-cup-hot-fill"></i> Food Spots</h4>
        <div class="row">
          <div class="col-md-4 mb-3" v-for="(food, i) in tripPlan.food_places" :key="i">
            <div class="card border-success shadow-sm">
              <div class="card-body">
                <h5 class="card-title">{{ food.name }}</h5>
                <p><strong>Cuisine:</strong> {{ food.cuisine_type }}</p>
                <p><strong>Price:</strong> {{ food.price_level }}</p>
                <p><strong>Location:</strong> {{ food.location }}</p>
                <p><strong>Rating:</strong> <span v-html="getStars(food.rating)"></span></p>
                <a v-if="food.contact_or_website" :href="food.contact_or_website" target="_blank" class="btn btn-sm btn-outline-success">
                  Visit Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Itinerary -->
      <div v-if="tripPlan.itinerary?.length" class="mb-5">
        <h4 class="text-warning"><i class="bi bi-journal-text"></i> Itinerary</h4>
        <div v-for="(day, i) in tripPlan.itinerary" :key="i" class="mb-3 card shadow-sm border-warning">
          <div class="card-header bg-warning-subtle">
            <strong>Day {{ day.day }} - {{ day.location }}</strong> ({{ day.duration }})
          </div>
          <div class="card-body">
            <p>{{ day.activity }}</p>
            <small class="text-muted fst-italic">{{ day.notes }}</small>
          </div>
        </div>
      </div>

      <!-- Cost -->
      <div v-if="tripPlan.cost_estimate" class="mb-5">
        <h4 class="text-danger"><i class="bi bi-currency-rupee"></i> Cost Estimate</h4>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between" v-for="(val, key) in tripPlan.cost_estimate" :key="key">
            <span class="text-capitalize">{{ key.replace('_',' ') }}</span>
            <strong>{{ val }}</strong>
          </li>
        </ul>
      </div>

      <!-- Tips -->
      <div v-if="tripPlan.tips?.length" class="mb-4">
        <h4 class="text-secondary"><i class="bi bi-lightbulb-fill"></i> Travel Tips</h4>
        <ul class="list-group list-group-flush">
          <li v-for="(tip, i) in tripPlan.tips" :key="i" class="list-group-item">
            <i class="bi bi-check-circle-fill text-success me-2"></i> {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
    </div>    
    `,
    data() {
      return {
        source: '',
        destination: '',
        preferences: '',
        travelDates: '',
        budget: '',
        travelers: 1,
        tripPlan: null,
        loading: false,
      }
    },
    methods: {
      async planTrip() {
        this.loading = true
        this.tripPlan = null
        try {
          const response = await axios.post('/plantour', {
            source: this.source,
            destination: this.destination,
            preferences: `${this.preferences}. Budget: ${this.budget}. Date: ${this.travelDates}. Travelers: ${this.travelers}`
          })
          this.tripPlan = response.data.plan
        } catch (err) {
          this.tripPlan = { error: 'Unable to fetch trip plan', raw_text: err.message }
        } finally {
          this.loading = false
        }
      },
      getStars(rating) {
        if (!rating) return 'N/A'
        const full = Math.floor(rating)
        const half = rating % 1 >= 0.5
        let stars = '<span class="text-warning">'
        for (let i = 0; i < full; i++) stars += '<i class="bi bi-star-fill"></i>'
        if (half) stars += '<i class="bi bi-star-half"></i>'
        const empty = 5 - full - (half ? 1 : 0)
        for (let i = 0; i < empty; i++) stars += '<i class="bi bi-star"></i>'
        stars += '</span>'
        return stars
      },
      downloadPDF() {
        const el = this.$refs.printSection
        html2pdf().from(el).set({
          margin: 0.5,
          filename: 'trip-plan.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }).save()
      },
      printPlan() {
        const content = this.$refs.printSection.innerHTML
        const win = window.open('', '', 'width=800,height=700')
        win.document.write(`
          <html>
            <head>
              <title>Print Plan</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
            </head>
            <body>${content}</body>
          </html>
        `)
        win.document.close()
        win.print()
      }

    }
}

export default TourPlanner