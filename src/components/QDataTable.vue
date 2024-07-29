<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});

const { columns, data } = props.options;
</script>
<template>
  <div class="table-responsive">
    <div class="row gx-0 fw-bold flex-nowrap mb-3">
      <slot
        v-for="(col, i) in columns"
        :key="'header_' + i"
        :name="`header_${snakeCase(col.accessor)}`"
        :column="col">
        <div
          class="col p-3 sticky-top text-primary text-capitalize text-truncate"
          style="min-width: 8rem"
          :class="col.headerClass"
          :style="col.headerStyle">
          {{ (col.title && t(snakeCase(col.title))) || $t(snakeCase(col.accessor)) }}
        </div>
      </slot>
    </div>
    <div v-for="(row, i) in data" :key="'row_' + i" class="row gx-0 flex-nowrap my-4">
      <div
        v-for="(col, j) in columns"
        :key="'cell_' + j"
        :title="get(row, col.accessor, col.title)"
        class="col bg-200 p-3 text-truncate"
        style="min-width: 8rem"
        :class="col.cellClass"
        :style="col.cellStyle">
        <slot :name="snakeCase(col.accessor)" :row="row" :col="col">
          {{ get(row, col.accessor) }}
        </slot>
      </div>
    </div>
  </div>
</template>
