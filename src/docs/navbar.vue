<template>
  <navbar>
    <navbar-part type="logo" href="#logo">Logo</navbar-part>
    <navbar-part type="nav" >
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
    </navbar-part>
    <navbar-part type="dropdown" >
        <li><a href="#">Action1</a></li>
        <li><a href="#">Action2</a></li>
    </navbar-part>
    <navbar-part type="search"></navbar-part>
  </navbar> 
</template>
<script>
import {navbar,navbarPart} from '../components'


export default {
  components: {    
    navbar,navbarPart
  },
  data(){
     return {
      size:'http://placehold.it/600X50'
    }
  }
}
</script>