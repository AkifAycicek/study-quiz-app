<template>
  <Suspense>
    <template #fallback>
      <div class="position-absolute top-50 start-50 translate-middle spinner-grow bg-primary"></div>
    </template>
    <slot />
  </Suspense>
</template>
