<template>
 <h2>icon</h2>
  <p>icon是对span标签的css改造。可以看案例：</p>
  <h4>外形</h4>
      <icon type="home"></icon>
  <h3>代码</h3>
    <xmp>
      <icon type="home"></icon>
    </xmp>
    <h4>属性表</h4>
    <table class="table">
      <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
      <tr><td>type</td><td>字符串</td><td>asterisk|forward..</td><td>完整列表参见：<a href="http://getbootstrap.com/components/#glyphicons-glyphs">glyphicons</a></td></tr>
    </table>
    <h2>lbl</h2>
  <p>lbl是对span标签的css改造。可以看案例：</p>
  <h4>外形</h4>
      <lbl type="info">label</lbl>
  <h3>代码</h3>
    <xmp>
       <lbl type="info">label</lbl>
    </xmp>
    <h4>属性表</h4>
    <table class="table">
      <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
      <tr><td>type</td><td>字符串</td><td>info|primary|warning|danger..</td><td></td></tr>
    </table>
    <h2>badge</h2>
  <p>badge是对span标签的css改造。可以看案例：</p>
  <h4>外形</h4>
      <badge>5</badge>
  <h3>代码</h3>
    <xmp>
      <badge>5</badge>
    </xmp>
   
</template>
<script>
  import icon from '../components/span/icon'
  import badge from '../components/span/badge'
  import lbl from '../components/span/label'
  
  export default {
    components: {    
      icon,badge,lbl
    }
  }
</script>