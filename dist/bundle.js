!function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(i,r,function(t){return e[t]}.bind(null,r));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=10)}([function(e,t){e.exports=class{constructor(){this.assets={skierCrash:"img/skier_crash.png",skierLeft:"img/skier_left.png",skierLeftDown:"img/skier_left_down.png",skierDown:"img/skier_down.png",skierRightDown:"img/skier_right_down.png",skierRight:"img/skier_right.png",tree:"img/tree_1.png",treeCluster:"img/tree_cluster.png",rock1:"img/rock_1.png",rock2:"img/rock_2.png"},this.loadedAssets={},this.obstacleTypes=["tree","treeCluster","rock1","rock2"],this.obstacles=[],this.gameWidth=0,this.gameHeight=0,this.skierDirection=5,this.skierMapX=0,this.skierMapY=0,this.skierSpeed=8,this.maxSkierSpeed=16,this.hits=0,this.totalNumberOfHits=3,this.paused=!1,this.pauseNotification="<h2 class='whiteColor'>Game Is Paused</h2>",this.speedColor="#111619",this.canvas,this.ctx}loadAssets(){let e=[];return _.each(this.assets,(t,s)=>{let i=new Image,r=new $.Deferred;i.onload=(()=>{i.width/=2,i.height/=2,this.loadedAssets[s]=i,r.resolve()}),i.src=t,e.push(r.promise())}),$.when.apply($,e)}}},function(e,t,s){const i=s(2),r=new s(0),a=new s(8),h=new s(9);e.exports=class extends(i(r,a,h)){updateDashbord(){document.getElementById("distance").innerHTML=Math.ceil(this.skierMapY)+" meters",document.getElementById("speed").innerHTML=this.skierSpeed,document.getElementById("hits").innerHTML=this.hits}checkSpeedHasUpdated(){this.skierMapY>=5e3&&this.updateSpeed()}updateSpeed(){document.body.style.backgroundColor=this.speedColor,this.skierSpeed<this.maxSkierSpeed&&(this.skierSpeed+=1)}pauseGame(){document.getElementById("pause").innerHTML=this.pauseNotification,this.skierDirection=0}continueGame(){document.getElementById("pause").innerHTML=""}checkTotalHits(){this.hits===this.totalNumberOfHits&&this.gameOver()}gameOver(){throw $("#over").modal({backdrop:"static",keyboard:!1}),document.getElementById("score").innerHTML=Math.ceil(this.skierMapY),"game over"}}},function(e,t,s){
/*!
 * Extends Classes.
 *
 * Main entry file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 30/03/2017 NZDT
 */
e.exports=s(3)},function(e,t,s){
/*!
 * Extends Classes.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 30/03/2017 NZDT
 */
const i=s(4);e.exports=function(...e){const t=[];class s extends i{constructor(...i){super();for(const i of e){const e=Object.getOwnPropertyNames(i.prototype);for(const r of e)"constructor"===r?t.push(i.prototype.constructor):s.prototype[r]=i.prototype[r]}for(const e of t)Object.assign(s.prototype,new e(...i))}}return s}},function(e,t,s){
/*!
 * Method Missing.
 *
 * Application entry file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */
e.exports=s(5)},function(e,t,s){
/*!
 * Method Missing.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */
const i=s(6);e.exports=class{constructor(e){return i(this,e||"__call")}static static(e,t){return i(e,t||"__call")}}},function(e,t,s){
/*!
 * Method Missing.
 *
 * Main application entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */
const i=s(7);e.exports=function(e,t){return new Proxy(e,{get(e,s){if(Reflect.has(e,s))return Reflect.get(e,s);if("function"==typeof t)return function(...e){t.call(this,s,e)};if(Reflect.has(e,t))return function(...i){e[t].call(this,s,i)};throw new i(`${t}, use method '__call(method, args)' in your class to catch.`)}})}},function(e,t){e.exports=
/*!
 * Method Missing Error.
 *
 * Main application entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */
class extends Error{constructor(e){super(e),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}},function(e,t,s){const i=new s(0);e.exports=class extends i{moveSkier(){switch(this.skierDirection){case 2:this.skierMapX-=Math.round(this.skierSpeed/1.4142),this.skierMapY+=Math.round(this.skierSpeed/1.4142),this.placeNewObstacle(this.skierDirection);break;case 3:this.skierMapY+=this.skierSpeed,this.placeNewObstacle(this.skierDirection);break;case 4:this.skierMapX+=this.skierSpeed/1.4142,this.skierMapY+=this.skierSpeed/1.4142,this.placeNewObstacle(this.skierDirection)}}getSkierAsset(){let e;switch(this.skierDirection){case 0:e="skierCrash";break;case 1:e="skierLeft";break;case 2:e="skierLeftDown";break;case 3:e="skierDown";break;case 4:e="skierRightDown";break;case 5:e="skierRight"}return e}drawSkier(){let e=this.getSkierAsset(),t=this.loadedAssets[e];if(void 0==t)return;let s=(this.gameWidth-t.width)/2,i=(this.gameHeight-t.height)/2;this.ctx.drawImage(t,s,i,t.width,t.height)}intersectRect(e,t){return!(t.left>e.right||t.right<e.left||t.top>e.bottom||t.bottom<e.top)}checkIfSkierHitObstacle(){let e=this.getSkierAsset(),t=this.loadedAssets[e];if(void 0==t)return;let s={left:this.skierMapX+this.gameWidth/2,right:this.skierMapX+t.width+this.gameWidth/2,top:this.skierMapY+t.height-5+this.gameHeight/2,bottom:this.skierMapY+t.height+this.gameHeight/2};_.find(this.obstacles,e=>{let t=this.loadedAssets[e.type],i={left:e.x,right:e.x+t.width,top:e.y+t.height-5,bottom:e.y+t.height};return this.intersectRect(s,i)})&&(0!=this.skierDirection&&(this.hits+=1),this.skierDirection=0)}setupKeyhandler(e){e.keydown(e=>{switch(e.which){case 37:1===this.skierDirection?(this.skierMapX-=this.skierSpeed,this.placeNewObstacle(this.skierDirection)):this.skierDirection--,e.preventDefault();break;case 39:5===this.skierDirection?(this.skierMapX+=this.skierSpeed,this.placeNewObstacle(this.skierDirection)):this.skierDirection++,e.preventDefault();break;case 38:1!==this.skierDirection&&5!==this.skierDirection||(this.skierMapY-=this.skierSpeed,this.placeNewObstacle(6)),e.preventDefault();break;case 40:this.skierDirection=3,e.preventDefault();break;case 32:!1===this.paused?this.paused=!0:this.paused=!1,e.preventDefault()}})}drawObstacles(){let e=[];_.each(this.obstacles,t=>{let s=this.loadedAssets[t.type],i=t.x-this.skierMapX-s.width/2,r=t.y-this.skierMapY-s.height/2;i<-100||i>this.gameWidth+50||r<-100||r>this.gameHeight+50||(this.ctx.drawImage(s,i,r,s.width,s.height),e.push(t))}),this.obstacles=e}placeInitialObstacles(){let e=Math.ceil(_.random(5,7)*(this.gameWidth/800)*(this.gameHeight/500)),t=this.gameWidth+50,s=this.gameHeight/2+100,i=this.gameHeight+50;for(let r=0;r<e;r++)this.placeRandomObstacle(-50,t,s,i);this.obstacles=_.sortBy(this.obstacles,e=>{let t=this.loadedAssets[e.type];return e.y+t.height})}placeNewObstacle(e){if(8!==_.random(1,8))return;let t=this.skierMapX,s=this.skierMapX+this.gameWidth,i=this.skierMapY,r=this.skierMapY+this.gameHeight;switch(e){case 1:this.placeRandomObstacle(t-50,t,i,r);break;case 2:this.placeRandomObstacle(t-50,t,i,r),this.placeRandomObstacle(t,s,r,r+50);break;case 3:this.placeRandomObstacle(t,s,r,r+50);break;case 4:this.placeRandomObstacle(s,s+50,i,r),this.placeRandomObstacle(t,s,r,r+50);break;case 5:this.placeRandomObstacle(s,s+50,i,r);break;case 6:this.placeRandomObstacle(t,s,i-50,i)}}placeRandomObstacle(e,t,s,i){let r=_.random(0,this.obstacleTypes.length-1),a=this.calculateOpenPosition(e,t,s,i);this.obstacles.push({type:this.obstacleTypes[r],x:a.x,y:a.y})}calculateOpenPosition(e,t,s,i){let r=_.random(e,t),a=_.random(s,i);return _.find(this.obstacles,e=>r>e.x-50&&r<e.x+50&&a>e.y-50&&a<e.y+50)?this.calculateOpenPosition(e,t,s,i):{x:r,y:a}}}},function(e,t,s){new s(0);e.exports=class{prepareGameCanvas(){this.gameWidth=window.innerWidth,this.gameHeight=window.innerHeight,this.canvas=$("<canvas ></canvas>").attr("width",this.gameWidth*window.devicePixelRatio).attr("height",this.gameHeight*window.devicePixelRatio).css({width:this.gameWidth+"px",height:this.gameHeight+"px"}),$("body").append(this.canvas),this.ctx=this.canvas[0].getContext("2d")}clearGameCanvas(){this.ctx.clearRect(0,0,this.gameWidth,this.gameHeight)}}},function(e,t,s){"use strict";s.r(t);var i=s(1),r=s.n(i);(new class extends r.a{startGame(){this.initGame()}gameLoop(){!0===this.paused?this.pauseGame():this.continueGame(),this.updateDashbord(),this.checkSpeedHasUpdated(),this.checkTotalHits(),this.ctx.save(),this.ctx.scale(window.devicePixelRatio,window.devicePixelRatio),this.clearGameCanvas(),this.moveSkier(),this.checkIfSkierHitObstacle(),this.drawSkier(),this.drawObstacles(),this.ctx.restore(),requestAnimationFrame(this.gameLoop.bind(this))}initGame(){this.prepareGameCanvas(),this.setupKeyhandler($(window)),this.loadAssets().then(()=>{this.placeInitialObstacles(),requestAnimationFrame(this.gameLoop.bind(this))})}}).startGame()}]);
//# sourceMappingURL=bundle.js.map