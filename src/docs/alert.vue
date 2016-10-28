<template>

<div>
 
  <alert type="success" closeable>
      <h1>caption</h1>
      <p>content</p>
  </alert>
  <alert type="info" closeable><!-- warning,danger -->
      <h1>caption</h1>
      <p>content</p>
  </alert>
</div>
</template>
<script>

import alert from '../components/div/alert'

export default {
  components: {    
    alert
  }
}
</script>