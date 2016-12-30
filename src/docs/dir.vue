<template>
<div>
  <panel type="info">
    <part type="header">基础类 <aaa></aaa></part>
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
         <lp context="vested"><router-link to="/jumbotrom">jumbotrom</router-link></lp>
         <lp type="vested"><router-link to="/carousel">carousel</router-link></lp>
         <lp type="vested"><router-link to="/navbar">navbar</router-link></lp>
         <lp type="vested"><router-link to="/nav">nav</router-link></lp>
         <lp type="vested"><router-link to="/alert">alert</router-link></lp>
         <lp type="vested"><router-link to="/well">well</router-link></lp>
         <lp type="vested"><router-link to="/tooltip">tooltip</router-link></lp>
         <lp type="vested"><router-link to="/selection">selection</router-link></lp>
         <lp type="vested"><router-link to="/modal">modal</router-link></lp>
       </list>
    </part>
  </panel>
  
</div>
</template>

<script>

import {panel,part,list,lp,aaa} from '../components'

export default {
  components: {       
    panel,part,list,lp
  }
}
</script>
