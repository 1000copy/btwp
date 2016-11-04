<script>
export default {
  render: function (createElement) {
   return createElement('div',
        {
            'class':{'carousel':true, 'slide':true},
            attrs:{
                id:'myCarousel',
              // 'class':'carousel slide',
              'data-ride':'carousel'

            }
        },
        [
          ol(createElement),
          inner(createElement),
          leftcontrol(createElement),
          rightcontrol(createElement)
        ]
   )      
  }
}
function img1(createElement,s){
  return createElement('img',{attrs:{src:'https://placehold.it/'+s}})
} 

function item(createElement,isa,s){
  return createElement('div',
      {'class':{'item':true,'active':isa}},
    [
      img1(createElement,s)
    ])
}

function inner(createElement){
  return createElement('div',{'class':{'carousel-inner':true}},[
      item(createElement,true,'1000X200')
    ,item(createElement,false,'1000X200')
    ,item(createElement,false,'1000X200')
    ])
}
function leftcontrol(createElement){
     return createElement('a',
          {
         attrs:{
           'href':'#myCarousel1',
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
           'href':'#myCarousel',
           'data-slide':'prev',
           'class':'carousel-control right'}
       },
    [
      right(createElement)
    ])
}
function ol(createElement){
     return createElement('ol',
          {
         attrs:{
           'class':'carousel-indicators'}
       },
    [
      li(createElement,true,0),
      li(createElement,false,1),
      li(createElement,false,2)
    ])
}   
function li(createElement,isa,index){
     return createElement('li',
          {
         'class':{'active':isa},
         attrs:{
           'data-target':'#myCarousel',
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