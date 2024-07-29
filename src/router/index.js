import { availableLocales, guessUserLocale, localeMiddleware } from '@plugins/i18n';
import { createRouter, createWebHashHistory } from 'vue-router';

// layouts
import DefaultLayout from '@/layouts/default/index.vue';
import HomePage from '@/pages/index.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      children: [
        {
          path: `:locale(${availableLocales.join('|')})?`,
          component: DefaultLayout,
          redirect: `/${guessUserLocale()}/`,
          children: [
            {
              path: '',
              component: HomePage,
              name: 'home',
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  localeMiddleware(to, from, next);
});

export default router;
