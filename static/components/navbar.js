
const Navbar= {
    template: `
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand fw-5 bg-tertiary text-primary">Travel Agent</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-lg-0">
            <li class="nav-item bg-tertiary">
              <router-link to="/" class="nav-link" exact>Home</router-link>
            </li>
            <li class="nav-item bg-tertiary">
              <router-link to='/contactus' class='nav-link'>Contact</router-link>
            </li>
            <li class="nav-item bg-tertiary">
              <router-link to='/about' class='nav-link'>About</router-link>
            </li>
          
          </ul>
          <div class="theme-switcher me-auto">
            <span class="sun-icon" onclick="toggleTheme()"><i id="sun" class="bi bi-brightness-high"></i></span>
            <span class="moon-icon" onclick="toggleTheme()"><i id="moon" class="bi bi-moon-stars moon-icon" ></i></span>
          </div>
           <ul class="navbar-nav ms-auto mb-lg-0 me-3">
            <li class="nav-item">
              <!-- <router-link to='/'><button class="mybtn btn-sm"><i class="bi bi-box-arrow-in-right"></i> Login</button></router-link> -->
              <button class="mybtn btn-sm" @click="showLoginModal"><i class="bi bi-box-arrow-in-right"></i> Login</button>
            </li>
              <li class="nav-item">
                <router-link to='/'><button class="mybtn-danger ms-2"><i class="bi bi-box-arrow-in-right"></i> SignUp</button></router-link>
              </li>
          </ul>
          
      </div>
    </div>
  </nav>

  
    `,
  }
  
  export default Navbar
  