<template>
  <div
    class="custom-greeting content"
  >
    <div class="has-text-centered container">
      <button
        class="button open-list-button"
        @click="$emit('view-list')"
        v-html="$t('app.viewList')"
      />
    </div>

    <div
      class="main-area"
    >
      <h3>About this directory</h3>
      <p>This tool can help you find resources that assist Black males in Philadelphia. You can:</p>
      <div class="callout list-div">
        <ul>
          <li>Browse the list of resources.</li>
          <li>Search by address or keyword.</li>
          <li>Filter your results by service type.</li>
          <li>Click on a map location for specific site information.</li>
        </ul>
      </div>
      <h3>Suggest a resource</h3>
      <p>Fill out <a href="https://phila.formstack.com/forms/obme_directory_organization_form">our request form</a> to add your organization to the directory.</p>
    </div> <!-- end of main-area -->
  </div>
</template>

<script>

export default {
  name: 'CustomGreeting',
  props: {
    'message': {
      type: String,
      default: function() {
        return 'defaultMessage';
      },
    },
  },
  data() {
    let data = {
      sections: {},
      subsections: {},
    };
    return data;
  },
  computed: {
    i18nEnabled() {
      if (this.$config.i18n) {
        return true;
      }
      return false;
    },
    calloutOptions() {
      return {};
    },
    calloutSlots() {
      return {
        text: 'test',
      };
    },
    database() {
      if (this.$store.state.sources[this.$appType].data) {
        return this.$store.state.sources[this.$appType].data.rows || this.$store.state.sources[this.$appType].data.features || this.$store.state.sources[this.$appType].data;
      }
      return [];
    },
    hasError() {
      return this.$store.state.geocode.status === 'error';
    },
    errorMessage() {
      const input = this.$store.state.geocode.input;
      return `
          <p>
            We couldn't find
            ${input ? '<strong>' + input + '</strong>' : 'that address'}.
            Are you sure everything was spelled correctly?
          </p>
          <p>
            Here are some examples of things you can search for:
          </p>
          <ul>
            <li>1234 Market St</li>
            <li>1001 Pine Street #201</li>
            <li>12th & Market</li>
            <li>883309050 (an OPA number with no hyphens or other characters)</li>
          </ul>
        `;
    },
  },
  // watch: {
  //   database() {
  //     let subsections = this.getCounts();
  //     this.subsections = subsections;
  //     this.$store.commit('setSubsections', subsections);
  //   },
  // },
  // mounted() {
  //   this.sections = this.$config.sections;
  // },
  // methods: {
  //   getCounts() {
  //     console.log('customGreeting.vue getCounts is running');
  //     const refineData = this.database;
  //     // const refineData = this.sources[this.$appType].data.rows;
  //
  //     let service = '';
  //
  //     // console.log('in getRefineSearchList, refineData:', refineData);
  //     refineData.forEach((arrayElem) => {
  //       // console.log('arrayElem:', arrayElem);
  //       if (arrayElem.services_offered) {
  //         service += `${arrayElem.services_offered},`;
  //       } else if (arrayElem.attributes.CATEGORY) {
  //         service += `${arrayElem.attributes.CATEGORY},`;
  //       }
  //     });
  //
  //     // TODO: break this into smaller chunks
  //     // let serviceArray = service.split(/(,|;)/);
  //     let serviceArray = service.split(',');
  //     serviceArray = serviceArray.map(s => s.trim());
  //
  //     // const uniqArray = [ ...new Set(serviceArray) ];
  //     // console.log('serviceArray:', serviceArray, 'uniqArray:', uniqArray);
  //     //
  //     // // clean up any dangling , or ;
  //     // let uniq = uniqArray.filter(a => a.length > 2);
  //     //
  //     // uniq.filter(Boolean); // remove empties
  //
  //     let countObject = serviceArray.reduce(function (acc, curr) {
  //       if (typeof acc[curr] == 'undefined') {
  //         acc[curr] = 1;
  //       } else {
  //         acc[curr] += 1;
  //       }
  //       return acc;
  //     }, {});
  //
  //     return countObject;
  //   },
  // },
};
</script>

<style lang="scss" scoped>

@import "../../node_modules/@phila/pinboard/src/assets/scss/customGreeting.scss";

</style>
