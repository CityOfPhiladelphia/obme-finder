<template>
  <div class="grid-x grid-padding-x">
    <div class="columns is-marginless">
      <div
        v-if="item.attributes.address"
        class="column"
      >
        <font-awesome-icon icon="map-marker-alt" />
        <span>
          {{ item.attributes.address }}<br>
          Philadelphia, PA {{ item.attributes.zip_code }}<br>
        </span>
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
      <!-- class="columns" -->
      <h3 class="title is-3">
        Services offered
      </h3>
      <div class="columns is-multiline is-gapless">
        <!-- <div
          v-for="i in parseServiceList(item.attributes.services_offered)"
          :key="i"
          class="column is-half"
        > -->
        {{ item.attributes.services_offered }}
        <!-- {{ i }} -->
        <!-- </div> -->
      </div>
    </div>

    <div
      v-if="item.attributes.tags && item.attributes.tags.length"
    >
      <h3 class="title is-3 pt-2">
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
  components: {
    // VerticalTableLight: () => import(/* webpackChunkName: "pvc_VerticalTable3CellsLight" */'@phila/vue-comps/src/components/VerticalTableLight.vue'),
  },
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
    // mainVerticalTableSlots() {
    //   let slots = {
    //     id: 'mainTable',
    //     fields: [
    //       {
    //         label: 'eligibility',
    //         labelType: 'i18n',
    //         valueType: 'component1',
    //       },
    //     ],
    //   };
    //   if (this.$props.item.attributes.Language_Spoken != null) {
    //     let row2 = {
    //       label: 'languages.languagesSpoken',
    //       labelType: 'i18n',
    //       valueType: 'component2',
    //     };
    //     slots.fields.push(row2);
    //   }
    //
    //   if (this.$props.item.attributes.translation_services != null) {
    //     let row3 = {
    //       label: 'languages.translationServices',
    //       labelType: 'i18n',
    //       valueType: 'component3',
    //     };
    //     slots.fields.push(row3);
    //   }
    //
    //   if (this.days.length > 0) {
    //     let newField = {
    //       label: 'testingHours',
    //       labelType: 'i18n',
    //       valueType: 'component4',
    //     };
    //     slots.fields.push(newField);
    //   }
    //
    //   if (this.daysRapid.length > 0) {
    //     let newField = {
    //       label: 'rapid.category',
    //       labelType: 'i18n',
    //       valueType: 'component5',
    //     };
    //     slots.fields.push(newField);
    //   }
    //
    //   return slots;
    // },
    // mainVerticalTableOptions() {
    //   return {
    //     styles: {
    //       th: {
    //         'vertical-align': 'top',
    //         'font-size': '14px',
    //         'min-width': '40px !important',
    //         'max-width': '50px !important',
    //         'width': '10% !important',
    //       },
    //       td: {
    //         'font-size': '14px !important',
    //       },
    //     },
    //   };
    // },

    // days() {
    //   let allDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
    //   let theFields = [];
    //   // let days = {};
    //
    //   let item = this.item;
    //   let holidays = [];
    //   let exceptions = [];
    //   if (this.$config.holidays && this.$config.holidays.days) {
    //     holidays = this.$config.holidays.days;
    //   }
    //   if (this.$config.holidays && this.$config.holidays.exceptions) {
    //     exceptions = this.$config.holidays.exceptions;
    //   }
    //   // let siteName = this.getSiteName(this.item);
    //
    //   for (let [ index, day ] of allDays.entries()) {
    //     let normallyOpen = item.attributes[day] != null;
    //     let holidayToday = holidays.includes(day);
    //     let yesterday = allDays[index-1];
    //     let normallyOpenYesterday = item.attributes[yesterday] != null;
    //     let holidayYesterday = holidays.includes(yesterday);
    //     let siteIsException = exceptions.includes(this.getSiteName(this.item));
    //
    //     // if (this.item.attributes[day] != null){
    //     if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {
    //
    //       let hours;
    //       if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
    //         hours = item.attributes[day];
    //       } else if (!normallyOpen && holidayYesterday) {
    //         hours = item.attributes[yesterday];
    //       }
    //
    //       let dayObject = {
    //         label: day,
    //         labelType: 'i18n',
    //         value: hours,
    //         // valueType: 'i18n',
    //       };
    //       theFields.push(dayObject);
    //     }
    //   }
    //   return theFields;
    // },

    // daysRapid() {
    //   let allDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
    //   let theFields = [];
    //   // let days = {};
    //
    //   let item = this.item;
    //   let holidays = [];
    //   let exceptions = [];
    //   if (this.$config.holidays && this.$config.holidays.days) {
    //     holidays = this.$config.holidays.days;
    //   }
    //   if (this.$config.holidays && this.$config.holidays.exceptions) {
    //     exceptions = this.$config.holidays.exceptions;
    //   }
    //   // let siteName = this.getSiteName(this.item);
    //
    //   for (let [ index, day ] of allDays.entries()) {
    //     let normallyOpen = item.attributes[day+'_rapid_tests'] != null;
    //     let holidayToday = holidays.includes(day);
    //     let yesterday = allDays[index-1];
    //     let normallyOpenYesterday = item.attributes[yesterday] != null;
    //     let holidayYesterday = holidays.includes(yesterday);
    //     let siteIsException = exceptions.includes(this.getSiteName(this.item));
    //
    //     // if (this.item.attributes[day] != null){
    //     if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {
    //
    //       let hours;
    //       if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
    //         // let value = day + '_rapid_tests';
    //         // console.log('day:', day, 'value:', value);
    //         hours = item.attributes[day+'_rapid_tests'];
    //       } else if (!normallyOpen && holidayYesterday) {
    //         // let value = yesterday + '_rapid_tests';
    //         // console.log('yesterday:', yesterday, 'value:', value);
    //         hours = item.attributes[yesterday+'_rapid_tests'];
    //       }
    //
    //       let dayObject = {
    //         label: day,
    //         labelType: 'i18n',
    //         value: hours,
    //         // valueType: 'i18n',
    //       };
    //       theFields.push(dayObject);
    //     }
    //   }
    //   // console.log('theFields:', theFields);
    //   return theFields;
    // },

    // component4VerticalTableSlots() {
    //   return {
    //     id: 'compTable1',
    //     fields: this.days,
    //   };
    // },
    // component5VerticalTableSlots() {
    //   return {
    //     id: 'compTable1',
    //     fields: this.daysRapid,
    //   };
    // },
    // component1VerticalTableOptions() {
    //   return {
    //     styles: {
    //       th: {
    //         'font-size': '14px',
    //         'min-width': '45px !important',
    //         'max-width': '50px !important',
    //         'width': '25% !important',
    //       },
    //       td: {
    //         'font-size': '14px !important',
    //       },
    //     },
    //   };
    // },

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

.location-item {
  position: relative;
  border-bottom: 1px solid black;
  height:100%;

  &:hover::after {
    color: white;
  }

  .temp-close-section {
    width: 100%;
  }

  .card-exclamation-holder {
    padding: 20px;
    background-color: #CC3000;
    text-align: center;
  }

  .fa-icon-class {
    color: white;
    text-align: center;
  }

  .card-exclamation-details {
    padding: 10px;
    background-color: #F5D6CC;
  }

  .location-title {
    cursor: pointer;
    padding: 1rem;
    margin-bottom: 0;
    &:hover{
      background: #2176d2;
      color: white;
    }
  }

  &::after{
    position: absolute;
    right:1rem;
    top: 0;
    content: '+';
    font-weight: 900;
    font-size:1.5rem;
    z-index: 100;
    color: color(dark-ben-franklin)
  }
  &.open{
    h2{
      color:white;
      background-color: color(ben-franklin-blue);
      font-weight: 900;
    }
    &::after{
      content: '-';
      color:white;
    }
  }
  .location-content{
    overflow: hidden;
    height:0;

    &.location-open{
      padding: 1rem;
      height: 100%;
      overflow: initial;
    }
  }
}
</style>
