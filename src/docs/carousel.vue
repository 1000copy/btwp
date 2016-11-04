<template>          
<div>  
  <h1>carousel</h1>
  <h2>案例</h2>
    <carousel indicators controls>
      <img src="https://placehold.it/999X200"></img>
      <img src="https://placehold.it/999X200"></img>
      <img src="https://placehold.it/999X200"></img>
    </carousel>
   <h2>代码</h2>
   <xmp>
      &lt;carousel indicators controls>
          &lt;img src="https://placehold.it/999X200"></img>
          &lt;img src="https://placehold.it/999X200"></img>
          &lt;img src="https://placehold.it/999X200"></img>
      &lt;/carousel>
   </xmp>
   </div>
</template>
<script>
    import carousel from '../components/div/caro'
    export default{
        components:{
            carousel
        }
    }
</script>