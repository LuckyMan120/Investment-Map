import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDoi0kDoetjxsvsctCrRb99I5lu1GJMj_8',
    libraries: 'places,drawing,geometry',
    installComponents: true,
  },
});
