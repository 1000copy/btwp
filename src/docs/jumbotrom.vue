<template>
  <div>
    <h1>jumbotrom</h1>
    <h2>案例</h2>
	<jumbotron>
		    <h1>title</h1>
	        <p>content</p>
	        <p><a href="#"  class="btn btn-primary btn-lg">Run</a></p>
	</jumbotron>
	<h2>代码</h2>
	<xmp>
		&lt;jumbotron>
			&lt;h1>title</h1>
			&lt;p>content&lt;/p>
			&lt;p>&lt;a href="#"  class="btn btn-primary btn-lg">Run&lt;/a>&lt;/p>
		&lt;/jumbotron>
	</xmp>
	</div>
</template>

<script>
import {jumbotron} from '../components'
export default {
	components: {
		jumbotron
	}
}
</script>

<style>
</style>


