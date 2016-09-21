<template>
 <!-- logo || brand -->
 <a class="navbar-brand" v-if="this.type == 'logo'">
   <slot></slot>
  </a>
  <!-- nav -->
  <ul class="nav navbar-nav" v-if="this.type == 'nav'">
    <slot></slot>
  </ul>
  <form class="navbar-form" v-if="this.type == 'search'">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
  </form>
  <ul class="nav navbar-nav" v-if="this.type == 'dropdown'">
    <li class="dropdown" >
        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Dropdown <b class="caret"></b></a>
        <ul class="dropdown-menu">
          <slot></slot>
        </ul>
    </li>
  </ul>
</template>

<script>

export default {
  ready () {
   
  },
	props: {
	    type: {
	      type: String,
	      require: true
	    }
	},
 	data () {
      return {
         cc:{
        
        }
      }
    } 
}
</script>

<style>
</style>


