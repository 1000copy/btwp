<template>
  <div>
    <h2>案例</h2>
    <btn type="primary" data-toggle="modal" data-target="#myModal">ClickMe</btn>
    <modal id="myModal">
      <span slot="title">titlespan</span>
      <h1 slot="body">pbody</h1>
    </modal>
    <h2>代码</h2>
    <xmp>
      &lt;btn type="primary" data-toggle="modal" data-target="#myModal">ClickMe&lt;/btn>
      &lt;modal id="myModal">
        &lt;span slot="title">titlespan&lt;/span>
        &lt;h1 slot="body">pbody&lt;/h1>
      &lt;/modal>
    </xmp>

  <div>
   
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