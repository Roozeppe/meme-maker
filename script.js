// Facebook pop-up function.
function fbShare() {
  window.open("https://www.facebook.com/sharer/sharer.php?u=http://roozeppe.github.io/meme-maker", 
    "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=5,left=5,width=600,height=600");
};

// Twitter pop-up function.
function ttShare() {
  window.open("https://twitter.com/intent/tweet?text=Check%20out%20this%20cool%20meme%20maker&url=http://roozeppe.github.io/meme-maker&hashtags=happycoding&via=roozeppejp", 
    "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=5,left=5,width=600,height=600");
};

function textChangeListener (evt) {
  var id = evt.target.id;
  var text = evt.target.value;
      
  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }
      
  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}
    
function redrawMeme(image, topLine, bottomLine) {
  // Get Canvas2DContext
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");

  // Your code here
  if (image != null) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

    // Meme text's specifications.
    ctx.font = "36pt Impact";
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;

    // Top text.
    if (topLine != null) {
      ctx.fillText(topLine, canvas.width / 2, 60);
      ctx.strokeText(topLine, canvas.width / 2, 60);
    }

    // Bottom text.
    if (bottomLine != null) {
      ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 40);
      ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 40);
    }
}
    
function saveFile() {
  window.open(document.querySelector('canvas').toDataURL());
}
    

function handleFileSelect(evt) {
  var canvasWidth = 500;
  var canvasHeight = 500;
  var file = evt.target.files[0];
      
      
      
  var reader = new FileReader();
  reader.onload = function(fileObject) {
    var data = fileObject.target.result;
        
    // Create an image object
    var image = new Image();
    image.onload = function() {
          
      window.imageSrc = this;
      redrawMeme(window.imageSrc, null, null);
    }
        
    // Set image data to background image.
    image.src = data;
    console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file)
}
    
window.topLineText = " ";
window.bottomLineText = " ";
var input1 = document.getElementById('topLineText');
var input2 = document.getElementById('bottomLineText');
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document.getElementById('file').addEventListener('change', handleFileSelect, false);
document.querySelector('button').addEventListener('click', saveFile, false);