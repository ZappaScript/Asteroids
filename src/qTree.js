export class Leaf{ //Leaf
    constructor(p, e){
        this.point = p;
        this.entity = e;
    }
} 

export class Node{
    constructor(p, hl){
        
        this.children = {
        NW : null,
        SW : null,
        NE : null,
        SE : null,
        }
        this.center = p;
        this.halfLength = hl;
    }
}

export class quadTree {
    constructor(){
        
        this.root = new Node ({x:0.5, y:0.5},0.5)
        
    }
    printChildren (node, numChildren){
        if (!node){
            return;
        }
        if (node instanceof Leaf){
            
            numChildren.val +=1
            return;
        }
        this.printChildren(node.children.NW, numChildren)
        this.printChildren(node.children.SW, numChildren)
        this.printChildren(node.children.NE, numChildren)
        this.printChildren(node.children.SE, numChildren)
        return numChildren.val

    }
   
    
    vectorNorm(vector){
        
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    }
    pointInsideCircle(point, circle){

        var v = {x:circle.x - point.x,y: circle.y - point.y}
        
        if(this.vectorNorm(v) <=circle.radius){
            console.log('v, vectorNorm: ', v,this.vectorNorm(v))
            return true;
        }

        return false

    }
    circleSquareIntersection(circle, square){ //will only work with square for the time being
        //Square outer circle
        var squareMaxRadius = Math.sqrt(square.halfLength * square.halfLength * 2);
        var squareMinRadius = square.halfLength;
        var dirVector = {x:square.center.x - circle.x, y:square.center.y - circle.y } //Could improve on the variable's name
        console.log('1: ',dirVector)
        var norm = this.vectorNorm(dirVector)
        console.log('2: ',norm)
        dirVector = {x:dirVector.x / norm, y:dirVector.y / norm};
        console.log('3: ',dirVector)
        var testPoint = { x: circle.x + dirVector.x * circle.radius, y: circle.y + dirVector.y * circle.radius}
        console.log('4: ', testPoint)

        if (!this.pointInsideCircle( testPoint,{radius:squareMaxRadius,x:square.center.x,y:square.center.y})){
            return false;
        }

        if(this.pointInsideCircle(testPoint,{radius:squareMinRadius,x:square.center.x,y:square.center.y} )){
            console.log('Point inside inner circle')
            return true;
        }

        if(testPoint.x >= square.center.x - square.halfLength && testPoint.x <= square.center.x + square.halfLength 
            && testPoint.y >= square.center.y - square.halfLength && testPoint.y <= square.center.y + square.halfLength )
            {
                console.log('Point inside AABB')
                return true;}
        return false;


        

    }

    insertPoint (point, node, e){
        
        
        let quadrant = this.getQuadrant(point,node);

        

        if(!node.children[quadrant]){
            
            node.children[quadrant]  = new Leaf(point, e) //
            
            return;

        }

        if(node.children[quadrant] instanceof Leaf){
            
            let aux = node.children[quadrant]
            node.children[quadrant] = new Node(this.getNewPoint(quadrant, node.center, node.halfLength), node.halfLength/2)
            this.insertPoint(aux.point, node.children[quadrant], aux.entity)
            this.insertPoint(point, node.children[quadrant], e)
            return;
        }

        if(node.children[quadrant] instanceof Node){

            this.insertPoint(point, node.children[quadrant], e)

        }


    }
    getNewPoint(quadrant, point, halfLength){
        
        switch (quadrant){
            case "NW":
            return {x: point.x - halfLength/2, y: point.y + halfLength/2 }
            case "SW":
            return {x: point.x - halfLength/2, y: point.y - halfLength/2 }
            case "NE":
            return {x: point.x + halfLength/2, y: point.y + halfLength/2 }
            case "SE":
            return {x: point.x + halfLength/2, y: point.y - halfLength/2 }
            default:
            throw new Error('String not supplied')

        }

    }
    getQuadrant(p, node){
        
        if (p.x <= node.center.x){
            if(p.y <= node.center.y){
                return "SW";
            }
            return "NW";
        }
        if(p.y <= node.center.y){
            return "SE"
        }
        return "NE";

    }
    resetQuadtree(){
        this.root = new Node ({x:0.5, y:0.5},0.5);
    }
    
}

//export 
export var qTree = new quadTree();

var testCircle = {radius:0.125,x:0.875,y:0.875}

var fauxSquare = {center:{x:0.1,y:0.1},halfLength:0.25}
qTree.circleSquareIntersection(testCircle,fauxSquare)
