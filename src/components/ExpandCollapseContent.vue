<template>
  <div class="grid-x grid-padding-x">
    <div class="columns is-marginless">
      <div
        v-if="item.attributes.address"
        class="column columns"
      >
        <div class="column is-1">
          <font-awesome-icon icon="map-marker-alt" />
        </div>
        <div class="column is-11">
          {{ item.attributes.address }}<br>
          Philadelphia, PA {{ item.attributes.zip_code }}<br>
        </div>
      </div>

      <div class="column">
        <div
          v-if="item.attributes.phone"
          class="detail"
        >
          <font-awesome-icon icon="phone" />
          <span>{{ item.attributes.phone }}</span>
        </div>
        <div
          v-if="item.attributes.email"
          class="detail"
        >
          <font-awesome-icon icon="envelope" />
          <span><a :href="`mailto:${item.attributes.email}`">{{ item.attributes.email }}</a></span>
        </div>
        <div
          v-if="item.attributes.website"
          class="detail"
        >
          <font-awesome-icon icon="globe" />
          <span><a :href="makeValidUrl(item.attributes.website)">{{ item.attributes.website }}</a></span>
        </div>
        <div
          v-if="item.facebook_name"
          class="detail"
        >
          <font-awesome-icon :icon="['fab', 'facebook']" />
          <span><a :href="item.facebook_name">Facebook</a></span>
        </div>
        <div
          v-if="item.twitter"
          class="detail"
        >
          <font-awesome-icon :icon="['fab', 'twitter']" />
          <span><a :href="item.twitter">Twitter</a></span>
        </div>
      </div>
    </div>

    <div
      v-if="item.attributes.services_offered"
    >
      <h3 class="title section-title is-3">
        Services offered
      </h3>
      <div class="columns is-multiline is-gapless">
        {{ item.attributes.services_offered }}
      </div>
    </div>

    <div
      v-if="item.attributes.tags && item.attributes.tags.length"
    >
      <h3 class="title section-title is-3 pt-2">
        Tags
      </h3>
      <div>
        {{ item.attributes.tags }}
        <!-- {{ parseTagsList(item.attributes.tags) }} -->
      </div>
    </div>
  </div>
</template>

<script>

import SharedFunctions from '@phila/pinboard/src/components/mixins/SharedFunctions.vue';

export default {
  name: 'ExpandCollapseContent',
  mixins: [ SharedFunctions ],
  props: {
    item: {
      type: Object,
      default: function(){
        return {};
      },
    },
  },
  computed: {
    languagesSpoken() {
      let values = [];
      if (this.$props.item.attributes.Language_Spoken) {
        // console.log('in languagesSpoken computed, this.$props.item.attributes.Language_Spoken:', this.$props.item.attributes.Language_Spoken);
        values = this.$props.item.attributes.Language_Spoken.split(', ');
      }
      return values;
    },
  },
  methods: {
    parseAddress(address) {
      const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
      return formattedAddress;
    },
    makeValidUrl(url) {
      let newUrl = window.decodeURIComponent(url);
      newUrl = newUrl
        .trim()
        .replace(/\s/g, '');
      if (/^(:\/\/)/.test(newUrl)) {
        return `http${newUrl}`;
      }
      if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
        return `http://${newUrl}`;
      }
      return newUrl;
    },
    parseServiceList(list) {
      const formattedService = list;
      return formattedService;
    },
    parseTagsList(list) {
      const formattedTags = list;
      // const formattedTags = list.slice().sort().join(", ");
      return formattedTags;
    },
  },
};

</script>

<style lang="scss">

.td-style {
  font-size: 14px !important;
}

.td-textbox {
  padding-left: 2rem;
}

.section-title {
  margin-bottom: .5rem !important;
}

// .location-item {
//   position: relative;
//   border-bottom: 1px solid black;
//   height:100%;
//
//   &:hover::after {
//     color: white;
//   }
//
//   .temp-close-section {
//     width: 100%;
//   }
//
//   .card-exclamation-holder {
//     padding: 20px;
//     background-color: #CC3000;
//     text-align: center;
//   }
//
//   .fa-icon-class {
//     color: white;
//     text-align: center;
//   }
//
//   .card-exclamation-details {
//     padding: 10px;
//     background-color: #F5D6CC;
//   }

  // .location-title {
  //   cursor: pointer;
  //   padding: 1rem;
  //   margin-bottom: 0;
  //   &:hover{
  //     background: #2176d2;
  //     color: white;
  //   }
  // }
  //
  // &::after{
  //   position: absolute;
  //   right:1rem;
  //   top: 0;
  //   content: '+';
  //   font-weight: 900;
  //   font-size:1.5rem;
  //   z-index: 100;
  //   color: color(dark-ben-franklin)
  // }
  // &.open{
  //   h2{
  //     color:white;
  //     background-color: color(ben-franklin-blue);
  //     font-weight: 900;
  //   }
  //   &::after{
  //     content: '-';
  //     color:white;
  //   }
  // }
  // .location-content{
  //   overflow: hidden;
  //   height:0;
  //
  //   &.location-open{
  //     padding: 1rem;
  //     height: 100%;
  //     overflow: initial;
  //   }
  // }
// }
</style>
