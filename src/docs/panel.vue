<template>
<div>
  <tooltip  direction="right" href="#">tooltip</tooltip>  
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
  
</div>
   
</template>
<script>


import {well,modal,tooltip,sel1} from '../components'

export default {
  components: {    
    well,modal,tooltip,sel1
  },
  data(){
     return {
      size:'http://placehold.it/600X50'
    }
  }
}
</script>