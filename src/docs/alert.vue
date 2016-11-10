<template>

<div>
  <h2>案例</h2>
  <alert type="success" closeable>
      <h1>caption</h1>
      <p>content</p>
  </alert>
  <h2>代码</h2>
  <xmp>
      &lt;alert type="success" closeable>
          &lt;h1>caption&lt;/h1>
          &lt;p>content&lt;/p>
      &lt;/alert>
  </xmp>
  <table class="table table-striped">
      <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
      <tr><td>type</td><td>字符串</td><td>success|info|warning|danger</td>
          <td>选择不同上下文背景色</td></tr>
      <tr><td>closeable</td><td>布尔类型</td><td>true|false</td>
          <td>是否显示关闭按钮</td></tr>
  </table>
</div>
</template>
<script>

import {alert} from '../components'

export default {
  components: {    
    alert
  }
}
</script>