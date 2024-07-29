<template>
  <div class="layout-default user-select-none">
    <main class="container flex-fill overflow-auto p-5 p-sm-8 bg-light">
      <div class="page-header d-flex flex-wrap justify-content-between align-items-center">
        <h2 v-if="$route.meta?.pageTitle?.value" v-text="$route.meta?.pageTitle?.value"></h2>
        <div class="page-actions ms-auto"></div>
      </div>
      <QLoader>
        <RouterView />
      </QLoader>
    </main>
    <footer class="bg-light text-center p-3 mt-3">
      {{ $t('Developed by') }}
      <a target="_blank" href="https://www.akifaycicek.com.tr"> Akif Ayçiçek </a>
      😎
      <div>
        <RouterLink v-slot="{ href }" custom :to="{ params: { locale: 'tr-TR' } }">
          <a class="mx-2" :href="href">TR</a>
        </RouterLink>
        <RouterLink v-slot="{ href }" custom :to="{ params: { locale: 'en-US' } }">
          <a class="mx-2" :href="href">EN</a>
        </RouterLink>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
.layout-default {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  max-height: 100vh;
  background-color: var(--default-layout-bg);
}
</style>
