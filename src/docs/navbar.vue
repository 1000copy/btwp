<template>
<div>
  <h2>案例</h2>
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
  <h2>代码</h2>
  <xmp>
    &lt;navbar>
      &lt;navbar-part type="logo" href="#logo">Logo&lt;/navbar-part>
      &lt;navbar-part type="nav" >
        &lt;li>&lt;a href="#">Link 1&lt;/a>&lt;/li>
        &lt;li>&lt;a href="#">Link 2&lt;/a>&lt;/li>
      &lt;/navbar-part>
      &lt;navbar-part type="dropdown" >
          &lt;li>&lt;a href="#">Action1&lt;/a>&lt;/li>
          &lt;li>&lt;a href="#">Action2&lt;/a>&lt;/li>
      &lt;/navbar-part>
      &lt;navbar-part type="search">&lt;/navbar-part>
    &lt;/navbar> 
  </xmp>
</div>
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