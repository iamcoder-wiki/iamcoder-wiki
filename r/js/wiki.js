let search_data={},searchBox=document.getElementsByClassName("search-w")[0],searchState=0,inputWrap=document.getElementsByClassName("search-input-w")[0],input=document.getElementById("t-s-input"),button=document.getElementById("t-s-button"),result=document.getElementById("t-search-result"),selected=null,list=[];function goto(e){console.log(e),window.location.href="/w/"+e}function updateList(){let e=input.value.toLowerCase();searchState=e.length>0?2:1;let t=search_data[e];if(t){list!==(t=(t=t.sort()).slice(0,10))&&(selected=null),list=t;let s='<div class="search-result">';for(let n=0;n<list.length;n++)selected===n?s+='<div id="t-s-r-'+n+'" class="selected" onmouseenter="updateSelection('+n+');" onmouseleave="updateSelection(null);" onclick="goto(\''+list[n]+"')\">"+list[n]+"</div>":s+='<div id="t-s-r-'+n+'" onmouseenter="updateSelection('+n+');" onmouseleave="updateSelection(null);" onclick="goto(\''+list[n]+"')\">"+list[n]+"</div>";s+="</div>",result.classList.remove("hide"),result.innerHTML=s}else list=[],result.classList.add("hide"),result.innerHTML=""}function updateSelection(e){selected!==e&&(null!==selected&&document.getElementById("t-s-r-"+selected).classList.remove("selected"),null!==e&&document.getElementById("t-s-r-"+e).classList.add("selected"),selected=e)}function onKey(e,t,s,n){(e.which===t||e.keyCode===t||e.key===s)&&(e.preventDefault(),n())}function openSearchBox(){searchBox.classList.add("expand"),setTimeout(function(){inputWrap.classList.remove("hide"),input.value.length>0&&result.classList.remove("hide"),input.focus()},210),searchState=1}function closeSearchBox(){searchBox.classList.remove("expand"),input.blur(),inputWrap.classList.add("hide"),result.classList.add("hide"),searchState=0}!function e(){let e=document.querySelector(".toc"),t=document.querySelector(".toc-marker path"),s,n,l,i;function o(){s=(s=(s=[].slice.call(e.querySelectorAll("li"))).map(function(e){let t=e.querySelector("a"),s=document.getElementById(t.getAttribute("href").slice(1));return{listItem:e,anchor:t,target:s}})).filter(function(e){return!!e.target});let l=[],i;s.forEach(function(e,s){let n=e.anchor.offsetLeft-5,o=e.anchor.offsetTop,a=e.anchor.offsetHeight;0===s?(l.push("M",n,o,"L",n,o+a),e.pathStart=0):(i!==n&&l.push("L",i,o),l.push("L",n,o),t.setAttribute("d",l.join(" ")),e.pathStart=t.getTotalLength()||0,l.push("L",n,o+a)),i=n,t.setAttribute("d",l.join(" ")),e.pathEnd=t.getTotalLength()}),n=t.getTotalLength(),a()}function a(){let e=window.innerHeight,o=n,a=0,c=0;s.forEach(function(t){let s=t.target.getBoundingClientRect();s.bottom>.05*e&&s.top<1*e?(o=Math.min(t.pathStart,o),a=Math.max(t.pathEnd,a),c+=1,t.listItem.classList.add("visible")):t.listItem.classList.remove("visible")}),c>0&&o<a?(o!==l||a!==i)&&(t.setAttribute("stroke-dashoffset","1"),t.setAttribute("stroke-dasharray","1, "+o+", "+(a-o)+", "+n),t.setAttribute("opacity",1)):t.setAttribute("opacity",0),l=o,i=a}window.addEventListener("resize",o,!1),window.addEventListener("scroll",a,!1),o()}(),function e(){let t=new XMLHttpRequest;t.open("GET","/r/search.json"),t.send(),t.onload=function(){search_data=JSON.parse(t.response)},input.addEventListener("keydown",function(e){onKey(e,13,"Enter",function(){2===searchState&&goto(list[selected||0]||input.value)}),onKey(e,40,"ArrowDown",function(){let e=selected;null===e?e=0:e++,e>=list.length&&(e=null),updateSelection(e)}),onKey(e,38,"ArrowUp",function(){let e=selected;null===e?e=list.length-1:e--,e<0&&(e=null),updateSelection(e)}),onKey(e,27,"Escape",function(){input.blur()})}),input.addEventListener("input",function(){updateList()}),button.addEventListener("click",function(){0===searchState?openSearchBox():1===searchState?closeSearchBox():goto(list[selected||0]||input.value)})}(),document.addEventListener("keydown",function(e){0===searchState?onKey(e,191,"/",openSearchBox):document.activeElement!==input&&(onKey(e,191,"/",function(){input.focus()}),onKey(e,27,"Escape",closeSearchBox))});let themeButton=document.getElementById("t-t-button"),themeIcon=document.getElementById("t-t-icon"),darkThemeCss=document.getElementById("r-dark"),lightThemeCss=document.getElementById("r-light");function changeTheme(){let e=document.getElementsByTagName("html")[0];"dark"===e.classList[0]?(e.classList=["light"],darkThemeCss.disabled=!0,lightThemeCss.disabled=!1,themeIcon.classList.remove("fa-sun"),themeIcon.classList.remove("fa-lg"),themeIcon.classList.add("fa-moon"),setCookie("theme","light",365)):(e.classList=["dark"],darkThemeCss.disabled=!1,lightThemeCss.disabled=!0,themeIcon.classList.remove("fa-moon"),themeIcon.classList.add("fa-sun"),themeIcon.classList.add("fa-lg"),setCookie("theme","dark",365))}function setCookie(e,t,s){let n="";if(s){let l=new Date;l.setTime(l.getTime()+864e5*s),n="; expires="+l.toUTCString()}document.cookie=e+"="+(t||"")+n+"; path=/"}function getCookie(e){let t=e+"=",s=document.cookie.split(";");for(let n=0;n<s.length;n++){let l=s[n];for(;" "===l.charAt(0);)l=l.substring(1,l.length);if(0===l.indexOf(t))return l.substring(t.length,l.length)}return null}themeButton.addEventListener("click",changeTheme),function(){let e=getCookie("theme");null===e&&(e="dark"),document.getElementsByTagName("html")[0].classList[0]!==e&&changeTheme()}();