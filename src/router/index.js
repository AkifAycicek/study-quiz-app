import { availableLocales, guessUserLocale } from '@plugins/i18n';
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
  const toLocale = get(to, 'params.locale');
  if (!availableLocales.includes(toLocale)) {
    return next({
      ...to,
      params: { ...to.params, locale: locale.value },
    });
  }
  if (locale.value != toLocale) locale.value = toLocale;
  next();
});

export default router;
