<template>
    <div>
        <div class="header">
            <div class="container-xl header__wrap">
                <a href="#registration" class="header__logo">
                    <img src="/assets/images/logo.svg" alt="logo">
                </a>
                <div class="header__menu-btn">
                    <img src="/assets/images/menu icon.svg" @click="showMenu" alt="menu-icon">
                </div>

                <ul class="header__desktop-menu header-menu">
                    <li class="header-menu__item">
                        <a href="#registration">About me</a>
                    </li>
                    <li class="header-menu__item">
                        <a href="#registration">Relationships</a>
                    </li>
                    <li class="header-menu__item">
                        <a href="#registration">Requirements</a>
                    </li>
                    <li class="header-menu__item">
                        <a href="#registration">Users</a>
                    </li>
                    <li class="header-menu__item">
                        <a href="#registration">Sign Up</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mobile-menu" ref="mobileMenu" @click="menuClick">
            <div class="mobile-menu__logo">
                <img src="/assets/images/logo.svg" alt="logo">
            </div>
            <ul class="mobile-menu__list">
                <li class="mobile-menu__item">
                    <a href="#registration">About me</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Relationships</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Users</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Sign Up</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Terms and Conditions</a>
                </li>
            </ul>
            <ul class="mobile-menu__list">
                <li class="mobile-menu__item">
                    <a href="#registration">How it works</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Partnership</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Help</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Leave testimonial</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Contact us</a>
                </li>
            </ul>
            <ul class="mobile-menu__list">
                <li class="mobile-menu__item">
                    <a href="#registration">Articles</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Our news</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Testimonials</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Licenses</a>
                </li>
                <li class="mobile-menu__item">
                    <a href="#registration">Privacy Policy</a>
                </li>
            </ul>
        </div>
    </div>
</template>



<script>
const body = document.querySelector('body');
export default {
  name: "TopMenu",
  data() {
    return {
      mobileMenuActive: false
    }
  },
  methods: {
    showMenu(event) {
      // console.log(this.$refs.mobileMenu);
      this.$refs.mobileMenu.classList.toggle('open');
      body.classList.add('overlay');
      event.stopPropagation();
      body.addEventListener('click', this.hideMenu)
    },
    menuClick(event) {
      console.log(event.target);
      if(event.target.tagName !=  'A') {
        event.stopPropagation();
      } else {
        this.hideMenu();
      }
    },
    hideMenu() {
      this.$refs.mobileMenu.classList.remove('open');
      body.classList.remove('overlay');
      body.removeEventListener('click', this.hideMenu);
    }
  }
};
</script>

<style scoped></style>
