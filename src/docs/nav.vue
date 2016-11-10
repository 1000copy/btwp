<template>

<div>

  <h2>案例</h2>

  <nv type="pill">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Login</a></li>
      <li><a href="#">About</a></li>
  </nv>
  <h2>代码</h2>
  <xmp>
    &lt;nv type="pill"&gt;
        &lt;li class="active"&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Login&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
    &lt;/nv&gt;
  </xmp>
  <h2>案例</h2>
  <nv type="tab">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Login</a></li>
      <li><a href="#">About</a></li>
  </nv>
  <h2>代码</h2>
    <xmp>
    &lt;nv type="tab">
        &lt;li class="active">&lt;a href="#">Home&lt;/a>&lt;/li>
        &lt;li>&lt;a href="#">Login&lt;/a>&lt;/li>
        &lt;li>&lt;a href="#">About&lt;/a>&lt;/li>
    &lt;/nv>
  </xmp>
</div>
</template>
<script>

import {nv} from '../components'

export default {
  components: {    
    nv
  }
}
</script>