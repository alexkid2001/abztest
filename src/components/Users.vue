<template>
    <div class="content-block users-block">
        <div class="content-block__wrap container">
            <h1 class="content-block__title">Our cheerful users</h1>
            <div class="content-block__description">Attention! Sorting users by registration date</div>
<!--            <div class="users-block__wrap">-->
<!--                <user v-for="(user, index) in users" :key="index"-->
<!--                      :imgUrl="user.photo"-->
<!--                      :name="user.name"-->
<!--                      :position="user.position"-->
<!--                      :email="user.email"-->
<!--                      :phone="user.phone"-->
<!--                >-->
<!--                </user>-->
<!--            </div>-->
            <div class="container-xl">
                <div class="row users-block__wrap">
                    <user v-for="(user, index) in users" :key="index"
                          :imgUrl="user.photo"
                          :name="user.name"
                          :position="user.position"
                          :email="user.email"
                          :phone="user.phone"
                          class="col-lg-4 col-md-4 col-sm-12 users-block__user"
                    >
                    </user>
                </div>
            </div>
            <div class="users-block__action">
                <button class="button" @click="moreUsers" :class="{'disabled': disableGetUsers}">Show more</button>
            </div>
        </div>
    </div>
</template>

<script>
  import User from "./User";
  import axios from 'axios';

  const baseUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1';

  export default {
    name: "Users",
    data() {
      return {
        currPage: 1,
        perPage: 6,
        users: [
          // {
          //   id: "30",
          //   name: "Maximillian",
          //   email: "controldepartment@gmail",
          //   phone: "+380 50 678 03 24",
          //   position: "Leading specialist of the Control Department",
          //   position_id: "4",
          //   registration_timestamp: 1537777441,
          //   photo: "https://frontend-test-assignment-api.abz.agency/images/users/5b977ba13fb3330.jpeg"
          // },
          // {
          //   id: "31",
          //   name: "Adolph Blaine Charles David Earl Matthew Matthew",
          //   email: "adolph.blainecharles@gmail.com",
          //   phone: "+380 50 678 03 24",
          //   position: "Contextual advertising specialist",
          //   position_id: "4",
          //   registration_timestamp: 1537777441,
          //   photo: "https://frontend-test-assignment-api.abz.agency/images/users/5b977ba13fb3330.jpeg"
          // },
          // {
          //   id: "32",
          //   name: "Elizabeth",
          //   email: "elisabet.front@gmail.com",
          //   phone: "+380 50 678 03 24",
          //   position: "Frontend developer",
          //   position_id: "4",
          //   registration_timestamp: 1537777441,
          //   photo: "https://frontend-test-assignment-api.abz.agency/images/users/5b977ba13fb3330.jpeg"
          // },
          // {
          //   id: "33",
          //   name: "Alexander Jayden",
          //   email: "alexander.back@gmail.com",
          //   phone: "+380 50 678 03 24",
          //   position: "Backend developer",
          //   position_id: "4",
          //   registration_timestamp: 1537777441,
          //   photo: "https://frontend-test-assignment-api.abz.agency/images/users/5b977ba13fb3330.jpeg"
          // },
          // {
          //   id: "34",
          //   name: "Noah",
          //   email: "noah1998@gmail.com",
          //   phone: "+380 50 678 03 24",
          //   position: "QA",
          //   position_id: "4",
          //   registration_timestamp: 1537777441,
          //   photo: "https://frontend-test-assignment-api.abz.agency/images/users/5b977ba13fb3330.jpeg"
          // },
          // {
          //   id: "34",
          //   name: "Liamgrievescasey Smith Wiam",
          //   email: "liamgrievescasey.smith@gmail.com",
          //   phone: "+380 50 678 03 24",
          //   position: "Lead designer",
          //   position_id: "4",
          //   registration_timestamp: 1537777441,
          //   photo: "https://frontend-test-assignment-api.abz.agency/images/users/5b977ba13fb3330.jpeg"
          // }
        ],
        disableGetUsers: false,
        totalPage: Infinity,
      }
    },
    components: {
      User,
    },
    methods: {
      getUsers() {
        const url = `${baseUrl}/users`;
        axios.get(url, {
              params: {
                page: this.currPage,
                count: this.perPage
              }
            })
            .then(resp => {
              this.users = this.users.concat(resp.data.users);
              this.totalPage = resp.data.total_pages;
              this.nextPagePrepare();
            })
            .catch(
                // err => {
              // console.log(err);
            // }
            );
      },
      moreUsers() {
        this.getUsers();
      },
      nextPagePrepare() {
        this.currPage < this.totalPage ? this.currPage++ : this.disableGetUsers = true;
      },
      reset() {
        this.users = [];
        this.disableGetUsers= false;
        this.totalPage = Infinity;
        this.currPage = 1;
        this.getUsers();
      },
      onResize() {
        this.perPage = document.documentElement.clientWidth < 768 ? 3 : 6;
      }
    },
    created(){
      window.addEventListener('resize', this.onResize);
      this.onResize();
    },
    mounted() {
      this.getUsers();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    }
  }
</script>

<style scoped>

</style>
