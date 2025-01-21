<script setup>

const props = defineProps({
  item: {
    type: Object,
    default: function(){
      return {};
    },
  },
});

// methods
const parseAddress = (address) => {
  const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
  return formattedAddress;
};

const makeValidUrl = (url) => {
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
};

const parseServiceList = (list) => {
  const formattedService = list;
  return formattedService;
};

const parseTagsList = (list) => {
  const formattedTags = list.toLowerCase();
  console.log('parseTagsList is running, list:', list, 'formattedTags:', formattedTags);
  // const formattedTags = list.slice().sort().join(", ");
  return formattedTags;
};

</script>

<template>
  <div class='main-ec-content'>

    <div class="columns top-section">
      <div class="column is-6">
        <div
          v-if="item.properties.address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="column is-11">
            {{ item.properties.address }}<br>
            Philadelphia, PA {{ item.properties.zip_code }}<br>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div
          v-if="item.properties.phone"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column is-11">
            {{ item.properties.phone }}
          </div>
        </div>

        <div
          v-if="item.properties.email"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="envelope" />
          </div>
          <div class="column is-11">
            <a :href="`mailto:${item.properties.email}`">{{ item.properties.email }}</a>
          </div>
        </div>

        <div
          v-if="item.properties.website"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeValidUrl(item.properties.website)"
            >
              {{ item.properties.website }}
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
      v-if="item.properties.services_offered"
    >
      <h3 class="title section-title is-3">
        Services offered
      </h3>
      <div class="columns is-multiline is-gapless">
        {{ item.properties.services_offered }}
      </div>
    </div>

    <div
      v-if="item.properties.tags && item.properties.tags.length"
    >
      <h3 class="title section-title is-3">
        Tags
      </h3>
      <div>
        <!-- {{ item.properties.tags }} -->
        {{ parseTagsList(item.properties.tags) }}
      </div>
    </div>
  </div>
</template>
