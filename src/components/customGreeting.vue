<script setup>

const props = defineProps({
  database: {
    type: Array,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <div
    class="main-greeting"
  >
    <div class="has-text-centered container">
      <button
        class="button greeting-button"
        @click="$emit('view-list')"
        v-html="$t('app.viewList')"
      />
      <button
        v-if="isMobile"
        class="button greeting-button"
        @click="$emit('view-map')"
        v-html="$t('app.viewMap')"
      />
    </div>

    <div
      class="main-area"
    >
      <h3>About this directory</h3>
      <p>This tool can help you find resources that assist Black males in Philadelphia. You can:</p>
      <div class="intro-list">
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
