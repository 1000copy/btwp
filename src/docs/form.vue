<template>
<div>
<h2>案例</h2>
  <frm type="inline">
      <form-control label="Email" type="email"></form-control>
      <form-control label="Password" type="password"></form-control>
  </frm>
  <h2>代码</h2>
  <xmp>
		&lt;frm type="inline">
			&lt;form-control label="Email" type="email">&lt;/form-control>
			&lt;form-control label="Password" type="password">&lt;/form-control>
		&lt;/frm>
  </xmp>
    <table class="table">
        <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
        <tr><td>type</td><td>字符串</td><td>vertical |inline</td><td></td></tr>
  </table>
</div>
</template>
<script>

import {frm,formControl} from '../components'


export default {
  components: {    
    frm,formControl
  }
}
</script>