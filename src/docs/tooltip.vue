<template>
<div>
  <h2>案例</h2>
  <tooltip  direction="right" href="#">tooltip</tooltip>     
  <h2>代码</h2>
  <xmp>
    &lt;tooltip  direction="right" href="#">tooltip&lt;/tooltip>     
  </xmp>
  <table class="table">
        <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
        <tr><td>direction</td><td>字符串</td><td>top|right|bottom|left</td><td></td></tr>
  </table>
</div>
</template>
<script>


import {tooltip} from '../components'

export default {
  components: {    
    tooltip
  },
  data(){
     return {
      size:'http://placehold.it/600X50'
    }
  }
}
</script>