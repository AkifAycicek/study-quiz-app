<script setup>
const props = defineProps({
  sm: { type: Boolean, default: null },
  md: { type: Boolean, default: true },
  lg: { type: Boolean, default: null },
  variant: { type: String, default: null },
});

const { sm, md, lg } = toRefs(props);
const size = 'btn-' + first(keys(omitBy({ sm: sm.value, lg: lg.value, md: md.value }, isNil)));
</script>
<template>
  <button class="btn" :class="{ [size]: size, [`btn-${variant}`]: variant }">
    <slot />
  </button>
</template>
