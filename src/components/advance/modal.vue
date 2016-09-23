<template>
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">
                        <slot name="title"></slot>
                    </h4>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  ready () {
   
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



