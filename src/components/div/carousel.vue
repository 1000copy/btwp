<template>
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <!-- Carousel indicators -->
        <slot></slot>
        <!-- Carousel controls -->
        <a class="carousel-control left" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a class="carousel-control right" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
    </div>
</template>

<script>



export default {

    components:{

    },
    props: {
        type: {
          type: String,
          require: true
        }
    },
    data () {
      return {
       
        cc:{
         
        }
      }
    } 
}
</script>

<style>
</style>



