<template>
    <div>
        <div class="user">
            <div class="user__wrap">
                <div class="user__avatar">
                    <img :src="imgUrl" :alt="name" >
                </div>
                <div class="user__name" :class="{ user__name_short: isShortName }">{{ name }}</div>
                <div class="user__position">{{ position }}</div>
                <div class="user__email" v-if="!tooltipCondition(email, maxLengthEmail)">{{ email }}</div>
                <div class="user__email"
                     :data-tooltip="email"
                     v-else
                     @mouseover="showTooltip"
                     @mouseout="destroyTooltip"
                     @mousemove="mouseMove"

                > {{ email }}
                </div>
                <div class="user__phone">{{ phone }}</div>
            </div>
        </div>
    </div>
</template>

<script>

  let tooltipElem;

  export default {
    name: "user",
    props: {
      imgUrl: String,
      name: String,
      position: String,
      email: String,
      phone: String
    },
    data() {
      return {
        isShortName: false,
        maxLengthEmail: 24,
        tooltipElem:''
      }
    },
    methods: {
      checkNameLength() {
        if (this.name.length < 18) {
          this.isShortName = true;
        }
      },
      tooltipCondition(params, length) {
        return params.length > length ? true : false;
      },
      showTooltip(event) {
        let target = event.target;
        const tooltipHtml = target.dataset.tooltip;

        tooltipElem = document.createElement('div');
        tooltipElem.className = 'custom-tooltip';
        tooltipElem.innerHTML = tooltipHtml;
        document.body.append(tooltipElem);
      },
      destroyTooltip() {
        if (tooltipElem) {
          tooltipElem.remove();
          tooltipElem = null;
        }
      },
      mouseMove(event) {
        let left = event.clientX - tooltipElem.offsetWidth / 2;
        if (left < 0) left = 0; // не заезжать за левый край окна

        let top = event.clientY + 25;

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
      }
    },
    created() {
      this.checkNameLength();
      // document.querySelector('[data-toggle="tooltip"]').tooltip();
    }

  }
</script>

<style scoped>

</style>
