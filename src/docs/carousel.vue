<template>            
    <carousel>
       <carousel-part-indicators type="indicators">
            <carousel-indicator type="indicator" :index="0" active></carousel-indicator>
            <carousel-indicator type="indicator" :index="1" ></carousel-indicator>
            <carousel-indicator type="indicator" :index="2" ></carousel-indicator>
        </carousel-part-indicators>
        <!-- Wrapper for carousel items -->
        <carousel-part-inner>
            <carousel-item  src="http://placehold.it/600X50" active></carousel-item>
            <carousel-item  src="http://placehold.it/600X50" ></carousel-item>
            <carousel-item  src="http://placehold.it/600X50" ></carousel-item>
        </carousel-part-inner>
    </carousel>
</template>
<script>
    import carousel from '../components/div/carousel'
    import carouselPartInner from '../components/div/carousel-part-inner'
    import carouselPartIndicators from '../components/div/carousel-part-indicators'
    import carouselIndicator from '../components/div/carousel-indicator'
    import carouselItem from '../components/div/carousel-item'
    export default{
        components:{
            carousel,carouselIndicator,carouselPartIndicators,carouselPartInner,carouselItem
        }
    }
</script>