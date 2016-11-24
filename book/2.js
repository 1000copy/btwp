<script type="x-template" id="t">
    <div>
  		<span>{{count}}</span>
      <button v-on:click="inc">+</button>
    </div>
</script>

<script>
var counter = {
          'template':'#t',
         data () {
            return {count: 0}
          },
          methods: {
            inc () {this.count++}
          }
    }
</script>