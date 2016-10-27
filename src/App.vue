<template>
    <container>
      <row>
        <column type="md-12">
           <navbar>
              <navbar-part type="logo" href="#logo">
                <h1>BootView docs</h1>
              </navbar-part>
            </navbar>
        </column>
      </row>
      <row>
        <column  type="md-4 sm-4">

            <panel type="info">
              <part type="header">基础类</part>
              <part type="body">
                 <list type="group">
                   <lp context="vested"><a href="#layout">ul</a></lp>
                   <lp context="vested"><a href="#span">span</a></lp>
                   <lp type="vested"><a href="#image">image</a></lp>
                   <lp type="vested"><a href="#button">button</a></lp>
                   <lp type="vested"><a href="#form">form</a></lp>
                 </list>
              </part>
            </panel>
            <panel type="info">
              <part type="header"><a href="#panel">高级类</a></part>
              <part type="body">
                 <list type="group">
                   <lp context="vested">dropdown</lp>
                   <lp context="vested">jumbotrom</lp>
                   <lp type="vested">carousel</lp>
                   <lp type="vested">navbar</lp>
                   <lp type="vested">popup</lp>
                 </list>
              </part>
            </panel>
            <panel type="info">
              <part type="header">布局</part>
              <part type="body">
                 <list type="group">
                   <lp context="vested">布局</lp>
                 </list>
              </part>
            </panel>
        </column>
        <column  type="md-8 sm-4"  >
           <!--  <router-view></router-view> -->
            <h1 id="list">list</h1>
            <list-doc ></list-doc> 
            <h1 id="span">span</h1>      
            <span-doc></span-doc>
            <h1 id="image">image</h1>
            <image-doc></image-doc>
            <h1 id="button">button</h1>
            <button-doc></button-doc>
            <h1 id="form">form</h1>
            <form-doc></form-doc>
            <h1 id="carousel">carousel</h1>
            <carousel-doc></carousel-doc>
            <h1 id="nav">nav</h1>
            <nav-doc></nav-doc>
            <h1 id="panel">panel</h1>
            <panel-doc></panel-doc>
        </column>
      </row>
  </container>
</template>

<script>
import listDoc from './docs/list'
import spanDoc from './docs/span'
import imageDoc from './docs/image'
import buttonDoc from './docs/button'
import carouselDoc from './docs/carousel'
import formDoc from './docs/form'
import navDoc from './docs/nav'
import panelDoc from './docs/panel'

import panel from './components/div/panel'
import part from './components/div/part'
import navbar from './components/nav/navbar'
import navbarPart from './components/nav/navbar-part'
import container from './components/layout/container'
import row from './components/layout/row'
import column from './components/layout/column'
// ul 
import list from './components/ul/list'
import lp from './components/ul/list-part'
import caro from './components/div/caro'

export default {
  components: {   
    caro,
    listDoc,spanDoc,imageDoc,buttonDoc,formDoc,carouselDoc,navDoc,panelDoc,
 
    panel,part,list,lp,
    navbar,navbarPart,
    container,row,column
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  /*display: flex;*/
  align-items: center;
  justify-content: center;
  height: 100%;
}


code { 
    background: hsl(220, 80%, 90%); 
}

pre {
    white-space: pre-wrap;
    background: hsl(30,80%,90%);
}
h1{
  background: hsl(30,80%,90%);
}

</style>
