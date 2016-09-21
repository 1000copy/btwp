<template>
    <div :class="cc" class='item' v-if ="this.type == 'image'" > 
        <slot></slot>
    </div>
    <li data-target="#myCarousel" data-slide-to="{{index}}" :class="cc"
        v-if ="this.type == 'indicator'" ></li>
            
</template>

<script>

export default {
    ready () {
      if (this.type == undefined || this.type =='')
        this.type = 'image'
    },
    props: {
        active: {
          type: Boolean,
          require: false
        },
        index: {
          type: Number,
          require: true
        },
        type: {
          type: String,
          require: true
        }
    },
    data () {
      return {
        cc:{
          'active':this.active
        }
      }
    } 
}
</script>

<style>
</style>



