<template>
<div>
 <h1>image</h1>
 对图片的改造，可以给图片加上效果，比如圆角
 <h2>案例</h2>
  <image1 type="round" src="http://placehold.it/100X100"></image1>
  <image1 type="circle" src="http://placehold.it/100X100"></image1>
  <image1 type="thumbnail" src="http://placehold.it/100X100"></image1>
 <h2>代码</h2>
 <xmp>
  &lt;image1 type="round" src="http://placehold.it/100X100"></image1>
  &lt;image1 type="circle" src="http://placehold.it/100X100"></image1>
  &lt;image1 type="thumbnail" src="http://placehold.it/100X100"></image	1>
 </xmp>
  <table class="table">
      <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
      <tr><td>type</td><td>字符串</td><td>round|circle|thumbnail</td>
      <td>选择不同的效果</td></tr>
      
    </table>
</div>
</template>
<script>

import {image1} from '../components'

export default {
  components: {    
    image1
  },
  data(){
     return {
      size:'http://placehold.it/600X50'
    }
  }
}
</script>