<template>
<div>
  <h2>案例</h2>
  <well size="large">well</well>
  <h2>代码</h2>
  <xmp>
    &lt;well size="large">well&lt;/well>
  </xmp>
  <table class="table">
        <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
        <tr><td>size</td><td>字符串</td><td>large|small</td><td></td></tr>
  </table>
</div>
   
</template>
<script>


import {well} from '../components'

export default {
  components: {    
    well
  }
}
</script>