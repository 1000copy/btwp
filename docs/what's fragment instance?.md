#what's fragment instance?

封装navbar-part，内容如下：

    <a class="navbar-brand" href="{{href}}" v-if="this.type == 'logo'">
     <slot></slot>
    </a>
    <!-- nav -->
    <ul class="nav navbar-nav" v-if="this.type == 'nav'">
      <slot></slot>
    </ul>
    <form class="navbar-form" v-if="this.type == 'search'">
    </form>
    <ul class="nav navbar-nav" v-if="this.type == 'dropdown'">
    </ul>

在调用此组件时，使用的是：

    <navbar>
       <navbar-part type="logo" href="#logo">Logo</navbar-part>

然而，总是发现vue报警告：
	
    Attribute href is ignored on component navbar-part because the component is a fragment instance.
    
满头雾水啊：什么是文档片段，为什么是文档片段就得忽略href？

原来把文档标签加上一个外套，就不是文档片段了：
  <div>
  	<a class="navbar-brand" href="{{href}}" v-if="this.type == 'logo'">
       <slot></slot>
      </a>
      <!-- nav -->
      <ul class="nav navbar-nav" v-if="this.type == 'nav'">
        <slot></slot>
      </ul>
      <form class="navbar-form" v-if="this.type == 'search'">
      </form>
      <ul class="nav navbar-nav" v-if="this.type == 'dropdown'">
      </ul>
  </div>

解决了问题，想通就容易了。vue认为我的template内的文档没有一个单根（root),所以如果把href带入的话，应该给那个标签呢，毕竟有form、a、ul都可能。vue不知道怎么办，因此只有忽略并报警。

现在套了一个div，href加入到div时无意义的，此时可以使用{{href}}，明确的指定到a标签即可。

ref: http://forum.vuejs.org/topic/613/add-props-and-transition-when-component-is-a-fragment-instance