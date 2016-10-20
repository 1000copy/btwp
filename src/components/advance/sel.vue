<template>
    <div class="btn-group" data-toggle="buttons" v-if="this.type == 'multi'">
        <label class="btn btn-primary active">
            <input type="checkbox" name="options"> Option 1
        </label>
        <label class="btn btn-primary">
            <input type="checkbox" name="options"> Option 2
        </label>
        <label class="btn btn-primary">
            <input type="checkbox" name="options"> Option 3
        </label>
    </div>
    <div class="btn-group" data-toggle="buttons" v-if="this.type == 'single'">
        <label class="btn btn-primary">
            <input type="radio" name="options"> Option 1
        </label>
        <label class="btn btn-primary">
            <input type="radio" name="options"> Option 2
        </label>
        <label class="btn btn-primary">
            <input type="radio" name="options"> Option 3
        </label>
    </div>

</template>

<script>

export default {

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




