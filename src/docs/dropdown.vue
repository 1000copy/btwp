<template>
<div>
  <h1>dropdown</h1>
  <h2>案例</h2>
  <dropdown>
    <li><a href="#">Action1</a></li>
    <li><a href="#">Action2</a></li>
  </dropdown>
  <h2>代码</h2>
  <xmp>
  	&lt;dropdown>
	    &lt;li>&lt;a href="#">Action1</a></li>
	    &lt;li>&lt;a href="#">Action2</a></li>
  	&lt;/dropdown>
  </xmp>
</div>
</template>
<script>

import dropdown from '../components/div/dropdown'

export default {
  components: {    
    dropdown
  }
}
</script>