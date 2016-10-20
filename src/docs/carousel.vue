<template>
 
  <carousel>
     <carousel-part type="indicators">
          <carousel-item type="indicator" :index="0" active></carousel-item>
          <carousel-item type="indicator" :index="1" ></carousel-item>
          <carousel-item type="indicator" :index="2" ></carousel-item>
      </carousel-part>
      <!-- Wrapper for carousel items -->
      <carousel-part type="inner">
          <carousel-item  src="http://placehold.it/600X50" active></carousel-item>
          <carousel-item  src="http://placehold.it/600X50" ></carousel-item>
          <carousel-item  src="http://placehold.it/600X50" ></carousel-item>
      </carousel-part>
  </carousel>
  

</template>
<script>


import carousel from '../components/div/carousel'
import carouselPart from '../components/div/carousel-part'
import carouselItem from '../components/div/carousel-item'

export default {
  components: {    
    carousel,carouselPart,carouselItem
  }
}
</script>