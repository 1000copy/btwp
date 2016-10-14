<template>
  <div id="app">
  <h1>基础类</h1>
  <h2>list</h2>
  <list-doc></list-doc>
    <breadcrumb>
        <li><a href="#">Level 1</a></li>
        <li><a href="#">Level 2</a></li>
        <li class="active">Level 3</li>
    </breadcrumb>
    <pagination size="large">
        <li class="disabled"><a href="#">&laquo;</a></li>
        <li class="active"><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">&raquo;</a></li>
    </pagination>
    <pager>
      <pager-part type="prev"><a href="#">Previous</a></pager-part>
      <pager-part type="next"><a href="#">Next</a></pager-part>
    </pager>

    <btn type="primary" size="large">Run</btn>
    <btn type="primary" size="small">Run</btn>
    <btn type="primary" size="xsmall">Run</btn>
    <tooltip  direction="right" href="#">tooltip</tooltip>
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
    <image1 type="round" src="http://placehold.it/600X50"></image1>
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
  <container>
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
import list from './components/ul/list'
import lp from './components/ul/list-part'
import breadcrumb from './components/ul/breadcrumb'
import pagination from './components/ul/pagination'
import pager from './components/ul/pager'
import pagerPart from './components/ul/pager-part'
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
export default {
  components: {    
    listDoc,
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


</style>
