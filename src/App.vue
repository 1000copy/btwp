<template>
  <div id="app">
    <alert type="success">success</alert>
    <icon type="home"></icon>
    <btn type="info">btn</btn>
    <lbl type="info">label</lbl>

   <panel type="info">
      <part type="header">header</part>
      <part type="body">body</part>
      <part type="footer">footer</part>
    </panel>
    <well size="large">well</well>
    <list type="inline">
      <lp type="naked" >Item1</lp>
      <lp type="vested">Item2</lp>
      <lp type="vested">Item3</lp>
    </list>
    <list type="group">
      <lp context="success">Item1</lp>
      <lp context="info">Item2</lp>
      <lp type="vested">Item3</lp>
      <li type="vested">Item4</li>
    </list>
    <breadcrumb>
        <li><a href="#">Level 1</a></li>
        <li><a href="#">Level 2</a></li>
        <li class="active">Level 3</li>
    </breadcrumb>
    <pagination size="large">
        <li class="disabled"><a href="#">&laquo;</a></li>
        <li class="active"><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">&raquo;</a></li>
    </pagination>
    <pager>
      <pager-part type="prev"><a href="#">Previous</a></pager-part>
      <pager-part type="next"><a href="#">Next</a></pager-part>
    </pager>
    <nv type="pill">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">About</a></li>
    </nv>
    <nv type="tab">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">About</a></li>
    </nv>
    <dropdown>
        <li><a href="#">Action1</a></li>
        <li><a href="#">Action2</a></li>
    </dropdown>
    <btn type="info">
        <badge>42</badge>
    </btn>
  </div>
</template>

<script>
import Hello from './components/Hello'
import alert from './components/div/alert'
import panel from './components/div/panel'
import well from './components/div/well'
import part from './components/div/part'
import dropdown from './components/div/dropdown'
import icon from './components/span/icon'
import badge from './components/span/badge'
import btn from './components/btn'
import lbl from './components/span/label'
import list from './components/ul/list'
import lp from './components/ul/list-part'
import breadcrumb from './components/ul/breadcrumb'
import pagination from './components/ul/pagination'
import pager from './components/ul/pager'
import pagerPart from './components/ul/pager-part'
import nv from './components/nav/nav.vue'
export default {
  components: {    
    alert,
    icon,badge,
    btn,lbl,
    panel,part,well,list,lp,breadcrumb,pagination,pager,pagerPart,dropdown,
    nv

  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
