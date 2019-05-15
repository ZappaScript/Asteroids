import React, { Component } from 'react';
import './App.css';
import {Node, Leaf, qTree} from './qTree';
import { isContext } from 'vm';

class App extends Component {
  constructor(props){
    super(props)
    this.QuadTree = qTree
    this.canvasSize = 640
    this.state = {entities:[],player:[], now:Date.now(),fps:0}
    this.keysState = {'a': false,'b': false,'c': false,'d': false,'e': false,'f': false,'g': false,'h': false,'i': false,'j': false,'k': false,'l': false,'m': false,'n': false,'o': false,'p': false,'q': false,'r': false,'s': false,'t': false,'u': false,'v': false,'w': false,'x': false,'y': false,'z': false}
    
   
  }
  addRandomEntities = () => { //This is just a test, delete this function later

    for (let i = 0; i < 50;i++){
      var entities = this.state.entities;
      var shell = []
      for (let i = 0; i<12;i++){
        var radius = 0.02 * Math.random() + 0.01
       var p = {x:radius*Math.cos( 2 * Math.PI/12 * i ),y:radius * Math.sin(2*Math.PI/12 * i)}
       shell.push(p)
      }
      var entity = {testField:Math.random().toString(),location:{x:Math.random(), y:Math.random()},velocityVector:{x:(Math.random()-0.5) *0.002 ,y:(Math.random()-0.5)*0.002}, shell:shell }
      entities.push(entity)
      this.QuadTree.insertPoint(entity.location, this.QuadTree.root, entity)
      console.log('Number of entities:', entities.length)


    }
    this.setState({entities:entities})
  }
  drawQuadrant(ctx,node){
    if (node instanceof Node){
      ctx.beginPath();
      ctx.moveTo(node.center.x * this.canvasSize, (node.center.y + node.halfLength) * this.canvasSize);
      ctx.lineTo(node.center.x * this.canvasSize, (node.center.y - node.halfLength)*this.canvasSize);
      ctx.moveTo((node.center.x - node.halfLength) * this.canvasSize,node.center.y * this.canvasSize);
      ctx.lineTo((node.center.x + node.halfLength) * this.canvasSize,node.center.y * this.canvasSize);
      ctx.stroke();
      this.drawQuadrant(ctx,node.children.NW)
      this.drawQuadrant(ctx,node.children.NE)
      this.drawQuadrant(ctx,node.children.SW)
      this.drawQuadrant(ctx,node.children.SE)
      return;
    }
    
    return;
  }
  drawEntities(ctx){
    let entities = this.state.entities;

    ctx.beginPath();

    for (var e of entities){
      let l = e.shell.length;
      for (let i = 0; i < l; i++ ){

        ctx.moveTo((e.location.x + e.shell[i%l].x) * this.canvasSize , (e.location.y + e.shell[i%l].y ) * this.canvasSize);
        ctx.lineTo((e.location.x + e.shell[(i+1)%l].x) * this.canvasSize , (e.location.y + e.shell[(i+1)%l].y ) * this.canvasSize);

      }
  }
  
  ctx.stroke()

  }
  rotateVector = (vector, angle) => {
    return {x:vector.x*Math.cos(angle)- vector.y * Math.sin(angle), y : vector.x * Math.sin(angle) + vector.y * Math.cos(angle)}

  }
  drawPlayer= (ctx) => {
    let player = this.state.player;
    ctx.beginPath();

  
      let l = player.shell.length;
      for (let i = 0; i < l; i++ ){
        let v = this.rotateVector(player.shell[i%l], player.angle)
        let vN = this.rotateVector(player.shell[(i+1)%l], player.angle )
        //ctx.moveTo((player.location.x + v.x) * this.canvasSize , (player.location.y + v.y ) * this.canvasSize);
        ctx.lineTo((player.location.x + vN.x) * this.canvasSize , (player.location.y + vN.y ) * this.canvasSize);

      }
  ctx.closePath()
  ctx.stroke()
  ctx.fillStyle = "#8ED6FF"
  ctx.fill();
  


  }
  drawCanvas(){

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawQuadrant(ctx,this.QuadTree.root);
    this.drawEntities(ctx);
    this.drawPlayer(ctx);
    


  }
  handleInput =() => {
    let player = this.state.player
    if (this.keysState['a']){
      
      player.angle -= (1 / this.state.fps) *  (Math.PI * 90 / 180)
    
    }
    if(this.keysState['d']){

      player.angle += (1 / this.state.fps) *  (Math.PI * 90 / 180)

    }
    if(this.keysState['w']){
      //The way I though of limiting speed while applying the desired directios goes as follow:
      //Let velocityVector be an unit vector, have a variable called speed or magnitude represent velocity
      //Then, sum the angle vectors multiplied by the velocity.
      //If their norm is greater than the max allowed speed, sum the unit vectors and then multiply by the velocity
      //It's hacky and I'm sure it will look weird
      //Another option would be to sum their vectors, with the new angle having a fixed norm every key press, renormilize and multiply by the
      //current speed. It wont look good either but at least makes a little bit more sense
      //But, is there any reason why there should be a max velocity?
      player.velocityVector.x += Math.cos(player.angle) * 0.0001 * this.state.fps
      player.velocityVector.y += Math.sin(player.angle) * 0.0001 * this.state.fps
      
    }

    this.setState({player:player})
  }

  gameLoop = () =>{
    var entities = this.state.entities;
    var player = this.state.player
    var start = Date.now()
    this.handleInput()
    if(entities.length>0){
      
      this.QuadTree.resetQuadtree()
      for (var e of entities){
      e.location.x += e.velocityVector.x
      e.location.y += e.velocityVector.y
      if (e.location.x < 0){e.location.x = 0.99999999}
      if (e.location.y < 0){e.location.y = 0.99999999}
      if (e.location.x > 1){e.location.x = 0.00000001}
      if (e.location.y > 1){e.location.y = 0.00000001}
      this.QuadTree.insertPoint(e.location,this.QuadTree.root,e)
    }

    player.location.x += player.velocityVector.x
    player.location.y += player.velocityVector.y
    if (player.location.x < 0){player.location.x = 0.99999999}
    if (player.location.y < 0){player.location.y = 0.99999999}
    if (player.location.x > 1){player.location.x = 0.00000001}
    if (player.location.y > 1){player.location.y = 0.00000001}
    this.QuadTree.insertPoint(player.location,this.QuadTree.root,player)
    this.drawCanvas()

    var end = Date.now()
    this.setState({entities:entities,fps:(end-start)})
    window.setTimeout(this.gameLoop,16)
  }
  }
  addPlayer = () =>{
    var radii = [1,0.5,0.2,0.5]
    var shell = []
      for (let i = 0; i<4;i++){
        //var radius = 0.02 * Math.random() + 0.01
        let radius = 0.02 * radii[i]
       var p = {x:radius*Math.cos( 2 * Math.PI/4 * i ),y:radius * Math.sin(2*Math.PI/4 * i)}
       shell.push(p)
      }
      var player = {testField:Math.random().toString(),location:{x:0.5, y:0.5}, velocityVector:{x:0 ,y:0}, shell:shell, angle:0 }
      
      this.QuadTree.insertPoint(player.location, this.QuadTree.root, player)
    this.setState((prevState)=>{this.setState({player:player})} )

  }

  componentWillMount(){
    this.addRandomEntities()
    this.addPlayer()
    window.setTimeout(this.gameLoop, 10);

    
  }

  handleKeyDown = (event) =>{

    var x = event.keyCode || event.which;
    x = String.fromCharCode(x)
    this.keysState[ x.toLowerCase() ] = true;

  }

  handleKeyUp = (event) => {
    
    var x = event.keyCode || event.which;
    console.log(x)
    this.keysState[ String.fromCharCode(x).toLowerCase()] = false;

  }
  //Spread operator is half as fast as Object.assign()
  //{this.state.entities.map((i,k)=>{return <div key={k} style={Object.assign({left:i.location.x * size + 50 ,bottom:i.location.y * size + 50},style) } > . </div> } )} 
  render() {
    var size = (window.innerHeight * 0.9)
    return (
      <div className="App">

        <button onClick={this.addRandomEntities} > Add a number of random entities </button>   
        <canvas ref="canvas" width={640} height={640} tabIndex ={1} onKeyDown = {this.handleKeyDown} onKeyUp={this.handleKeyUp}/>
        
        <button onClick={this.printQuadTree} > Print QuadTree to console </button>   
        <p>{1000/(this.state.fps +1)}</p>
      </div>
    );
  }
}

export default App;
