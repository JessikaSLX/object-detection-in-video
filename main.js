img = "";
status1 = "";
objects = [];

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(350, 350);

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects...";
}

function modelLoaded() {
  console.log("Model is Loaded");
  status1 = true;
  
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }

  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 350, 350);

  if (status1 != "") {

    objectDetector.detect(video, gotResult);
    r = random(255);
    g = random(255);
    b = random(255);

    for (i=0; i<objects.length; i++) {

      document.getElementById("status").innerHTML="status: object detected";
      document.getElementById("noOfObjects").innerHTML="Number of objects detected are: " + objects.length;

      fill(r, g, b);
      stroke(r, g, b);
      noFill();

      percent = floor(objects[i].confidence*100);
      text(objects[i].label+" "+percent+"%", objects[i].x + 10, objects[i].y + 15);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
  
}

