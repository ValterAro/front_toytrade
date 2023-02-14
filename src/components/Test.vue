<template>
  <div>
<div slot="actions" slot-scope="row">
  <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->ff
  <button size="sm" @click.stop="row.toggleDetails">
    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
  </button>
</div>
<div slot="row-details" slot-scope="row">
  <!-- Your row details' content here -->ffff
</div>
    <table @row-clicked="onRowClicked">
      <tbody>
      <tr>
        <td>fff</td>
      </tr>
      </tbody>

    </table>
  </div>
</template>
<script>
export default {
  name: "Test",
  data: function () {
    return {
      items: [
        { foo: true, bar: 40, _showDetails: false },
        { foo: true, bar: 100, _showDetails: false }
      ]
    }
  },
  methods: {
      onRowClicked (item, index, event) {
        item._showDetails = !item._showDetails;
      }
    }
}
</script>
