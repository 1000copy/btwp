<template>
<div>
  <h2>案例</h2>
  <sel1 type="multi"></sel1>
  <h2>代码</h2>
  <xmp>
    &lt;sel1 type="multi">&lt;/sel1>
  </xmp>
   <table class="table">
        <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
        <tr><td>type</td><td>字符串</td><td>multi|single</td><td></td></tr>
  </table>
  </div>
</template>
<script>


import {sel1} from '../components'

export default {
  components: {    
    sel1
  },
  data(){
     return {
      size:'http://placehold.it/600X50'
    }
  }
}
</script>