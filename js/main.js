// Global variable
let width = 500,
  height = 0,
  filter = 'none',
  streaming = false;

// Dom Elemnets
const video = document.getElementById('video'),
  canvas = document.getElementById('canvas'),
  photos = document.getElementById('photos'),
  photoButton = document.getElementById('photo-button'),
  clearButton = document.getElementById('clear-button'),
  photoFilter = document.getElementById('photo-filter');

// get media Stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(function(stream) {
    // take stream and link to video source
    video.srcObject = stream;
    // play the video
    video.play();
  })
  .catch(function(err) {
    console.log(`Error: ${err}`);
  });

// Play when ready
video.addEventListener(
  'canplay',
  function(e) {
    if (!streaming) {
      // set video / canvas height
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);

      streaming = true;
    }
  },
  false
);

// Take Photo EventListener
photoButton.addEventListener(
  'click',
  function(e) {
    takePicture();

    e.preventDefault();
  },
  false
);

// filter events
photoFilter.addEventListener('change', function(e) {
  // set filter to choosen option
  filter = e.target.value;
  // set filter to video
  video.style.filter = filter;

  e.preventDefault();
});

// Clear events
clearButton.addEventListener('click', function(e) {
  // clear photos
  photos.innerHTML = '';

  // change the filter normal
  filter = 'none';
  // set video filter
  video.style.filter = filter;
  // Reset select list
  photoFilter.selectedIndex = 0;

  e.preventDefault();
});

// take photo button event
const takePicture = e => {
  // create canvas
  const context = canvas.getContext('2d');

  if (width && height) {
    // set Canvas props
    canvas.width = width;
    canvas.height = height;

    // Draw an image of the video on the canvas
    context.drawImage(video, 0, 0, width, height);

    // create image from the canvas
    const imgUrl = canvas.toDataURL('image/png');

    // create img emlments
    const img = document.createElement('img');

    // set img src
    img.setAttribute('src', imgUrl);

    // set img filter
    img.style.filter = filter;

    // Add img imto photo
    photos.appendChild(img);
  }
};
