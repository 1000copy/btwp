<template>
<div>
 <h2 >group</h2>
  <p>分组是对ul标签的css改造。可以看案例：</p>
  <h4>外形</h4>
   <list type="inline">
      <lp context="success">Item1</lp>
      <lp context="info">Item2</lp>
      <lp type="vested">Item3</lp>
      <lp type="vested">Item4</lp>
    </list>
  <h3>代码</h3>
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
    <h2 id="breadcrumb">breadcrumb</h2>
    <p>breadcrumb是对ul标签的css改造。可以显示当前页面的导航位置。看案例：</p>
    <!-- breadcrumb -->
    <breadcrumb>
        <li><a href="#">Level 1</a></li>
        <li><a href="#">Level 2</a></li>
        <li class="active">Level 3</li>
    </breadcrumb>
    <h3>代码</h3>
    <xmp>
         <breadcrumb>
            <li><a href="#">Level 1</a></li>
            <li><a href="#">Level 2</a></li>
            <li class="active">Level 3</li>
        </breadcrumb>
      </xmp>
    <!-- pagination -->
     <h2 id="pagination">group</h2>
    <p>pagination是对ul标签的css改造。可以显示分页列表和当前分页。看案例：</p>
    <pagination size="large">
        <li class="disabled"><a href="#">&laquo;</a></li>
        <li class="active"><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">&raquo;</a></li>
    </pagination>
    <h3>代码</h3>
    <xmp>
        <pagination size="large">
        <li class="disabled"><a href="#">&laquo;</a></li>
        <li class="active"><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">&raquo;</a></li>
    </pagination>
    </xmp>
    <!-- pager -->
     <h2 id="pager">pager</h2>
     <p>pager是对ul标签的css改造。可以显示翻页按钮，向前或者向后翻页。看案例：</p>
    <pager>
      <pager-part type="prev"><a href="#">Previous</a></pager-part>
      <pager-part type="next"><a href="#">Next</a></pager-part>
    </pager>
    <h3>代码</h3>
    <xmp>
         <pager>
            <pager-part type="prev"><a href="#">Previous</a></pager-part>
            <pager-part type="next"><a href="#">Next</a></pager-part>
          </pager>
    </xmp>
</div>
</template>
<script>
  import list from '../components/ul/list'
  import lp from '../components/ul/list-part'
  import breadcrumb from '../components/ul/breadcrumb'
  import pagination from '../components/ul/pagination'
  import pager from '../components/ul/pager'
  import pagerPart from '../components/ul/pager-part'
  export default {
    components: {    
      list,lp,breadcrumb,pagination,pager,pagerPart
    }
  }
</script>