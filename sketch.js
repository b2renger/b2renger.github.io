// bug : load home page on startup
// bug : need better over function with no repetition 
// improvement : player video = > find a way to force showing controls
// improvement : hide/show labels (like over but with a much bigger radius)
// feature : filter tags in the map
// feature : higlights concerned nodes when clicking a tag in the page. (this means events listener, and separated div for tags => good exercise)
// feature : add sound ! and button to mute it :)

// content :ressources desktop (processing + pure-data)
// content : android : pendulum phases (vid + description +tba)
// content : android : musicBox3D (vid + description + tba + legacy webpd version)
// content : android : pdDroidParty (vid + links)
// content : desktop : tuto and abstraction for pd
// content : desktop : processing_blends_n_shaders (vid + link)
// content : desktop : data-sonification workshop (image + description + link)
// content : this website + tuto+ repo dedicated (description + link + tuto in readme.md)


var nodes = [];
var springs = [];

var selectedNode =null;
var selectedNodeX;
var selectedNodeY;


var cssTitle = "font-family:monospace; background-color:#000000; color:#FFFFFF; font-size:18pt; padding:10px;";
var cssParagraph = "font-family:monospace; background-color:#000000; color:#FFFFFF; padding:10px;";
var cssLink = "font-family:monospace; background-color:#000000; color:#1800FC; font-size:12pt; padding:10px;";

var vid;

function setup() {
  	
  createCanvas(600, 1080);
  smooth();

  nodes = [];
  springs = [];
  //0
  nodes.push(new Node((width/2),(height/2),'HOME'));
  nodes[0].setProject("pages/home.csv");
  selectedNode = nodes[0];
  setPage(nodes[0].page);

  //1
  nodes.push(new Node(random(width),random(height),'WEB'));
  addConnection(0,150);
  nodes[1].setProject("pages/Web.csv");
  //2
  nodes.push(new Node(random(width),random(height),'ANDROID'));
  addConnection(0,150);
  nodes[2].setProject("pages/Android.csv");
  //3
  nodes.push(new Node(random(width),random(height),'DESKTOP'));
  addConnection(0,150);
  nodes[3].setProject("pages/Desktop.csv");

  nodes.push(new Node((width/2),(height/2),'Springs'));
  addConnection(1,75);
  addConnection(2,75);
  nodes[nodes.length-1].setProject("pages/springs.csv");

  nodes.push(new Node((width/2),(height/2),'Flock'));
  addConnection(1,75);
  nodes[nodes.length-1].setProject("pages/flock_sonification.csv");

  nodes.push(new Node((width/2),(height/2),'Sid Lee'));
  addConnection(1,75);
  nodes[nodes.length-1].setProject("pages/sidlee_sonification.csv");  

  nodes.push(new Node((width/2),(height/2),'Webpd getting started'));
  addConnection(1,75);
  nodes[nodes.length-1].setProject("pages/Webpd_getting_started.csv"); 

  nodes.push(new Node((width/2),(height/2),'Snow Night'));
  addConnection(1,75);
  nodes[nodes.length-1].setProject("pages/snow_night.csv");   

  nodes.push(new Node((width/2),(height/2),'The midst ...'));
  addConnection(1,75);
  nodes[nodes.length-1].setProject("pages/the_midst.csv");  
  



    
    
  
}


function draw() {

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
  if(mouseX<590){ // stay in our canvas range
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

  var row ;
  var str ;
  var type ;
  var linebreak;
  var posY = -20; // keep track of where we're at building the page
  var posX = 600;

  for (var i = 1 ; i < project.getRowCount(); i++){
    row = project.getRow(i);
    type = row.getString(0);
    str = row.getString(1); 
    linebreak = row.getString(2);

    if (type == 'Title'){
      var title = createElement('h1',str);
      title.style(cssTitle);
      title.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += title.height +25 ;
        posX = 600;
      } else {
        posX += title.width;
      }
    }

    else if (type == 'Video'){

      vid = createVideo(str,dummy);
      vid.style(cssTitle);
      vid.size(720,350);

      vid.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += vid.height ;
        posX = 600;
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
        posY += description.height +25 ;
        posX = 600;
      } else {
        posX += description.width;
      }
    }

    else if (type == 'Image'){
      var image = createImg(str);
      image.style(cssParagraph);
      image.size(AUTO,200);
      image.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += image.height +25 ;
        posX = 600;
      } else {
        posX += image.width;
      }
    }

    else if (type == 'Tags'){
      var p = createP(str);
      p.style(cssParagraph);
      p.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += p.height +40 ;
        posX = 600;
      } else {
        posX += p.width;
      }
    }

    else if (type == 'Icon'){
      var ic = createImg(str);
      ic.size(AUTO,38);
      ic.position(posX,posY);

       if (linebreak == 'True' || linebreak == ' True'){
        posY += ic.height +25 ;
        posX = 600;
      } else{
        posX += ic.width;
      }
    }
    else {
      var link = createA(str,row.getString(0)); // create an anchor element 
      link.style(cssParagraph);
      link.size(AUTO,18);
      link.position(posX,posY);

      if (linebreak == 'True'|| linebreak == ' True'){
        posY += link.height +25 ;
        posX = 600;
      } else {
        posX += link.width;
      }
    }
  }

  console.log("new page loaded");
}



function addConnection(index,l){
  springs.push( new Spring(nodes[index], nodes[nodes.length-1],l));
}

