<template>
  <table
    class="table  table-striped  mt-4"
    v-show="config.length"
  >
    <thead>
      <tr>
        <td>Domain</td>
        <td>Color</td>
        <td>Preview</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(entry, index) in config"
        :key="index"
      >
        <td
          class="text-monospace"
          v-text="entry.domain"
        ></td>
        <td
          class="text-monospace"
          v-text="entry.color"
        ></td>
        <td>
          <div :style="getPreviewStyle(entry.color)"></div>
        </td>
        <td>
          <button
            type="button"
            class="btn  btn-danger"
            @click="deleteEntry(index)"
          >Delete Entry</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
    name: 'OptionsTable',
    props: {
        config: {
            required: true,
            type: Array,
        },
        deleteEntry: {
            required: true,
            type: Function,
        },
    },
    methods: {
        getPreviewStyle(color) {
            return {
                backgroundColor: color,
                height: '1em',
                fontSize: '25px',
                width: '1em',
            };
        },
    },
};
</script>

