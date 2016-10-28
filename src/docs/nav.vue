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
</div>
</template>
<script>

import nv from '../components/nav/nav'

export default {
  components: {    
    nv
  }
}
</script>