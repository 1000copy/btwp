<template>
  <carousel>
   <carousel-part-indicators >
        <carousel-indicator type="indicator" :index="0" active></carousel-indicator>
        <carousel-indicator type="indicator" :index="1" ></carousel-indicator>
        <carousel-indicator type="indicator" :index="2" ></carousel-indicator>
    </carousel-part-indicators>
    <!-- Wrapper for carousel items -->
    <carousel-part-inner >
        <carousel-item  src="http://placehold.it/100X50" active></carousel-item>
        <carousel-item  src="http://placehold.it/100X50" ></carousel-item>
        <carousel-item  src="http://placehold.it/100X50" ></carousel-item>
    </carousel-part-inner>
  </carousel>
</template>

<script>
import carousel from '../components/div/carousel'
import carouselPartIndicators from '../components/div/carousel-part-indicators'
import carouselPartInner from '../components/div/carousel-part-inner'
import carouselItem from '../components/div/carousel-item'
import carouselIndicator from '../components/div/carousel-indicator'

export default {
  components: {    
    carousel,carouselPartIndicators,carouselPartInner,carouselItem,carouselIndicator
  }
}
</script>
<style>
/*carousel{
  height:200px;
}
*/</style>