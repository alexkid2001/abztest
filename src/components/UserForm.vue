<template>
    <div class="content-block registration-form-block" id="registration">
        <div class="content-block__wrap">
            <h1 class="content-block__title">Register to get a work</h1>
            <div class="content-block__description">Attention! After successful registration and alert, update the list of users in the block from the top</div>
            <div class="container-xl">
                <div class="row justify-content-md-center">
                    <div class="col col-lg-6 col-md-8">
                        <form @submit="checkForm"
                              class="registration-form"
                        >
                            <div class="form-group">
                                <label for="nameInput">Name</label>
                                <input type="text"
                                       class="form-control"
                                       id="nameInput"
                                       placeholder="Your name"
                                       v-model.trim="params.name"
                                       :class="{ 'is-invalid' : errors.name}"
                                >
                                <div class="invalid-feedback">
                                    Please provide a valid name.
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="emailInput">Email</label>
                                <input type="text"
                                       class="form-control"
                                       id="emailInput"
                                       placeholder="Your email"
                                       v-model.trim="params.email"
                                       :class="{ 'is-invalid' : errors.email}"
                                >
                                <div class="invalid-feedback">
                                    Please provide a valid email.
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phoneInput">Phone number</label>
                                <input type="text"
                                       class="form-control"
                                       id="phoneInput"
                                       placeholder="+380 XX XXX XX XX"
                                       v-model.trim="params.phone"
                                       :class="{ 'is-invalid' : errors.phone }"
                                >
                                <div class="invalid-feedback">
                                    Please provide a valid email.
                                </div>
                                <small id="emailHelp" class="form-text text-muted">Еnter phone number in open format</small>
                            </div>

                            <div class="form-group registration-form__positions">
                                <legend class="col-form-label">Select your position {{params.position_id}}</legend>
                                <div class="custom-control custom-radio" v-for="(position, index) in positions" :key="position.id">
                                    <input type="radio"
                                           class="custom-control-input"
                                           :id="`position${position.id}`"
                                           name="radio-position"
                                           :value="position.id"
                                           v-model="params.position_id"
                                           :class="{ 'is-invalid' : errors.position_id }"
                                    >
                                    <label class="custom-control-label" :for="`position${position.id}`">{{ position.name }}</label>
                                  <div class="invalid-feedback" v-if="index === positions.length - 1">
                                    Please select position.
                                  </div>
                                </div>
                            </div>

                            <div class="form-group registration-form__avatar-load">
                                <label>Photo</label>
                                <div class="custom-file">
                                    <input type="file"
                                           class="custom-file-input"
                                           id="inputPhoto"
                                           ref="userPhoto"
                                           accept=".jpg, .jpeg"
                                           @change="selectFile"
                                           :class="{ 'is-invalid': errors.photo }"
                                    >
                                    <label class="custom-file-label" for="inputPhoto">Upload your photo</label>
                                    <div class="invalid-feedback">
                                        Please select the correct file. The dimention is more than 70х70px and size less 5MB
                                    </div>
                                </div>
                            </div>
                            <div class="registration-form__action">
                                <button class="button">Sing up now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';

  const baseUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1';
  const imageMaxSize = 5 * 1024 * 1024;
  const imageMinWidth = 70;
  const imageMinHeight = 70;
  const inputsParams = {
    name: {
      pattern: '',
      min: 2,
      max: 60,
    },
    email: {
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      min: 2,
      max: 100,
    },
    phone: {
      pattern: /^[\\+]{0,1}380([0-9]{9})$/,
    },
  };

  export default {
    name: 'UserForm',
    data() {
      return {
        positions: [],
        nameError: false,
        emailError: false,
        phoneError: false,
        fileError: false,
        errors: {
          name: false,
          email: false,
          phone: false,
          position_id: false,
          photo: false
        },
        params: {
          position_id: null,
          name: '',
          email: '',
          phone: '',
          photo: null,
        },
      }
    },
    methods: {
      getPositions() {
        axios(`${baseUrl}/positions`)
            .then(resp => {
              this.positions = resp.data.positions;
              // console.log(this.positions);
            })
            .catch(
                // err => { console.log(err) }
                );
      },
      sendData(token, params) {
        let formData = new FormData();
        formData.append('position_id', params.position_id);
        formData.append('name', params.name);
        formData.append('email', params.email);
        formData.append('phone', params.phone);
        formData.append('photo', params.photo);

        axios(`${baseUrl}/users`, {
          method: 'POST',
          data: formData,
          headers: {
            'Token': token
          }
        })
            .then(() => {
              // console.log(resp.data);
              this.resetForm();
              this.$emit('registered')
            })
            .catch(error => {
                // console.log(error);
                this.$emit('alarm', {
                  title: error.response.status,
                  text: error.response.data.message,
                })
              })
      },
      registrationUser() {
        let token = '';
        axios.get(`${baseUrl}/token`)
            .then(resp => {
              token = resp.data.token;
            })
            .then(() => {
              this.sendData(token, this.params);
            })
            .catch(err => {
              // console.log(err);
              this.$emit('alarm', {
                title: err.response.status,
                text: err.response.data.message,
              })
            });
      },
      checkForm(e) {
        let isValidForm = false;
        // this.$emit('registered');
        e.preventDefault();

        this.errors.name = this.params.name.length < inputsParams.name.min
            || this.params.name.length > inputsParams.name.max;

        this.errors.email = !inputsParams.email.pattern.test(this.params.email)
            || (this.params.email.length > inputsParams.email.max);

        this.errors.phone = !inputsParams.phone.pattern.test(this.params.phone);
        this.errors.position_id = !this.params.position_id;
        this.errors.photo = !this.selectFile();

        for (let key in this.errors) {
          isValidForm = isValidForm || this.errors[key];
        }

        if (!isValidForm) {
          this.registrationUser();
        }
      },
      selectFile() {
        const fileInput = this.$refs.userPhoto;
        const file = fileInput.files[0];
        const label = fileInput.nextElementSibling;

        if (file) {

          if (!/\.(jpg|jpeg)$/i.test(file.name)) {
            return false;
          } else {
            this.params.photo = this.$refs.userPhoto.files[0];
          }

          if (label.classList.contains('custom-file-label')) {
            label.innerHTML = file.name;
          } else {
            return false;
          }

          let url = URL.createObjectURL(file);
          let img = new Image;
          img.onload = function () {
            if (img.width < imageMinWidth || img.height < imageMinHeight) {
              // isDimentionOK = true;
              return false;
            }
          };
          img.src = url;

          return file.size <= imageMaxSize;


        } else {
          return false;
        }

      },
      resetForm() {
        this.params.position_id = null;
        this.params.name = '';
        this.params.email = '';
        this.params.phone = '';
        this.params.photo = null;
      }
    },
    created() {
      this.getPositions();
    }
  }
</script>
