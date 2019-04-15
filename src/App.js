import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Node, Leaf, qTree} from './qTree';
import { isContext } from 'vm';


//var style = {position:'absolute',height:'1px',width:'1px',backgroudColor:'black', borderRadius:'100%' }

class App extends Component {
  constructor(props){
    super(props)
    this.QuadTree = qTree
    this.canvasSize = 640
    this.state = {entities:[], now:Date.now(),fps:0}
  }
  addRandomEntities = () => { //This is just a test, delete this function later

    for (let i = 0; i < 50;i++){
      var entities = this.state.entities;
      var shell = []
      for (let i = 0; i<12;i++){
        var radius = 0.01 * Math.random()
       var p = {x:radius*Math.cos( 2 * Math.PI/12 * i ),y:radius * Math.sin(2*Math.PI/12 * i)}
       shell.push(p)
      }
      var entity = {testField:Math.random().toString(),location:{x:Math.random(), y:Math.random()},velocityVector:{x:(Math.random()-0.5) *0.002 ,y:(Math.random()-0.5)*0.002}, shell:shell }
      entities.push(entity)
      this.QuadTree.insertPoint(entity.location, this.QuadTree.root, entity)


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
    if (node instanceof Leaf){
      ctx.fillRect(node.point.x * this.canvasSize,node.point.y * this.canvasSize,3,3);

    }
    return;
  }
  drawCanvas(){

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawQuadrant(ctx,this.QuadTree.root)


  }
  gameLoop = () =>{
    var entities = this.state.entities;
    var start = Date.now()
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
    this.drawCanvas()

    var end = Date.now()
    this.setState({entities:entities,fps:(end-start)})
    window.setTimeout(this.gameLoop,16)
  }
  }

  componentWillMount(){
    this.addRandomEntities()
    window.setTimeout(this.gameLoop, 10);

    
  }

  //Spread operator is half as fast as Object.assign()
  //{this.state.entities.map((i,k)=>{return <div key={k} style={Object.assign({left:i.location.x * size + 50 ,bottom:i.location.y * size + 50},style) } > . </div> } )} 
  render() {
    var size = (window.innerHeight * 0.9)
    return (
      <div className="App">

        <button onClick={this.addRandomEntities} > Add a number of random entities </button>   
        <canvas ref="canvas" width={640} height={640} />
        
        <button onClick={this.printQuadTree} > Print QuadTree to console </button>   
        <p>{1000/(this.state.fps +1)}</p>
      </div>
    );
  }
}

export default App;
