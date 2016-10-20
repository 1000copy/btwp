<template>

<div>
 
  <nv type="pill">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Login</a></li>
      <li><a href="#">About</a></li>
  </nv>
  <nv type="tab">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Login</a></li>
      <li><a href="#">About</a></li>
  </nv>
  <dropdown>
      <li><a href="#">Action1</a></li>
      <li><a href="#">Action2</a></li>
  </dropdown>

  <!-- navbar -->
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
</div>
</template>
<script>


import dropdown from '../components/div/dropdown'

import nv from '../components/nav/nav'
import navbar from '../components/nav/navbar'
import navbarPart from '../components/nav/navbar-part'


export default {
  components: {    
    dropdown,
    nv,navbar,navbarPart
  },
  data(){
     return {
      size:'http://placehold.it/600X50'
    }
  }
}
</script>