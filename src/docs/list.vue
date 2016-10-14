<template>
 <h3>group</h2>
  <p>分组是对ul标签的css改造。可以看案例：</p>
  <h4>外形</h4>
   <list type="inline">
      <lp context="success">Item1</lp>
      <lp context="info">Item2</lp>
      <lp type="vested">Item3</lp>
      <lp type="vested">Item4</lp>
    </list>
  <h4>代码</h4>
    <xmp>
      <list type="inline">
        <lp context="success">Item1</lp>
        <lp context="info">Item2</lp>
        <lp type="vested">Item3</lp>
        <lp type="vested">Item4</lp>
      </list>
      </xmp>
    <h4>属性表（list）</h4>
    <table class="table">
      <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
      <tr><td>type</td><td>字符串</td><td>group|inline</td><td>分组为纵向排列，inline为横向排列</td></tr>
    </table>
    <h4>属性表（lp）</h4>
    <table class="table">
      <thead><td>属性</td><td>类型</td><td>取值</td><td>功能</td></thead>
      <tr><td>context</td><td>字符串</td><td>success|info|danger|warning|primary</td>
      <td>为列表项提供上下文的背景色</td></tr>
      <tr><td>type</td><td>字符串</td><td>vested|naked</td><td>指示列表项是否套线</td></tr>
      <tr><td></td><td></td><td></td></tr>
    </table>
</template>