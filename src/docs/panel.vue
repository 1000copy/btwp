<template>
<div>
  <tooltip  direction="right" href="#">tooltip</tooltip>
  <alert type="success">success</alert>
  <panel type="info">
    <part type="header">header</part>
    <part type="body">body</part>
    <part type="footer">footer</part>
  </panel>
  <well size="large">well</well>
  <div>
    <btn type="primary" data-toggle="modal" data-target="#myModal">modal</btn>
    <modal id="myModal">
      <span slot="title">titlespan</span>
      <h1 slot="body">pbody</h1>
    </modal>
  <div>
  <!-- 问题不少，先放着 -->
  <sel1 type="multi"></sel1>
  <!-- <sel1 type="single"></sel1> -->
  <jumbotron>
    <h1>title</h1>
    <p>content</p>
    <p><btn type="primary" size="large">Run</a></p>
  </jumbotron>
</div>
   
</template>
<script>


import alert from '../components/div/alert'
import panel from '../components/div/panel'
import well from '../components/div/well'
import part from '../components/div/part'
import dropdown from '../components/div/dropdown'
import icon from '../components/span/icon'
import badge from '../components/span/badge'
import btn from '../components/btn'
import lbl from '../components/span/label'

import nv from '../components/nav/nav'
import navbar from '../components/nav/navbar'
import navbarPart from '../components/nav/navbar-part'
import modal from '../components/advance/modal'
import tooltip from '../components/advance/tooltip'
import sel1 from '../components/advance/sel'
import jumbotron from '../components/advance/jumbotron'
import container from '../components/layout/container'
import row from '../components/layout/row'
import column from '../components/layout/column'


export default {
  components: {    
    alert,
    icon,badge,
    btn,lbl,
    panel,part,well,dropdown,
    nv,navbar,navbarPart,
    modal,tooltip,
    sel1,jumbotron,
    container,row,column
  },
  data(){
     return {
      size:'http://placehold.it/600X50'
    }
  }
}
</script>