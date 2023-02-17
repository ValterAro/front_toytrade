<template>
  <div>
  <nav id="nav" class="navbar text-start">
    <ul class="nav affix-top flex-column w-100" data-spy="affix" data-offset-top="50">
      <li class="d-flex justify-content-between align-items-center"><a href="#" v-on:click.prevent="emitSelectedMenuItem" id="usersMenuItem"
             class="list-group-item list-group-item-action active align-middle">Kasutajad</a></li>
      <li><a href="#" v-on:click.prevent="emitSelectedMenuItem" id="toysMenuItem"
             class="list-group-item list-group-item-action">Mänguasjad</a></li>
      <li><a href="#" v-on:click.prevent="emitSelectedMenuItem" id="categoriesMenuItem"
             class="list-group-item list-group-item-action">Kategooriad</a></li>
      <li><a href="#" v-on:click.prevent="emitSelectedMenuItem" id="conditionsMenuItem"
             class="list-group-item list-group-item-action">Seisukorrad</a></li>
      <li><a href="#" v-on:click.prevent="emitSelectedMenuItem" id="citiesMenuItem"
             class="list-group-item list-group-item-action">Asukohad</a></li>
    </ul>
  </nav>
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