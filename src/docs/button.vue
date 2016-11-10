<template>

<div>
  <h2>案例</h2>
      <btn type="primary" size="large">Run</btn>
      <btn type="info" size="small">Run</btn>
      <btn type="danger" size="xsmall">Run</btn>
      
      
  <h2>代码</h2>
  <xmp>
      &lt;btn type="primary" size="large">Run&lt;/btn>
      &lt;btn type="info" size="small">Run&lt;/btn>
      &lt;btn type="danger" size="xsmall">Run&lt;/btn>
  </xmp>
  <table class="table">
        <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
        <tr><td>type</td><td>字符串</td><td>primary|info|warning|danger</td><td></td></tr>
        <tr><td>size</td><td>字符串</td><td>large|small|xsmall</td><td></td></tr>
  </table>
</div>
</template>
<script>

import {btn,badge} from '../components'

export default {
  components: {    
    btn,badge
  }
}
</script>