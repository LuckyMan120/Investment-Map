import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'EnterYourGoogleMapsAPIKey',
    libraries: 'places,drawing,geometry',
    installComponents: true,
  },
});
