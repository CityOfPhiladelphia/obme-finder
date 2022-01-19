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
        <!-- {{ item.attributes.tags }} -->
        {{ parseTagsList(item.attributes.tags) }}
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

.td-style {
  font-size: 14px !important;
}

.td-textbox {
  padding-left: 2rem;
}

.section-title {
  margin-bottom: .5rem !important;
}

</style>
