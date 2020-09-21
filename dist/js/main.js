!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(2)},function(e,t){[Element.prototype,CharacterData.prototype,DocumentType.prototype].filter(Boolean).forEach((function(e){e.hasOwnProperty("remove")||Object.defineProperty(e,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode&&this.parentNode.removeChild(this)}})}))},function(e,t){var n=null,i=[],o=!1,a=-1,r={elements:[{id:0,src:"building1.png",width:434,height:208,x:20,y:50},{id:1,src:"building2.png",width:550,height:100,x:500,y:700},{id:2,src:"building3.png",width:158,height:110,x:70,y:650},{id:3,src:"building6.png",width:277,height:153,x:1450,y:250},{id:4,src:"tree1.png",width:400,height:170,x:550,y:250},{id:5,src:"tree2.png",width:180,height:70,x:1400,y:50},{id:6,src:"tree3.png",width:185,height:75,x:1650,y:600}]},d=[{id:0,img:"tank1.png",x:780,y:20,keys:[{key:87,direction:"up",triggered:!1},{key:65,direction:"left",triggered:!1},{key:83,direction:"bottom",triggered:!1},{key:68,direction:"right",triggered:!1},{key:32,direction:"shoot",triggered:!1}],bulletShootDelay:60,speed:5,moving:!1,boostActive:!1,distance:150,strength:1,damage:1,hp:10,death:!1,shoot:{shooted:!1,shootDirection:null,bulletDistance:0,bulletPosition:{x:0,y:0}},device:"keyboard",controller:null,gamePadBtns:[{keyID:1,direction:"shoot",triggered:!1},{name:"arrows",direction:null,triggered:!1},{name:"analogX",direction:null,triggered:!1},{name:"analogY",direction:null,triggered:!1}]},{id:1,img:"tank22.png",x:1500,y:window.innerHeight-100,keys:[{key:38,direction:"up",triggered:!1},{key:37,direction:"left",triggered:!1},{key:40,direction:"bottom",triggered:!1},{key:39,direction:"right",triggered:!1},{key:80,direction:"shoot",triggered:!1}],bulletShootDelay:60,speed:5,death:!1,moving:!1,boostActive:!1,damage:1,distance:150,strength:1,hp:10,shoot:{shooted:!1,bulletDistance:150,bulletPosition:{x:0,y:0}},device:"keyboard",controller:null,gamePadBtns:[{keyID:1,direction:"shoot",triggered:!1},{name:"arrows",direction:null,triggered:!1},{name:"analogX",direction:null,triggered:!1},{name:"analogY",direction:null,triggered:!1}]}];function g(){var e;(e=document.createElement("div")).dataset.mute="on",e.id="mute",e.innerHTML='<img src="../img/sound.png" />',document.body.appendChild(e),document.querySelector("#mute").addEventListener("click",c),(n=new Audio).src="../audio/soundtrack.mp3",n.loop=!0,n.play(),document.querySelector("canvas").width=window.innerWidth,document.querySelector("canvas").height=window.innerHeight,m(),d.forEach((function(e){"keyboard"===e.device?function(e){window.addEventListener("keydown",(function(t){o||e.keys.forEach((function(e){e.key===t.keyCode&&(e.triggered=!0)}))})),window.addEventListener("keyup",(function(t){o||e.keys.forEach((function(e){e.key===t.keyCode&&(e.triggered=!1)}))}))}(e):(window.addEventListener("gamepadconnected",(function(t){return function(e,t){e.controller=navigator.getGamepads()[e.id]}(e)})),window.addEventListener("gamepaddisconnected",(function(){return function(e){e.controller={}}(e)})))}))}function c(e){"on"===e.currentTarget.dataset.mute?(n.pause(),e.currentTarget.children[0].src="../img/mute.png",e.currentTarget.dataset.mute="off"):"off"===e.currentTarget.dataset.mute&&(n.play(),e.currentTarget.children[0].src="../img/sound.png",e.currentTarget.dataset.mute="on")}function s(){var e=document.createElement("div"),t=document.createElement("div");e.id="controllerBox",t.id="overlayer",e.innerHTML='<div id="playerDevicesWrapper">\n                <div class="playerDevices">\n                    <div class="playerDeviceInformation">\n                        Player 1\n                        choosed device: \n                    </div>\n                    <div class="deviceImageWrapper">\n                        <div>\n                            <img src="../img/keyboard.png">\n                        </div>\n                        <div>\n                            <img src="../img/gamepad.png">\n                        </div>\n                    </div>\n                </div>\n                <div class="playerDevices">\n                    <div class="playerDeviceInformation">\n                        Player 2\n                        choosed device: \n                    </div>\n                    <div class="deviceImageWrapper">\n                        <div>\n                            <img src="../img/keyboard.png">\n                        </div>\n                        <div>\n                            <img src="../img/gamepad.png">\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div id="importantInfo">Warning! Gamepad API is still in progress. It means playing with gamepad isn\'t the best possible option. It is safer to play with keyboard.</div>\n            <div class="genericBtn">Ok</div>',document.body.append(t,e),document.querySelectorAll(".deviceImageWrapper div").forEach((function(e){e.addEventListener("click",(function(e){var t;t=e.currentTarget.parentNode,Array.from(t.children).forEach((function(e){e.dataset.choosed="",e.style.backgroundColor="transparent",e.style.borderRadius="0%"})),e.currentTarget.dataset.choosed="true",e.currentTarget.style.backgroundColor="#1d1d1d",e.currentTarget.style.borderRadius="50%"}))})),document.querySelector(".genericBtn").addEventListener("click",(function(){var e,t;e=document.querySelectorAll(".playerDevices .deviceImageWrapper")[0],t=document.querySelectorAll(".playerDevices .deviceImageWrapper")[1],l(e,0),l(t,1),document.querySelector("#overlayer").remove(),document.querySelector("#controllerBox").remove()}))}function l(e,t){Array.from(e.children).forEach((function(e){"true"===e.dataset.choosed&&(e.children[0].src.includes("keyboard")?d[t].device="keyboard":d[t].device="gamepad")}))}function u(){var e=document.createElement("div");e.id="info",e.innerHTML='<div id="close">\n            <img src="../img/close.png" />\n        </div>\n        <div id="logo">\n            <img src="../img/logoreverse.png" />\n        </div>\n        <div id="controls">\n            <div id="controlsPlayer1">\n                <div class="whichPlayer">Player 1:</div>\n                <div>Move up: <img src="../img/w.png"> </div>\n                <div>Move left: <img src="../img/a.png"> </div>\n                <div>Move down: <img src="../img/s.png"> </div>\n                <div>Move right: <img src="../img/d.png"> </div>\n                <div>Shoot:  <img src="../img/spacebar.png"> </div>\n            </div>\n            <div id="controlsPlayer2">\n                <div class="whichPlayer">Player 2:</div>\n                <div>Move up: <img src="../img/up.png"> </div>\n                <div>Move left: <img src="../img/left.png"> </div>\n                <div>Move down: <img src="../img/down.png"> </div>\n                <div>Move right: <img src="../img/right.png"> </div>\n                <div>Shoot:  <img src="../img/p.png"></div>\n            </div>\n        </div>\n        <div id="boostWrap">\n            <div id="iconsBox">\n                <img src="../img/distance.png" />\n                <img src="../img/run.png" />    \n                <img src="../img/strength.png" />\n                <img src="../img/life.png" />\n            </div>\n            <div id="iconsDesc">\n                <div>Increases the distance you can fire your bullets</div>\n                <div>Increases the speed at which you can move</div>\n                <div>Increase the amount of damage your bullets deal</div>\n                <div>Increase the amount of your lifes by one</div>\n            </div>\n        </div>',document.body.appendChild(e),document.querySelector("#info #close").addEventListener("click",(function(){document.querySelector("#info").remove()}))}function m(){var e,t;o||(e=document.querySelector("canvas").getContext("2d"),(t=new Image).src="../img/bg.png",e.drawImage(t,0,0,window.innerWidth,window.innerHeight),d.forEach((function(e){if(!e.death){var t=document.querySelector("canvas").getContext("2d"),n=new Image;n.src="../img/".concat(e.img),t.drawImage(n,e.x,e.y)}})),r.elements.forEach((function(e){var t=document.querySelector("canvas").getContext("2d"),n=new Image;n.src="../img/".concat(e.src),t.drawImage(n,e.x,e.y,e.width,e.height)})),i.forEach((function(e){if(!e.taken){var t=document.querySelector("canvas").getContext("2d"),n=new Image;n.src="../img/".concat(e.img),t.drawImage(n,e.x,e.y)}})),d.forEach((function(e){var t=[];if("keyboard"===e.device?(e.keys.forEach((function(e){e.triggered&&t.push(e)})),t.length>1?y(t[1].direction,e):1===t.length&&y(t[0].direction,e),e.shoot.shooted&&k(e),e.bulletShootDelay<=0?e.bulletShootDelay=60:e.bulletShootDelay<60&&(e.bulletShootDelay=e.bulletShootDelay-1)):null!==e.controller&&(!function(e){var t=navigator.getGamepads()[e.controller.index];t.buttons.forEach((function(n){n.pressed||1!==t.buttons.indexOf(n)||(e.gamePadBtns[0].triggered=!1)})),t.buttons.forEach((function(n){n.pressed&&1===t.buttons.indexOf(n)&&(e.gamePadBtns[0].triggered=!0)})),t.axes[9].toFixed(2)>1&&(e.gamePadBtns[1].direction="",e.gamePadBtns[1].triggered=!1);t.axes[9].toFixed(2)<=1&&(t.axes[9].toFixed(2)>=-1&&t.axes[9].toFixed(2)<-.45?(e.gamePadBtns[1].direction="up",e.gamePadBtns[1].triggered=!0):t.axes[9].toFixed(2)>=-.45&&t.axes[9].toFixed(2)<.14?(e.gamePadBtns[1].direction="right",e.gamePadBtns[1].triggered=!0):t.axes[9].toFixed(2)>=.14&&t.axes[9].toFixed(2)<.71?(e.gamePadBtns[1].direction="bottom",e.gamePadBtns[1].triggered=!0):t.axes[9].toFixed(2)>=.71&&(e.gamePadBtns[1].direction="left",e.gamePadBtns[1].triggered=!0));t.axes[0].toFixed(2)<=-0&&(e.gamePadBtns[2].direction="",e.gamePadBtns[2].triggered=!1);t.axes[0].toFixed(2)<=1&&(t.axes[0].toFixed(2)>.5&&t.axes[0].toFixed(2)<=1?(e.gamePadBtns[2].direction="right",e.gamePadBtns[2].triggered=!0):t.axes[0].toFixed(2)>=-1&&t.axes[0].toFixed(2)<-.5&&(e.gamePadBtns[2].direction="left",e.gamePadBtns[2].triggered=!0));t.axes[1].toFixed(2)<=-0&&(e.gamePadBtns[3].direction="",e.gamePadBtns[3].triggered=!1);t.axes[1].toFixed(2)>=-1&&(t.axes[1].toFixed(2)<=-1?(console.log(1),e.gamePadBtns[3].direction="up",e.gamePadBtns[3].triggered=!0):t.axes[1].toFixed(2)>=1&&(e.gamePadBtns[3].direction="bottom",e.gamePadBtns[3].triggered=!0))}(e),e.gamePadBtns.forEach((function(e){e.triggered&&t.push(e)})),t.length>=1&&y(t[0].direction,e),e.shoot.shooted&&k(e),e.bulletShootDelay<=0?e.bulletShootDelay=60:e.bulletShootDelay<60&&(e.bulletShootDelay=e.bulletShootDelay-1)),e.boostActive)if(0===e.id){var n=parseInt(document.querySelector("#firstPlayer div").dataset.realvalue);n>0?(document.querySelector("#firstPlayer div").dataset.realvalue=n-1,n%60==0&&(document.querySelector("#firstPlayer div").textContent=n/60)):(p(e),e.boostActive=!1,document.querySelector("#firstPlayer").remove())}else if(1===e.id){var i=parseInt(document.querySelector("#secondPlayer div").dataset.realvalue);i>0?(document.querySelector("#secondPlayer div").dataset.realvalue=i-1,i%60==0&&(document.querySelector("#secondPlayer div").textContent=i/60)):(p(e),e.boostActive=!1,document.querySelector("#secondPlayer").remove())}})),(++a>=1500||0===a)&&(a=1,function e(){var t=Math.floor(Math.random()*(window.innerWidth-64-64))+64;var n=Math.floor(Math.random()*(window.innerHeight-64-64))+64;var o=!1;r.elements.forEach((function(e){t+64>=e.x&&t<=e.x+e.width&&n+64>=e.y&&n<=e.y+e.height&&(o=!0)}));if(o)return e();var a=[{name:"speedBoost",id:0,action:{attributeToBoost:"speed",boostValue:10},img:"run.png",x:t,y:n,taken:!1},{name:"distanceBoost",id:1,action:{attributeToBoost:"distance",boostValue:300},img:"distance.png",x:t,y:n,taken:!1},{name:"strengthBoost",id:2,action:{attributeToBoost:"damage",boostValue:2},img:"strength.png",x:t,y:n,taken:!1},{name:"extraLife",id:3,action:{attributeToBoost:"hp",boostValue:1},img:"life.png",x:t,y:n,taken:!1}],d=Math.floor(Math.random()*a.length);i.push(a[d]),g=a[d],c=t,s=n,l=document.querySelector("canvas").getContext("2d"),(u=new Image).src="../img/".concat(g.img),l.drawImage(u,c,s);var g,c,s,l,u}()),requestAnimationFrame(m))}function p(e){e.id;0===e.id?document.querySelector("#firstPlayer img").src.includes("run")?e.speed=5:document.querySelector("#firstPlayer img").src.includes("strength")?e.damage=1:document.querySelector("#firstPlayer img").src.includes("distance")&&(e.distance=150):1===e.id&&(document.querySelector("#secondPlayer img").src.includes("run")?e.speed=5:document.querySelector("#secondPlayer img").src.includes("strength")?e.damage=1:document.querySelector("#secondPlayer img").src.includes("distance")&&(e.distance=150))}function y(e,t){var n=function(e,t){var n=!1,i=0===e.id?d[1]:d[0],o=b(i),a=f(i);if("up"===t){var g=b(e);f(e);r.elements.forEach((function(t){e.y-e.speed>=t.y&&e.y<=t.y+t.height+20&&e.x+g>=t.x&&e.x<=t.x+t.width&&(n=!0)})),e.y-e.speed>=i.y&&e.y<=i.y+a+10&&e.x+g>=i.x&&e.x<=i.x+o&&(n=!0),e.y-e.speed<0&&(n=!0),v(e,0===e.id?"tank2.png":"tank22.png")}else if("left"===t){var c=f(e);r.elements.forEach((function(t){e.x-e.speed<=t.x+t.width&&e.x>=t.x&&e.y+c>=t.y&&e.y<=t.y+t.height&&(n=!0)})),e.x-e.speed<=i.x+o&&e.x>=i.x&&e.y+c>=i.y&&e.y<=i.y+a&&(n=!0),e.x-e.speed<0&&(n=!0),v(e,0===e.id?"tank4.png":"tank24.png")}else if("bottom"===t){var s=b(e),l=f(e);r.elements.forEach((function(t){e.y+l+e.speed>=t.y&&e.y<=t.y+t.height+20&&e.x+s>=t.x&&e.x<=t.x+t.width&&(n=!0)})),e.y+l+e.speed>=i.y&&e.y<=i.y+a+10&&e.x+s>=i.x&&e.x<=i.x+o&&(n=!0),e.y+l+e.speed>window.innerHeight&&(n=!0),v(e,0===e.id?"tank1.png":"tank21.png")}else if("right"===t){var u=f(e),m=b(e);r.elements.forEach((function(t){e.x+m+e.speed>=t.x&&e.x<=t.x+t.width&&e.y+u>=t.y&&e.y<=t.y+t.height&&(console.log(u,m,e.x,e.y,t.x,t.y,t.width,t.height),n=!0)})),e.x+m+e.speed>=i.x&&e.x<=i.x+o+10&&e.y+u>=i.y&&e.y<=i.y+a&&(n=!0),e.x+m+e.speed>window.innerWidth&&(n=!0),v(e,0===e.id?"tank3.png":"tank23.png")}return n}(t,e);!function(e){i.forEach((function(t){var n=b(e),i=b(e);e.boostActive||e.x+n>=t.x&&e.x<=t.x+64&&e.y+i>=t.y&&e.y<=t.y+64&&(t.taken||(h("../audio/boost.wav"),function(e,t){if(e.hasOwnProperty(t.action.attributeToBoost))if(3!==t.id)e[t.action.attributeToBoost]=t.action.boostValue;else{e[t.action.attributeToBoost]=e[t.action.attributeToBoost]+t.action.boostValue;var n=document.createElement("div");n.className="hpPoint",0===e.id?document.querySelector("#firstPlayerHp").appendChild(n):document.querySelector("#secondPlayerHp").appendChild(n)}}(e,t),3!==t.id&&(!function(e,t){var n=document.createElement("div");n.innerHTML='<img src="../img/'.concat(t.img,'"/><div data-realValue="1800">30</div>'),n.className="miniatureBox",0===e.id?n.id="firstPlayer":n.id="secondPlayer";document.body.appendChild(n)}(e,t),e.boostActive=!0),t.taken=!0))}))}(t);if(!0===n)return!0;"up"===e?(t.y-=t.speed,v(t,0===t.id?"tank2.png":"tank22.png")):"left"===e?(t.x-=t.speed,v(t,0===t.id?"tank4.png":"tank24.png")):"bottom"===e?(t.y+=t.speed,v(t,0===t.id?"tank1.png":"tank21.png")):"right"===e?(t.x+=t.speed,v(t,0===t.id?"tank3.png":"tank23.png")):"shoot"===e&&!t.shoot.shooted&&function(e){if(60===e.bulletShootDelay){h("../audio/shoot.wav"),e.bulletShootDelay=e.bulletShootDelay-1;var t="";"tank1.png"===e.img||"tank21.png"===e.img?t="../img/bullet4.png":"tank2.png"===e.img||"tank22.png"===e.img?t="../img/bullet3.png":"tank3.png"===e.img||"tank23.png"===e.img?t="../img/bullet1.png":"tank4.png"!==e.img&&"tank24.png"!==e.img||(t="../img/bullet2.png"),e.shoot.shootDirection=e.img,"tank3.png"===e.img||"tank23.png"===e.img?(e.shoot.bulletPosition.y=e.y+25,e.shoot.bulletPosition.x=e.x+85):"tank4.png"!==e.img&&"tank24.png"!==e.img||(e.shoot.bulletPosition.y=e.y+25,e.shoot.bulletPosition.x=e.x-5),"tank2.png"===e.img||"tank22.png"===e.img?(e.shoot.bulletPosition.x=e.x+25,e.shoot.bulletPosition.y=e.y-20):"tank1.png"!==e.img&&"tank21.png"!==e.img||(e.shoot.bulletPosition.x=e.x+25,e.shoot.bulletPosition.y=e.y+85),"tank3.png"===e.img||"tank23.png"===e.img?e.shoot.bulletDistance=e.shoot.bulletPosition.x+e.distance:"tank4.png"===e.img||"tank24.png"===e.img?e.shoot.bulletDistance=e.shoot.bulletPosition.x-e.distance:"tank2.png"===e.img||"tank22.png"===e.img?e.shoot.bulletDistance=e.shoot.bulletPosition.y-e.distance:"tank1.png"!==e.img&&"tank21.png"!==e.img||(e.shoot.bulletDistance=e.shoot.bulletPosition.y+e.distance),e.shoot.direction=t,e.shoot.shooted=!0}}(t)}function h(e){var t=new Audio;t.src=e,t.play()}function v(e,t){"tank3.png"===t&&"tank2.png"===e.img?e.img="tank6.png":"tank1.png"===t&&"tank3.png"===e.img?e.img="tank7.png":"tank2.png"===t&&"tank3.png"===e.img?e.img="tank6.png":"tank4.png"===t&&"tank2.png"===e.img?e.img="tank5.png":"tank1.png"===t&&"tank4.png"===e.img?e.img="tank8.png":"tank3.png"===t&&"tank1.png"===e.img?e.img="tank7.png":"tank4.png"===t&&"tank1.png"===e.img?e.img="tank8.png":"tank2.png"===t&&"tank4.png"===e.img?e.img="tank5.png":"tank1.png"===t&&"tank2.png"===e.img?e.img="tank9.png":"tank2.png"===t&&"tank1.png"===e.img?e.img="tank10.png":"tank4.png"===t&&"tank3.png"===e.img?e.img="tank11.png":"tank3.png"===t&&"tank4.png"===e.img&&(e.img="tank12.png"),"tank23.png"===t&&"tank22.png"===e.img?e.img="tank26.png":"tank21.png"===t&&"tank23.png"===e.img?e.img="tank27.png":"tank22.png"===t&&"tank23.png"===e.img?e.img="tank26.png":"tank24.png"===t&&"tank22.png"===e.img?e.img="tank25.png":"tank21.png"===t&&"tank24.png"===e.img?e.img="tank28.png":"tank23.png"===t&&"tank21.png"===e.img?e.img="tank27.png":"tank24.png"===t&&"tank21.png"===e.img?e.img="tank28.png":"tank22.png"===t&&"tank24.png"===e.img?e.img="tank25.png":"tank21.png"===t&&"tank22.png"===e.img?e.img="tank29.png":"tank22.png"===t&&"tank21.png"===e.img?e.img="tank30.png":"tank24.png"===t&&"tank23.png"===e.img?e.img="tank31.png":"tank23.png"===t&&"tank24.png"===e.img&&(e.img="tank32.png"),setTimeout((function(){return e.img=t}),50)}function k(e){var t=document.querySelector("canvas").getContext("2d"),n=new Image;n.src=e.shoot.direction,function(e){"tank3.png"===e.shoot.shootDirection||"tank23.png"===e.shoot.shootDirection?e.shoot.bulletPosition.x=e.shoot.bulletPosition.x+20:"tank4.png"===e.shoot.shootDirection||"tank24.png"===e.shoot.shootDirection?e.shoot.bulletPosition.x=e.shoot.bulletPosition.x-20:"tank2.png"===e.shoot.shootDirection||"tank22.png"===e.shoot.shootDirection?e.shoot.bulletPosition.y=e.shoot.bulletPosition.y-20:"tank1.png"!==e.shoot.shootDirection&&"tank21.png"!==e.shoot.shootDirection||(e.shoot.bulletPosition.y=e.shoot.bulletPosition.y+20)}(e),t.drawImage(n,e.shoot.bulletPosition.x,e.shoot.bulletPosition.y),function(e){var t=0===e.id?d[1].x:d[0].x,n=0===e.id?d[1].y:d[0].y,i=e.shoot.bulletPosition.x,o=e.shoot.bulletPosition.y,a=f(e),r=b(e);"tank2.png"===e.img||"tank22.png"===e.img?o<=n+a&&o>=n&&i>=t&&i<=t+r&&x(e,i,o):"tank1.png"===e.img||"tank21.png"===e.img?o>=n&&o<=n+a&&i>=t&&i<=t+r&&x(e,i,o):"tank4.png"===e.img||"tank24.png"===e.img?i<=t+a&&i>=t&&o>=n&&o<=n+r&&x(e,i,o):"tank23.png"!==e.img&&"tank3.png"!==e.img||i>=t&&i<=t+a&&o>=n&&o<=n+r&&x(e,i,o)}(e),function(e){var t=!1;"tank3.png"===e.img||"tank23.png"===e.img?e.shoot.bulletPosition.x>=e.shoot.bulletDistance&&(t=!0):"tank4.png"===e.img||"tank24.png"===e.img?e.shoot.bulletPosition.x<=e.shoot.bulletDistance&&(t=!0):"tank2.png"===e.img||"tank22.png"===e.img?e.shoot.bulletPosition.y<=e.shoot.bulletDistance&&(t=!0):"tank1.png"!==e.img&&"tank21.png"!==e.img||e.shoot.bulletPosition.y>=e.shoot.bulletDistance&&(t=!0);t&&(e.shoot={shooted:!1,bulletDistance:0,bulletPosition:{x:0,y:0}})}(e)}function f(e){document.querySelector("canvas").getContext("2d");var t=new Image;return t.src="../img/".concat(e.img),t.height}function b(e){document.querySelector("canvas").getContext("2d");var t=new Image;return t.src="../img/".concat(e.img),t.width}function x(e,t,n){var i=document.createElement("div");e.shoot.shooted=!1,i.id="boom",i.style.backgroundImage="url('../img/boom.gif')",i.style.top="".concat(n,"px"),i.style.left="".concat(t,"px"),h("../audio/boom.wav"),document.body.appendChild(i),setTimeout((function(){document.querySelector("#boom").remove()}),350),function(e){var t=0===e.id?d[1]:d[0];if(0===t.id)for(var n=0;n<e.damage;n++)void 0!==document.querySelector("#firstPlayerHp").children[0]&&document.querySelector("#firstPlayerHp").children[0].remove(),t.hp=t.hp-1;else if(1===t.id)for(var i=0;i<e.damage;i++)void 0!==document.querySelector("#firstPlayerHp").children[0]&&document.querySelector("#secondPlayerHp").children[0].remove(),t.hp=t.hp-1;!function(e){e.hp<=0&&(e.death=!0,m(),function(e){var t=document.createElement("div");t.innerHTML='<img src="../img/end1.gif"/>',t.style.position="absolute",t.style.top="".concat(e.y,"px"),t.style.left="".concat(e.x,"px"),"tank2.png"===e.img||"tank22.png"===e.img?t.style.transform="rotate(180deg)":"tank4.png"===e.img||"tank24.png"===e.img?t.style.transform="rotate(90deg)":"tank23.png"!==e.img&&"tank3.png"!==e.img||(t.style.transform="rotate(-90deg)");document.body.appendChild(t),n=document.createElement("div"),i=document.createElement("div"),a=null,d.forEach((function(e){e.death&&(a=e)})),i.innerHTML='<img src="../img/logoreverse.png" />\n         <h1>Player <span>'.concat(a.id+1,'</span> has won</h1>\n         <div id="endScreenMenu">\n            <div>Play new game</div>\n         </div>'),n.id="overlayer",i.id="endScreen",document.body.appendChild(n),o=!0,setTimeout((function(){document.body.appendChild(i),document.querySelector("#endScreenMenu div").addEventListener("click",(function(){return window.location.reload()}))}),2e3);var n,i,a}(e))}(t)}(e)}document.querySelector("#startGame").addEventListener("click",(function(){if(window.screen.width<900)return e=document.createElement("div"),(t=document.createElement("div")).id="overlayer",e.id="smallScreenInfo",e.innerHTML='\n        <div id="logo"><img src="../img/logo.png"/></div>\n        <h1>Unfortunately you can\'t play this game on mobile devices, or your screen is too small</h1>\n        <div class="genericBtn">Ok</div>\n    ',document.body.append(t,e),void document.querySelector(".genericBtn").addEventListener("click",(function(){document.querySelector("#smallScreenInfo").remove(),document.querySelector("#overlayer").remove()}));var e,t;document.querySelector(".mainMenu").remove(),g()})),document.querySelector("#instruction").addEventListener("click",u),document.querySelector("#controller").addEventListener("click",s)}]);