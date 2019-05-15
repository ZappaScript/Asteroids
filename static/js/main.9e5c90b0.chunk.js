(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(4),r=n.n(o),l=(n(14),n(1)),c=n(2),s=n(6),h=n(5),d=n(7),y=(n(15),function e(t,n){Object(l.a)(this,e),this.point=t,this.entity=n}),u=function e(t,n){Object(l.a)(this,e),this.children={NW:null,SW:null,NE:null,SE:null},this.center=t,this.halfLength=n},v=new(function(){function e(){Object(l.a)(this,e),this.root=new u({x:.5,y:.5},.5)}return Object(c.a)(e,[{key:"printChildren",value:function(e,t){if(e){if(!(e instanceof y))return this.printChildren(e.children.NW,t),this.printChildren(e.children.SW,t),this.printChildren(e.children.NE,t),this.printChildren(e.children.SE,t),t.val;t.val+=1}}},{key:"vectorNorm",value:function(e){return Math.sqrt(e.x*e.x+e.y*e.y)}},{key:"pointInsideCircle",value:function(e,t){var n={x:t.x-e.x,y:t.y-e.y};return this.vectorNorm(n)<=t.radius&&(console.log("v, vectorNorm: ",n,this.vectorNorm(n)),!0)}},{key:"circleSquareIntersection",value:function(e,t){var n=Math.sqrt(t.halfLength*t.halfLength*2),a=t.halfLength,i={x:t.center.x-e.x,y:t.center.y-e.y};console.log("1: ",i);var o=this.vectorNorm(i);console.log("2: ",o),i={x:i.x/o,y:i.y/o},console.log("3: ",i);var r={x:e.x+i.x*e.radius,y:e.y+i.y*e.radius};return console.log("4: ",r),!!this.pointInsideCircle(r,{radius:n,x:t.center.x,y:t.center.y})&&(this.pointInsideCircle(r,{radius:a,x:t.center.x,y:t.center.y})?(console.log("Point inside inner circle"),!0):r.x>=t.center.x-t.halfLength&&r.x<=t.center.x+t.halfLength&&r.y>=t.center.y-t.halfLength&&r.y<=t.center.y+t.halfLength&&(console.log("Point inside AABB"),!0))}},{key:"insertPoint",value:function(e,t,n){var a=this.getQuadrant(e,t);if(t.children[a]){if(t.children[a]instanceof y){var i=t.children[a];return t.children[a]=new u(this.getNewPoint(a,t.center,t.halfLength),t.halfLength/2),this.insertPoint(i.point,t.children[a],i.entity),void this.insertPoint(e,t.children[a],n)}t.children[a]instanceof u&&this.insertPoint(e,t.children[a],n)}else t.children[a]=new y(e,n)}},{key:"getNewPoint",value:function(e,t,n){switch(e){case"NW":return{x:t.x-n/2,y:t.y+n/2};case"SW":return{x:t.x-n/2,y:t.y-n/2};case"NE":return{x:t.x+n/2,y:t.y+n/2};case"SE":return{x:t.x+n/2,y:t.y-n/2};default:throw new Error("String not supplied")}}},{key:"getQuadrant",value:function(e,t){return e.x<=t.center.x?e.y<=t.center.y?"SW":"NW":e.y<=t.center.y?"SE":"NE"}},{key:"resetQuadtree",value:function(){this.root=new u({x:.5,y:.5},.5)}}]),e}());v.circleSquareIntersection({radius:.125,x:.875,y:.875},{center:{x:.1,y:.1},halfLength:.25});n(16);var f=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(h.a)(t).call(this,e))).addRandomEntities=function(){for(var e=0;e<50;e++){for(var t=n.state.entities,a=[],i=0;i<12;i++){var o=.02*Math.random()+.01,r={x:o*Math.cos(2*Math.PI/12*i),y:o*Math.sin(2*Math.PI/12*i)};a.push(r)}var l={testField:Math.random().toString(),location:{x:Math.random(),y:Math.random()},velocityVector:{x:.002*(Math.random()-.5),y:.002*(Math.random()-.5)},shell:a};t.push(l),n.QuadTree.insertPoint(l.location,n.QuadTree.root,l),console.log("Number of entities:",t.length)}n.setState({entities:t})},n.rotateVector=function(e,t){return{x:e.x*Math.cos(t)-e.y*Math.sin(t),y:e.x*Math.sin(t)+e.y*Math.cos(t)}},n.drawPlayer=function(e){var t=n.state.player;e.beginPath();for(var a=t.shell.length,i=0;i<a;i++){n.rotateVector(t.shell[i%a],t.angle);var o=n.rotateVector(t.shell[(i+1)%a],t.angle);e.lineTo((t.location.x+o.x)*n.canvasSize,(t.location.y+o.y)*n.canvasSize)}e.closePath(),e.stroke(),e.fillStyle="#8ED6FF",e.fill()},n.handleInput=function(){var e=n.state.player;n.keysState.a&&(e.angle-=1/n.state.fps*(90*Math.PI/180)),n.keysState.d&&(e.angle+=1/n.state.fps*(90*Math.PI/180)),n.keysState.w&&(e.velocityVector.x+=1e-4*Math.cos(e.angle)*n.state.fps,e.velocityVector.y+=1e-4*Math.sin(e.angle)*n.state.fps),n.setState({player:e})},n.gameLoop=function(){var e=n.state.entities,t=n.state.player,a=Date.now();if(n.handleInput(),e.length>0){n.QuadTree.resetQuadtree();var i=!0,o=!1,r=void 0;try{for(var l,c=e[Symbol.iterator]();!(i=(l=c.next()).done);i=!0){var s=l.value;s.location.x+=s.velocityVector.x,s.location.y+=s.velocityVector.y,s.location.x<0&&(s.location.x=.99999999),s.location.y<0&&(s.location.y=.99999999),s.location.x>1&&(s.location.x=1e-8),s.location.y>1&&(s.location.y=1e-8),n.QuadTree.insertPoint(s.location,n.QuadTree.root,s)}}catch(d){o=!0,r=d}finally{try{i||null==c.return||c.return()}finally{if(o)throw r}}t.location.x+=t.velocityVector.x,t.location.y+=t.velocityVector.y,t.location.x<0&&(t.location.x=.99999999),t.location.y<0&&(t.location.y=.99999999),t.location.x>1&&(t.location.x=1e-8),t.location.y>1&&(t.location.y=1e-8),n.QuadTree.insertPoint(t.location,n.QuadTree.root,t),n.drawCanvas();var h=Date.now();n.setState({entities:e,fps:h-a}),window.setTimeout(n.gameLoop,16)}},n.addPlayer=function(){for(var e=[1,.5,.2,.5],t=[],a=0;a<4;a++){var i=.02*e[a],o={x:i*Math.cos(2*Math.PI/4*a),y:i*Math.sin(2*Math.PI/4*a)};t.push(o)}var r={testField:Math.random().toString(),location:{x:.5,y:.5},velocityVector:{x:0,y:0},shell:t,angle:0};n.QuadTree.insertPoint(r.location,n.QuadTree.root,r),n.setState(function(e){n.setState({player:r})})},n.handleKeyDown=function(e){var t=e.keyCode||e.which;t=String.fromCharCode(t),n.keysState[t.toLowerCase()]=!0},n.handleKeyUp=function(e){var t=e.keyCode||e.which;console.log(t),n.keysState[String.fromCharCode(t).toLowerCase()]=!1},n.QuadTree=v,n.canvasSize=640,n.state={entities:[],player:[],now:Date.now(),fps:0},n.keysState={a:!1,b:!1,c:!1,d:!1,e:!1,f:!1,g:!1,h:!1,i:!1,j:!1,k:!1,l:!1,m:!1,n:!1,o:!1,p:!1,q:!1,r:!1,s:!1,t:!1,u:!1,v:!1,w:!1,x:!1,y:!1,z:!1},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"drawQuadrant",value:function(e,t){if(t instanceof u)return e.beginPath(),e.moveTo(t.center.x*this.canvasSize,(t.center.y+t.halfLength)*this.canvasSize),e.lineTo(t.center.x*this.canvasSize,(t.center.y-t.halfLength)*this.canvasSize),e.moveTo((t.center.x-t.halfLength)*this.canvasSize,t.center.y*this.canvasSize),e.lineTo((t.center.x+t.halfLength)*this.canvasSize,t.center.y*this.canvasSize),e.stroke(),this.drawQuadrant(e,t.children.NW),this.drawQuadrant(e,t.children.NE),this.drawQuadrant(e,t.children.SW),void this.drawQuadrant(e,t.children.SE)}},{key:"drawEntities",value:function(e){var t=this.state.entities;e.beginPath();var n=!0,a=!1,i=void 0;try{for(var o,r=t[Symbol.iterator]();!(n=(o=r.next()).done);n=!0)for(var l=o.value,c=l.shell.length,s=0;s<c;s++)e.moveTo((l.location.x+l.shell[s%c].x)*this.canvasSize,(l.location.y+l.shell[s%c].y)*this.canvasSize),e.lineTo((l.location.x+l.shell[(s+1)%c].x)*this.canvasSize,(l.location.y+l.shell[(s+1)%c].y)*this.canvasSize)}catch(h){a=!0,i=h}finally{try{n||null==r.return||r.return()}finally{if(a)throw i}}e.stroke()}},{key:"drawCanvas",value:function(){var e=this.refs.canvas,t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),this.drawQuadrant(t,this.QuadTree.root),this.drawEntities(t),this.drawPlayer(t)}},{key:"componentWillMount",value:function(){this.addRandomEntities(),this.addPlayer(),window.setTimeout(this.gameLoop,10)}},{key:"render",value:function(){window.innerHeight;return i.a.createElement("div",{className:"App"},i.a.createElement("button",{onClick:this.addRandomEntities}," Add a number of random entities "),i.a.createElement("canvas",{ref:"canvas",width:640,height:640,tabIndex:1,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp}),i.a.createElement("button",{onClick:this.printQuadTree}," Print QuadTree to console "),i.a.createElement("p",null,1e3/(this.state.fps+1)))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(18)}},[[8,1,2]]]);
//# sourceMappingURL=main.9e5c90b0.chunk.js.map