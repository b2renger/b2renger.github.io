


var nodes = [];
var springs = [];
var tags = [];


var shortdistance = 50;
var distmult = 3;

var selectedNode =null;
var selectedNodeX;
var selectedNodeY;

var cssTitle = "font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:24pt; padding:10px;text-align: center;";
var cssButton = "font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:20pt; padding:2px;text-align: center;";
var cssTags = "font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; padding:10px;";
var cssParagraph = "font-family:monospace; background-color:#000000; color:#FFFFFF; padding:10px;font-size:12pt;";
var cssLink = "font-family: 'Open Sans Condensed', sans-serif;; background-color:#000000; color:#FFFFFF; font-size:12pt; padding:10px;";

var t = 0; // for pulsing nodes

var input, button;

var home = 0
var teach = 1
var com = 2
var perso = 3

var splitfactor = 3;

var bigSize = 60;
var medSize = 50;
var smallSize= 35;

var node = 0;
var desktop = 1;
var android = 2;
var web =3;


function init(){
  setPage(nodes[0].page);
}

function setup() {
  	
  createCanvas(windowWidth/splitfactor  , 1080);
  smooth();

  textFont("Open Sans Condensed");
  textSize(14);

  nodes = [];
  springs = [];

  //0
  nodes.push(new Node((width*4/5),(height/5),'HOME',true,smallSize,node));
  nodes[0].setProject("pages/home.csv");

  //1
  nodes.push(new Node((width*3/5),(height*3/4),'Teaching and ressources',true,smallSize,node));
  nodes[1].setProject("pages/home.csv");

  //2
  nodes.push(new Node(width*2/10,height*1/4,'Commissionned work',true,smallSize,node));
  nodes[2].setProject("pages/home.csv");
  
  //3
  nodes.push(new Node(width*4/10,height*2/4,'Personal work',true,smallSize,node ));
  nodes[3].setProject("pages/home.csv");
  

  // android
  nodes.push(new Node((nodes[teach].location.x+rand()),(nodes[teach].location.y+rand()),'DroidParty tutorials',false,smallSize,android));
  addConnection(teach,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/droidparty_tuto.csv");

  nodes.push(new Node((nodes[perso].location.x+rand()),(nodes[perso].location.y+rand()),'Springs',false,smallSize,android));
  addConnection(perso,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/springs.csv");

  nodes.push(new Node((nodes[perso].location.x)+rand(),(nodes[perso].location.y+rand()),'Musicbox 3D',false,smallSize,android));
  addConnection(perso,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/musicbox3d.csv");  

  nodes.push(new Node((nodes[perso].location.x)+rand(),(nodes[perso].location.y+rand()),'Pendulum Phase',false,smallSize,android));
  addConnection(perso,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/pendulum-phase.csv");  

  nodes.push(new Node((nodes[perso].location.x+rand()),(nodes[perso].location.y+rand()),'PPP',false,medSize,android));
  addConnection(perso,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/ppp.csv");  

  // desktop
  nodes.push(new Node((nodes[teach].location.x+rand()),(nodes[teach].location.y+rand()),'Data Sonification',false,smallSize,desktop));
  addConnection(teach,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/datasonification.csv");  

  nodes.push(new Node((nodes[perso].location.x+rand()),(nodes[perso].location.y+rand()),'Blends and shaders',false,smallSize,desktop));
  addConnection(perso,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/blends_n_shaders.csv");  

  nodes.push(new Node((nodes[teach].location.x+rand()),(nodes[teach].location.y+rand()),'Pure-Data Intro',false,medSize,desktop));
  addConnection(teach,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/cours-pd.csv");  

  nodes.push(new Node((nodes[teach].location.x+rand()),(nodes[teach].location.y+rand()),'Processing Intro',false,medSize,desktop));
  addConnection(teach,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/cours-processing.csv");  

  nodes.push(new Node((nodes[com].location.x+rand()),(nodes[com].location.y+rand()),'Li-iL',false,medSize,desktop));
  addConnection(com,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/liil.csv");  

    nodes.push(new Node((nodes[com].location.x+rand()),(nodes[com].location.y+rand()),'Open House',false,smallSize,desktop));
  addConnection(com,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/openhouse.csv");  

    nodes.push(new Node((nodes[com].location.x+rand()),(nodes[com].location.y+rand()),'Neurokiff',false,smallSize,desktop));
  addConnection(com,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/neurokiff.csv");  

    nodes.push(new Node((nodes[com].location.x+rand()),(nodes[com].location.y+rand()),'Fresques Numériques',false,smallSize,desktop));
  addConnection(com,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/fresquesnumeriques.csv");  

  // web
  nodes.push(new Node((nodes[perso].location.x+rand()),(nodes[perso].location.y+rand()),'Happy Birthday codelab',false,smallSize,web));
  addConnection(perso,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/codelab_sonification.csv");  

  nodes.push(new Node((nodes[teach].location.x+rand()),(nodes[teach].location.y+rand()),'Webpd getting started',false,smallSize,web));
  addConnection(teach,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/Webpd_getting_started.csv"); 

  nodes.push(new Node((nodes[perso].location.x+rand()),(nodes[perso].location.y+rand()),'Webpd experiments',false,smallSize,web));
  addConnection(perso,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/Webpd_experiments.csv");    

  nodes.push(new Node((nodes[com].location.x+rand()),(nodes[com].location.y+rand()),'The midst ...',false,smallSize,web));
  addConnection(com,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/the_midst.csv");  

  nodes.push(new Node((nodes[com].location.x+ rand()),(nodes[com].location.y+rand()),'Rennes soundscape',false,smallSize,web));
  addConnection(com,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/Electroni-k.csv");  

  nodes.push(new Node((nodes[0].location.x),(nodes[0].location.y+50),'this website',false,smallSize,web));
  addConnection(0,75);
  nodes[nodes.length-1].setProject("pages/algae-DOM.csv");  

  nodes.push(new Node((nodes[perso].location.x+rand()),(nodes[perso].location.y+rand()),'P5js sound experiments',false,smallSize,web));
  addConnection(3,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/p5js_sound_experiments.csv");  

  nodes.push(new Node((nodes[teach].location.x+rand()),(nodes[teach].location.y+rand()),'Openprocessing - Reinetiere',false,smallSize,web));
  addConnection(1,random(shortdistance,shortdistance*distmult));
  nodes[nodes.length-1].setProject("pages/reinetiere.csv");  
  
  selectedNode = nodes[0];
 

}

function rand(){

  return random(-50,50);
}


function draw() {
  t+=0.05;
  background(0);

  for (var i = 0 ; i < springs.length ; i++){
    springs[i].update();
    springs[i].display();
  }

  for (var i = 0 ; i < nodes.length ; i++){
    nodes[i].update();
    nodes[i].display();

    nodes[i].over(mouseX,mouseY);
    
    for (var j = 0 ; j < nodes.length ; j++){
      if (i!=j) nodes[i].attract(nodes[j]);
    }
  }

  noFill();
  stroke(255);
  ellipse(selectedNode.location.x,selectedNode.location.y,25,25);

}

function mouseDragged(){
  if (selectedNode != null) {    
    selectedNode.location.x = mouseX;
    selectedNode.location.y = mouseY;
  }
}

function mouseMoved() {
  var maxDist = 10; 
  if(mouseX<windowWidth/2){ // stay in our canvas range
    for (var i = 0; i < nodes.length; i++) {
      var d = dist(mouseX, mouseY, nodes[i].location.x, nodes[i].location.y);
      if (d < maxDist && nodes[i].overMe == false) {      
        selectedNode = nodes[i];
        setPage(selectedNode.page); // set the page with a custom parser function      
      }      
    }
  }
}



function setPage(project){

  removeElements();

  /*
  input = createInput();
  input.position(0, 0);

  input.style("font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:10pt; padding:2px;text-align: center;");
  input.size(600,AUTO);

  button = createButton('search');
  button.style("font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:10pt; padding:2px;text-align: center;");
  button.size(AUTO,10);
  button.position(input.width, 0);
  button.mousePressed(search);*/

  tags = [];

  var row ;
  var str ;
  var type ;
  var linebreak;
  var posY = -20; // keep track of where we're at building the page
  var posX = windowWidth/splitfactor;

  for (var i = 1 ; i < project.getRowCount(); i++){
    row = project.getRow(i);
    type = project.getRow(i).getString(0);
    str = project.getRow(i).getString(1); 
    linebreak = project.getRow(i).getString(2);

    if (type == 'Title'){
      var title = createElement('h1',str);
      title.style(cssTitle);
      title.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += title.height  ;
        posX = windowWidth/splitfactor;
      } else {
        posX += title.width;
      }
    }

    else if (type == 'Video'){

      vid = createDiv(str,dummy);
      vid.style(cssTitle);
      vid.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += vid.height ;
        posX = windowWidth/splitfactor;
      } else {
        posX += vid.width;
      }
    }

    else if (type == 'Paragraph'){
      var description = createP(str);
      description.style(cssParagraph);
      description.size(720,AUTO);
      description.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += description.height ;
        posX = windowWidth/splitfactor;
      } else {
        posX += description.width;
      }
    }

    else if (type == 'Image'){
      var image = createImg(str);
      image.style(cssParagraph);
      image.size(AUTO,275);
      image.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += image.height;
        posX = windowWidth/splitfactor;
      } else {
        posX += image.width;
      }
    }

    else if (type == 'Tags'){
      var p = createP(str);
      p.style(cssTags);
      p.size(400  ,AUTO);
      p.position(posX,posY);
  
      p.mouseOver(check);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += p.height ;
        posX = windowWidth/splitfactor;
      } else {
        posX += 150;
      }
    }

    else if (type == 'Icon'){
      var ic = createImg(str);
      ic.size(AUTO,38);
      ic.position(posX,posY);

       if (linebreak == 'True' || linebreak == ' True'){
        posY += ic.height  ;
        posX = windowWidth/splitfactor;
      } else{
        posX += ic.width;
      }
    }
    else if (type =='Jump'){
      posY+=25;
    }
    else {
      var link = createA(str,row.getString(0)); // create an anchor element 
      link.style(cssLink);
      link.size(AUTO,18);
      link.position(posX,posY);

      if (linebreak == 'True'|| linebreak == ' True'){
        posY += link.height  ;
        posX = windowWidth/splitfactor;
      } else {
        posX += link.width;
      }
    }
  }
}



function check(param){
  console.log("over " + param.currentTarget.innerHTML);
  for (var i = 4 ; i < nodes.length ; i++){
    var checkpage = nodes[i].page;
    nodes[i].highlight = false;
    //println(checkpage.getRowCount());
    for (var j = 0 ; j < checkpage.getRowCount() ; j++){
      var checkrow = checkpage.getRow(j);
      //println(checkrow.getString(1));

      if(checkrow.getString(0) == 'Tags'){
        if(checkrow.getString(1) == param.currentTarget.innerHTML){
          nodes[i].highlight = true;
        }
        else if (nodes[i].highlight != true){
        }
      }
    }
  }
}

function search(param){
  var name = input.value();
  console.log(name);
   for (var i = 0 ; i < nodes.length ; i++){
    var checkpage = nodes[i].page;
    nodes[i].highlight = false;
    console.log(i)
    for (var j = 0 ; j < checkpage.getRowCount() ; j++){
      var checkrow = checkpage.getRow(j).getString(1);
     //console.log(checkrow);
      if(match(checkrow, name) !=null){
        console.log("match",i)
        //nodes[i].highlight = true;
      }
     // else if (nodes[i].highlight != true){

     // }
    }
  }

}


function addConnection(index,l){
  springs.push( new Spring(nodes[index], nodes[nodes.length-1],l));
}

