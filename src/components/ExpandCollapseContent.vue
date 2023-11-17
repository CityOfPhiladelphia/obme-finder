<template>
  <div :class="isMobile ? 'main-content-mobile' : 'main-content'">
    <print-share-section
      :item="item"
    />

    <div class="columns top-section">
      <div class="column is-6">
        <div
          v-if="item.attributes.address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="column is-11">
            {{ item.attributes.address }}<br>
            Philadelphia, PA {{ item.attributes.zip_code }}<br>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div
          v-if="item.attributes.phone"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column is-11">
            {{ item.attributes.phone }}
          </div>
        </div>

        <div
          v-if="item.attributes.email"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="envelope" />
          </div>
          <div class="column is-11">
            <a :href="`mailto:${item.attributes.email}`">{{ item.attributes.email }}</a>
          </div>
        </div>

        <div
          v-if="item.attributes.website"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeValidUrl(item.attributes.website)"
            >
              {{ item.attributes.website }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div
          v-if="item.facebook_name"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </div>
          <div class="column is-11">
            <a :href="item.facebook_name">Facebook</a>
          </div>
        </div>


        <div
          v-if="item.twitter"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </div>
          <div class="column is-11">
            <a :href="item.twitter">Twitter</a>
          </div>
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
      <h3 class="title section-title is-3">
        Tags
      </h3>
      <div>
        <!-- {{ item.attributes.tags }} -->
        {{ parseTagsList(item.attributes.tags) }}
      </div>
    </div>
  </div>
</template>

<script>

import SharedFunctions from '@phila/pinboard/src/components/mixins/SharedFunctions.vue';
import PrintShareSection from '@phila/pinboard/src/components/PrintShareSection';

export default {
  name: 'ExpandCollapseContent',
  components: {
    PrintShareSection,
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
      const formattedTags = list.toLowerCase();
      console.log('parseTagsList is running, list:', list, 'formattedTags:', formattedTags);
      // const formattedTags = list.slice().sort().join(", ");
      return formattedTags;
    },
  },
};

</script>

<style lang="scss">

// .td-style {
//   font-size: 14px !important;
// }
//
// .td-textbox {
//   padding-left: 2rem;
// }
//
// .section-title {
//   margin-bottom: .5rem !important;
// }

</style>
