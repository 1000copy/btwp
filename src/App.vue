<template>
    <container id="app">
      <row>
        <column type="md-12">
           <navbar>
              <navbar-part type="logo" href="#logo">
                <h1>BootView docs</h1>
               
              </navbar-part>
            </navbar>
        </column>
      </row>
      <row>
        <column  type="md-4 sm-4">
           <dir></dir>
        </column>
        <column  type="md-8 sm-4"  >
            <router-view></router-view>
        </column>
      </row>
  </container>
</template>

<script>
import anchoredHeading from './components/anchor'
import dir from './docs/dir'
import navbar from './components/nav/navbar'
import navbarPart from './components/nav/navbar-part'

import container from './components/layout/container'
import row from './components/layout/row'
import column from './components/layout/column'
import aaa from './components/a'
export default {
  components: {   
    anchoredHeading,
    dir,
    navbar,navbarPart,
    container,row,column,aaa
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  /*display: flex;*/
  align-items: center;
  justify-content: center;
  height: 100%;
}


code { 
    background: hsl(220, 80%, 90%); 
}

pre {
    white-space: pre-wrap;
    background: hsl(30,80%,90%);
}
/*h1{
  background: hsl(30,80%,90%);
}*/

</style>
