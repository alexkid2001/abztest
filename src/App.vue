<template>
  <div id="app">
    <Header />
    <Banner />
    <Acquaint />
    <div class="observe-label" ref="observeLabel" ></div>
    <Users ref="users" v-if="showComponents"/>
    <UserForm
        @registered="resetUsers"
        @alarm="alarm"
        v-if="showComponents"
    />
    <Footer />
    <Modal
        :title="modalTitle"
        :message="modalMsg"
        :btn-title="modalBtnTitle"
        :show="modalVisible"
        @closeModal="closeModal"
    />
<!--    <div class="modal-backdrop show"></div>-->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Acquaint from "./components/Acquaint";
import Users from "./components/Users";
import UserForm from "./components/UserForm";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import "./styles/common.scss";

const body = document.querySelector('body');
const modalTitleSuccess = 'Congratulations';
const modalMsgSuccess = 'You have successfully passed the registration';
const modalBtnSuccess = 'Great';
// const Users = () => import('./components/Users');
// const UserForm = () => import('./components/UserForm');

export default {
  name: "app",
  components: {
    Header,
    Banner,
    Acquaint,
    Users,
    UserForm,
    Footer,
    Modal
  },
  data() {
    return {
      modalTitle: '',
      modalMsg:  '',
      modalBtnTitle: '',
      showComponents: false,
      modalVisible: false
    };
  },
  methods: {
    resetUsers() {
      this.modalTitle = modalTitleSuccess;
      this.modalMsg = modalMsgSuccess;
      this.modalBtnTitle = modalBtnSuccess;
      this.showModal();
      this.$refs.users.reset();
    },
    alarm(params) {
      this.modalTitle = params.title;
      this.modalMsg = params.message;
      this.modalBtnTitle = 'Try again';
      this.showModal();
    },
    closeModal() {
      body.classList.remove('overlay');
      this.modalVisible = false;
    },
    showModal() {
      this.modalVisible = true;
      body.classList.add('overlay');
    },
    handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          this.showComponents = true;
          observer.unobserve(this.$refs.observeLabel);
        }
      });
    },
    createObserve() {
      const option = {
        root: null,
        threshold: '0'
      }
      const observer = new IntersectionObserver(this.handleIntersect, option);
      observer.observe(this.$refs.observeLabel);
    }
  },
  mounted() {
    if(!window["IntersectionObserver"]) {
      this.showComponents = true;
    } else {
      this.createObserve();
    }
  }
};
</script>

