<script setup>
const props = defineProps({
  sm: { type: Boolean, default: null },
  md: { type: Boolean, default: true },
  lg: { type: Boolean, default: null },
  modelValue: { type: null, default: null },
});
defineOptions({
  inheritAttrs: false,
});
defineEmits(['update:modelValue']);

const id = uniqueId('form_control_');
const attrs = useAttrs();

const { sm, md, lg, modelValue } = toRefs(props);
const size =
  'form-control-' + first(keys(omitBy({ sm: sm.value, lg: lg.value, md: md.value }, isNil)));

const controlTypes = {
  plaintext: { type: 'text', inputClass: 'form-control-plaintext' },
  color: { inputClass: 'form-control form-control-color' },
  checkbox: {
    groupClass: 'form-check',
    inputClass: 'form-check-input',
    labelClass: 'form-check-label',
  },
  radio: {
    groupClass: 'form-check',
    inputClass: 'form-check-input',
    labelClass: 'form-check-label',
  },
  file: {
    groupClass: '',
  },
};

const controlType = get(controlTypes, attrs.type, null);
const getValue = (e) => {
  if (['checkbox', 'radio'].includes(e.target.type)) {
    return e.target.checked ? e.target._value : null;
  }
  return e.target.value;
};
const className = reactive([get(controlType, 'inputClass', 'form-control'), { [size]: size }]);
</script>

<template>
  <div
    :lang="$i18n.locale"
    :class="get(controlType, 'groupClass', `${$attrs.label ? 'form-floating' : ''} my-2`)">
    <textarea
      v-if="$attrs.type == 'textarea'"
      v-bind="$attrs"
      :id="id"
      label=""
      style="height: 100%"
      :readonly="$attrs.readonly"
      :disabled="$attrs.disabled"
      :list="$slots.datalist && `${id}_datalist`"
      :class="className"
      :value="modelValue"
      @change="(e) => $emit('update:modelValue', getValue(e))"
      @input="(e) => $emit('update:modelValue', getValue(e))" />
    <input
      v-else
      v-bind="$attrs"
      :id="id"
      label=""
      :type="get(controlType, 'type', $attrs.type)"
      :disabled="$attrs.disabled"
      :readonly="$attrs.readonly"
      :name="$attrs.name"
      :class="className"
      :list="$slots.datalist && `${id}_datalist`"
      :placeholder="$attrs.placeholder || ' '"
      :checked="isEqual(modelValue, $attrs.value)"
      :value="modelValue"
      @change="(e) => $emit('update:modelValue', getValue(e))"
      @input="(e) => $emit('update:modelValue', getValue(e))" />
    <label
      v-if="$attrs.error || $attrs.label"
      :for="id"
      class="text-capitalize mw-100 text-truncate"
      :class="[get(controlType, 'labelClass', 'form-label'), { 'text-danger': $attrs.error }]">
      {{ $attrs.error || $attrs.label }}
    </label>
    <datalist v-if="$slots.datalist" :id="`${id}_datalist`">
      <slot name="datalist" />
    </datalist>
  </div>
</template>
