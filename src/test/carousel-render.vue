<script>
var idvalue = 'myCarousel'
var idsym = '#'+idvalue
export default {
  render: function (createElement) {
    var urls = geturls(this.$slots.default)
    console.log(urls)
   return createElement('div',
        {
            'class':{'carousel':true, 'slide':true},
            attrs:{
              id:idvalue,
              'data-ride':'carousel'

            }
        },
        [
          ol(createElement,urls),
          inner(createElement,urls),
          leftcontrol(createElement),
          rightcontrol(createElement)
        ]
   )      
  }
}
function geturls(slot){
  var urls = []
  for(var i=0;i<slot.length;i++)
    if (slot[i].tag === 'img'){
      urls.push(slot[i].data.attrs.src )
    }
  return urls
}

function inner(createElement,urls){
  var all = getitems(createElement,urls)
  // console.log(all)
  return createElement('div',{'class':{'carousel-inner':true}},all)
}
function getitems(createElement,urls){
  var items = []
  for(var i=0;i<urls.length;i++)
    items.push(item2(createElement,i==0,urls[i]))
  return items
}
function img2(createElement,s){
  return createElement('img',{attrs:{src:s}})
} 

function item2(createElement,isa,s){
  return createElement('div',
      {'class':{'item':true,'active':isa}},
    [
      img2(createElement,s)
    ])
}
function leftcontrol(createElement){
     return createElement('a',
          {
         attrs:{
           'href':idsym,
           'data-slide':'prev',
           'class':'carousel-control left'}
       },
    [
      left(createElement)
    ])
}
function rightcontrol(createElement){
     return createElement('a',
          {
         attrs:{
           'href':idsym,
           'data-slide':'next',
           'class':'carousel-control right'}
       },
    [
      right(createElement)
    ])
}
function ol(createElement,urls){
     return createElement('ol',
          {
         attrs:{
           'class':'carousel-indicators'}
       },
       getlis(createElement,urls)
    // [
    //   li(createElement,true,0),
    //   li(createElement,false,1),
    //   li(createElement,false,2)
    // ]
    )
}   
function getlis(createElement,urls){
  var items = []
  for(var i=0;i<urls.length;i++)
    items.push(li(createElement,i==0,i))
  return items
}
function li(createElement,isa,index){
     return createElement('li',
          {
         'class':{'active':isa},
         attrs:{
           'data-target':idsym,
           'data-slide-to':index
           }
          },
    [])
}

function right(createElement){
     return createElement('span',
          {
         attrs:{
           'class':'glyphicon glyphicon-chevron-right'}
       },
    [])
}
function left(createElement){
     return createElement('span',
          {
         attrs:{
           'class':'glyphicon glyphicon-chevron-left'}
       },
    []) 
}
</script>