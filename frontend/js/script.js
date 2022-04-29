document.onload = myfunc()

function myfunc(){
  (function(){
    ("#nav-placeholder").load("nav.html");
  });
}
