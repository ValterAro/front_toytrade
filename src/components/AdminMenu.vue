<template>

  <div class="list-group">
    <a href="#" v-on:click.prevent="emitSelectedMenuItem" id="usersMenuItem"
       class="list-group-item list-group-item-action active">Kasutajad</a>
    <a href="#" v-on:click.prevent="emitSelectedMenuItem" id="toysMenuItem"
       class="list-group-item list-group-item-action">Mänguasjad</a>
    <a href="#" v-on:click.prevent="emitSelectedMenuItem" id="categoriesMenuItem"
       class="list-group-item list-group-item-action">Kategooriad</a>
    <a href="#" v-on:click.prevent="emitSelectedMenuItem" id="conditionsMenuItem"
       class="list-group-item list-group-item-action">Seisukorrad</a>
    <a href="#" v-on:click.prevent="emitSelectedMenuItem" id="citiesMenuItem"
       class="list-group-item list-group-item-action">Asukohad</a>
    <a href="#" v-on:click.prevent="emitSelectedMenuItem" id="transactionsMenuItem"
       class="list-group-item list-group-item-action">Tehingud</a>
  </div>
</template>
<script>
export default {
  name: 'AdminMenu',
  data: function () {
    return {
      selectedMenuItem: ''
    }
  },
  methods: {

    emitSelectedMenuItem: function (event) {
      this.$el.querySelectorAll('.list-group-item').forEach(activeClass => activeClass.classList.remove('active'))
      event.target.classList.toggle('active')
      this.selectedMenuItem = event.target.id
      this.$emit('emitSelectedMenuItemEvent', this.selectedMenuItem)
    }
  }
}
</script>