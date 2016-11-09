<template>
<div>
    <btn type="primary" size="large">Run</btn>
    <btn type="primary" size="small">Run</btn>
    <btn type="primary" size="xsmall">Run</btn>
    <btn type="info">btn</btn>
      <btn type="info">
      <badge>42</badge>
  </btn>
  </div>
</template>
<script>

import {btn,badge} from '../components'

export default {
  components: {    
    btn,badge
  }
}
</script>