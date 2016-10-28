<template>
<div>
  <panel type="info">
    <part type="header">基础类</part>
    <part type="body">
       <list type="group">
         <lp context="vested"><router-link to="/ul">ul</router-link></lp>
         <lp context="vested"><router-link to="/span">span</router-link></lp>
         <lp type="vested"><router-link to="/image">image</router-link></lp>
         <lp type="vested"><router-link to="/button">button</router-link></lp>
         <lp type="vested"><router-link to="/form">form</router-link></lp>
       </list>
    </part>
  </panel>
  <panel type="info">
    <part type="header"><router-link to="/panel">高级类</a></part>
    <part type="body">
       <list type="group">
         <lp context="vested"><router-link to="/dropdown">dropdown</router-link></lp>
         <lp context="vested"><router-link to="jumbotrom">jumbotrom</router-link></lp>
         <lp type="vested"><router-link to="/carousel">carousel</router-link></lp>
         <lp type="vested"><router-link to="/navbar">navbar</router-link></lp>
         <lp type="vested"><router-link to="/nav">nav</router-link></lp>
         <lp type="vested"><router-link to="/alert">alert</router-link></lp>
       </list>
    </part>
  </panel>
  <panel type="info">
    <part type="header">布局</part>
    <part type="body">
       <list type="group">
         <lp context="vested"><router-link to="/layout">layout</router-link></lp>
       </list>
    </part>
  </panel>
</div>
</template>

<script>

import panel from '../components/div/panel'
import part from '../components/div/part'
import navbar from '../components/nav/navbar'
import navbarPart from '../components/nav/navbar-part'

import container from '../components/layout/container'
import row from '../components/layout/row'
import column from '../components/layout/column'
// ul 
import list from '../components/ul/list'
import lp from '../components/ul/list-part'

export default {
  components: {   
    
    panel,part,list,lp,
    navbar,navbarPart,
    container,row,column
  }
}
</script>
