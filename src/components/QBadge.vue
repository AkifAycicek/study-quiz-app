<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="badge" :class="[$attrs.class, { [`bg-${$attrs.variant}`]: $attrs.variant }]">
    <slot />
  </div>
</template>
