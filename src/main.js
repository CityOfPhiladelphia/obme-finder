// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

import isMac from './util/is-mac';
if (isMac()) {
  import('./assets/mac-style.scss')
}

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown as farAngleDown } from '@fortawesome/pro-regular-svg-icons/faAngleDown';
import { faAngleUp as farAngleUp } from '@fortawesome/pro-regular-svg-icons/faAngleUp';
import { faTimes as farTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faPlus as farPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faMinus as farMinus } from '@fortawesome/pro-regular-svg-icons/faMinus';

library.add(farAngleDown, farAngleUp, farTimes, farPlus, farMinus);

// use these if running off unlinked package
import pinboard from '@phila/pinboard';
import '../node_modules/@phila/pinboard/dist/style.css';
// OR
// use this if running off linked package
// import pinboard from '../node_modules/@phila/pinboard/src/main.js';

// data-sources
import obme from './data-sources/obme';

import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';

const customComps = markRaw({
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
});

let $config = {
  i18n: {
    data: {
      messages: {
        'en-US': {}
      }
    }
  },
  publicPath: import.meta.env.VITE_PUBLICPATH,
  app: {
    title: 'Resources for Black Males',
    subtitle: 'Find a resource that helps Black men and boys in Philadelphia ',
    type: 'obme',
  },
  gtag: {
    category: 'rf-obme',
  },
  allowPrint: true,
  showBuffers: true,
  resetDataOnGeocode: true,
  retractableRefine: false,
  dropdownRefine: false,
  addressInput: {
    placeholder: 'Search by address or keyword',
  },
  searchBar: {
    placeholder: 'Search by address or keyword',
    searchTypes: [
      'address',
      'keyword',
    ],
    labelText:  {
      address: 'Search by address',
      keyword: 'Search by keyword',
    },
    placeholderText: {
      address: 'Search by address',
      keyword: 'Search by keyword',
    },
  },
  locationInfo: {
    siteNameField: 'organization_name',
    siteName: function(item) {
      return item.properties.organization_name;
    },
  },
  customComps,
  refine: {
    type: 'categoryField_array',
    value: function(item) {
      return item.properties.services_offered;
    },
  },
  tags: {
    type: 'tagLocation',
    location: function(item) {
      let services = [];
      let tags = [];
      if (item.properties.services_offered) {
        services = item.properties.services_offered.split(', ');
      }
      if (item.properties.tags) {
        tags = item.properties.tags.split(', ');
      }
      let mergeResult = [ ...services, ...tags ];
      // console.log('running tagLocation function, item:', item, 'mergeResult:', mergeResult);
      return mergeResult;
    },
  },
  dataSources: {
    obme,
  },
  router: {
    enabled: false,
  },
  projection: '2272',
  geocoder: {
    url(input) {
      const inputEncoded = encodeURIComponent(input);
      return `//api.phila.gov/finder/v1/search/${inputEncoded}`;
    },
    params: {
      include_units: true,
    },
  },
  mapLayer: {
    id: 'resources',
    source: 'resources',
    type: 'circle',
    paint: {
      'circle-radius': 7,
      'circle-color': '#9400c6',
      'circle-stroke-width': 1,
      'circle-stroke-color': 'white',
    },
  },
  footer: [
    {
      type: "native",
      href: "https://www.phila.gov/",
      attrs: {
        target: "_blank",
      },
      text: "City of Philadelphia",
    },

    {
      type: "native",
      href: "/obme/resources",
      text: "About",
    },

    {
      type: "native",
      href: "https://www.phila.gov/feedback/",
      attrs: {
        target: "_blank",
      },
      text: "Feedback",
    },

    {
      type: "native",
      href: 'https://www.phila.gov/departments/mayors-office-of-black-male-engagement/',
      attrs: {
        target: "_blank",
      },
      text: "Mayor's Office of Black Male Engagement",
    },
  ],
};

console.log('$config:', $config);

pinboard($config);
export default $config;
