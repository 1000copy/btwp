<template>
  <div id="app">
    <alert type="success">success</alert>
    <icon type="home"></icon>
    <btn type="info">btn</btn>
    <lbl type="info">label</lbl>

   <panel type="info">
      <part type="header">header</part>
      <part type="body">body</part>
      <part type="footer">footer</part>
    </panel>
    <well size="large">well</well>
    <list type="inline">
      <lp type="naked">Item1</lp>
      <lp type="vested">Item2</lp>
      <lp type="vested">Item3</lp>
    </list>
    <list type="group">
      <lp >Item1</lp>
      <lp >Item2</lp>
      <lp type="vested">Item3</lp>
    </list>
  </div>
</template>

<script>
import Hello from './components/Hello'
import alert from './components/div/alert'
import panel from './components/div/panel'
import well from './components/div/well'
import part from './components/div/part'
import icon from './components/span/icon'
import btn from './components/btn'
import lbl from './components/span/label'
import list from './components/ul/list'
import lp from './components/ul/list-part'

export default {
  components: {    alert,icon,btn,lbl,
    panel,part,well,list,lp

  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
