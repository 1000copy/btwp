<template>
  <div id="app">
    <container>
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
            <panel type="info">
              <part type="header">基础类</part>
              <part type="body">
                 <list type="group">
                   <lp context="vested"><a href="#layout">ul</a></lp>
                   <lp context="vested"><a href="#span">span</a></lp>
                   <lp type="vested">image</lp>
                   <lp type="vested">button</lp>
                   <lp type="vested">input</lp>
                   <lp type="vested">form</lp>
                 </list>
              </part>
            </panel>
            <panel type="info">
              <part type="header">高级类</part>
              <part type="body">
                 <list type="group">
                   <lp context="vested">dropdown</lp>
                   <lp context="vested">jumbotrom</lp>
                   <lp type="vested">carousel</lp>
                   <lp type="vested">navbar</lp>
                   <lp type="vested">popup</lp>
                 </list>
              </part>
            </panel>
            <panel type="info">
              <part type="header">布局</part>
              <part type="body">
                 <list type="group">
                   <lp context="vested">布局</lp>
                 </list>
              </part>
            </panel>
        </column>
        <column  type="md-8 sm-4"  >
            <h1 id="list">list</h1>
            <list-doc ></list-doc> 
            <h1 id="span">span</h1>      
            <span-doc></span-doc>
           
           <image1 type="round" src="http://placehold.it/100X100"></image1>    
            <btn type="primary" size="large">Run</btn>
            <btn type="primary" size="small">Run</btn>
            <btn type="primary" size="xsmall">Run</btn>
            <tooltip  direction="right" href="#">tooltip</tooltip>
            <alert type="success">success</alert>
            <btn type="info">btn</btn>
            
            

            <panel type="info">
              <part type="header">header</part>
              <part type="body">body</part>
              <part type="footer">footer</part>
            </panel>
            <well size="large">well</well>
            <list type="inline">
              <lp type="naked" >Item1</lp>
              <lp type="vested">Item2</lp>
              <lp type="vested">Item3</lp>
            </list>
           
            <nv type="pill">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#">Login</a></li>
                <li><a href="#">About</a></li>
            </nv>
            <nv type="tab">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#">Login</a></li>
                <li><a href="#">About</a></li>
            </nv>
            <dropdown>
                <li><a href="#">Action1</a></li>
                <li><a href="#">Action2</a></li>
            </dropdown>
            <btn type="info">
                <badge>42</badge>
            </btn>
            <!-- navbar -->
            <navbar>
              <navbar-part type="logo" href="#logo">Logo</navbar-part>
              <navbar-part type="nav" >
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
              </navbar-part>
              <navbar-part type="dropdown" >
                  <li><a href="#">Action1</a></li>
                  <li><a href="#">Action2</a></li>
              </navbar-part>
              <navbar-part type="search"></navbar-part>
            </navbar>
            <!-- carousel -->
            <carousel>
               <carousel-part type="indicators">
                    <carousel-item type="indicator" :index="0" active></carousel-item>
                    <carousel-item type="indicator" :index="1" ></carousel-item>
                    <carousel-item type="indicator" :index="2" ></carousel-item>
                </carousel-part>
                <!-- Wrapper for carousel items -->
                <carousel-part type="inner">
                    <carousel-item  src="http://placehold.it/600X50" active></carousel-item>
                    <carousel-item  src="http://placehold.it/600X50" ></carousel-item>
                    <carousel-item  src="http://placehold.it/600X50" ></carousel-item>
                </carousel-part>
            </carousel>
            
            <div>
              <btn type="primary" data-toggle="modal" data-target="#myModal">modal</btn>
              <modal id="myModal">
                <span slot="title">titlespan</span>
                <h1 slot="body">pbody</h1>
              </modal>
            <div>
            <!-- 问题不少，先放着 -->
            <sel1 type="multi"></sel1>
            <!-- <sel1 type="single"></sel1> -->
            <jumbotron>
              <h1>title</h1>
              <p>content</p>
              <p><btn type="primary" size="large">Run</a></p>
            </jumbotron>
            <frm type="inline">
                <form-control label="Email" type="email"></form-control>
                <form-control label="Password" type="password"></form-control>
                <btn type="primary">Login</button>
            </frm>
           
          </div>
        </column>
      </row>
  </container>
  
    
  <container id="layout">
        <row>
          <column  type="md-1 sm-4" style="background-color:blue">
              left
          </column>
          <column  type="md-8 sm-4"  style="background-color:red">
           middle
          </column>
          <column  type="md-2 sm-4" style="background-color:blue">
            right
          </column> 
        </row>
    </container>
</template>

<script>
import listDoc from './docs/list'
import spanDoc from './docs/span'
import Hello from './components/Hello'
import alert from './components/div/alert'
import panel from './components/div/panel'
import well from './components/div/well'
import part from './components/div/part'
import dropdown from './components/div/dropdown'
import carousel from './components/div/carousel'
import icon from './components/span/icon'
import badge from './components/span/badge'
import btn from './components/btn'
import lbl from './components/span/label'

import nv from './components/nav/nav'
import navbar from './components/nav/navbar'
import navbarPart from './components/nav/navbar-part'
import carouselPart from './components/div/carousel-part'
import carouselItem from './components/div/carousel-item'
import image1 from './components/image/image'
import modal from './components/advance/modal'
import tooltip from './components/advance/tooltip'
import sel1 from './components/advance/sel'
import jumbotron from './components/advance/jumbotron'
import frm from './components/advance/form'
import formControl from './components/advance/form-control'
import container from './components/layout/container'
import row from './components/layout/row'
import column from './components/layout/column'
// ul 
import list from './components/ul/list'
import lp from './components/ul/list-part'
import breadcrumb from './components/ul/breadcrumb'
import pagination from './components/ul/pagination'
import pager from './components/ul/pager'
import pagerPart from './components/ul/pager-part'

export default {
  components: {    
    listDoc,spanDoc,
    alert,
    icon,badge,
    btn,lbl,
    panel,part,well,list,lp,breadcrumb,pagination,pager,pagerPart,dropdown,carousel,
    nv,navbar,navbarPart,carouselPart,carouselItem,image1,
    modal,tooltip,
    sel1,jumbotron,frm,formControl,
    container,row,column
  },
  data(){
     return {
      size:'http://placehold.it/600X50'
    }
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
h1{
  background: hsl(30,80%,90%);
}

</style>
