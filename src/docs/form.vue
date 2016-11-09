<template>
  <frm type="inline">
      <form-control label="Email" type="email"></form-control>
      <form-control label="Password" type="password"></form-control>
  </frm>
   
</template>
<script>

import {frm,formControl} from '../components'


export default {
  components: {    
    frm,formControl
  }
}
</script>