function Spring(x,y,m,d,k){ // mass, damping, k
	this.position = createVector(x,y);
  this.tempPos = createVector(x,y);
  this.restPos = createVector(x,y);

  this.vel = createVector(0,0);

  this.accel = createVector(0,0);
  this.force = createVector(0,0);

  this.mass = m;
  this.k = k;
  this.damp = d;

  this.radius = 50;

  this.isOver = false;
  this.move = false;
}

Spring.prototype.update = function(){
  if (this.move){
    this.restPos = createVector(mouseX,mouseY);
  }

  this.force = (this.tempPos.sub(this.restPos));
  this.force = this.force.mult(-this.k);
  
  var acc = this.force/this.mass;
  this.accel = createVector(acc,acc);

  this.vel = (this.vel.add(this.accel));
  this.vel = this.vel.mult(this.damp);
  
  this.tempPos= this.tempPos.add(this.vel);


  if ((this.over() || this.move)){
    this.isOver = true ;
  }
  else {
    this.isOver = false;
  }
}

Spring.prototype.over = function() {
  if(dist(this.tempPos.x, this.tempPos.y, mouseX, mouseY) < this.radius/2){
    return true;  
  }
  else {
    return false;
  } 
}

Spring.prototype.display =function(){
  if (this.isOver) { 
      fill(153); 
    } else { 
      fill(255); 
    } 
    ellipse(this.tempPos.x, this.tempPos.y, this.radius, this.radius);
}

Spring.prototype.pressed =function(){
  if (this.isOver) { 
      this.move = true; 
    } else { 
      this.move = false; 
    } 
   
}

Spring.prototype.released=function() {
  this.move = false;
  this.restPos = this.position;

}