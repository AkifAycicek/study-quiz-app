import i18n from '@plugins/i18n';
import AppVue from './App.vue';
import router from './router';

const app = createApp(AppVue);

app.use(i18n);
app.use(router);

export default app;
