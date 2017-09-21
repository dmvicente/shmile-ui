var LandscapeTwoByTwo = function(config) {
    // this.config = config;
    // this.paper = new Raphael('viewport', this.config.window_width, this.config.window_height);
    // this.frames = this.paper.set(); // List of SVG black rects
    // this.images = this.paper.set(); // List of SVG images
    // this.all = this.paper.set();
    // this.overlayImage = null;
    this.photoBorder = 0;
    // this.compositeDim = null;
    // this.frameDim = null;
    // this.compositeOrigin = null;
    // this.compositeCenter = null;
    // this.state = state;
    this.totalPictures = 4;
    this.finalSizeRatio = 6/4;
    // this.photoViewLayout = null;
  }

LandscapeTwoByTwo.prototype.render = function(stuff) {
  // var w = this.config.window_width - this.config.photo_margin;
  // var h = this.config.window_height - this.config.photo_margin;
  // this.compositeDim = CameraUtils.scale4x6(w, h);
  // this.compositeOrigin = {
  //     x: (this.config.window_width - this.compositeDim.w) / 2,
  //     y: (this.config.window_height - this.compositeDim.h) / 2
  // };
  // this.compositeCenter = {
  //     x: this.compositeOrigin.x + (this.compositeDim.w/2),
  //     y: this.compositeOrigin.y + (this.compositeDim.h/2)
  // }
  // var r = this.paper.rect(this.compositeOrigin.x, this.compositeOrigin.y, this.compositeDim.w, this.compositeDim.h);
  //
  // r.attr({'fill': 'white'});
  //
  // this.all.push(r);

  var compositeDim = stuff.compositeDim;
  var paper = stuff.paper;
  var compositeOrigin = stuff.compositeOrigin;
  var frames = stuff.frames;
  var images = stuff.images;
  var all = stuff.all;

  // Scale the photo padding too
  this.photoBorder = compositeDim.w / 50;

  //upper x
  var frame_x = compositeOrigin.x + this.photoBorder;
  var frame_y = compositeOrigin.y + this.photoBorder;
  this.frameDim = {
      w: (compositeDim.w - (3*this.photoBorder))/2,
      h: (compositeDim.h - (3*this.photoBorder))/2
  };
  var frame = paper.rect(frame_x, frame_y, this.frameDim.w, this.frameDim.h);
  frame.attr({'fill': 'black'});
  var img = paper.image(null, frame_x, frame_y, this.frameDim.w, this.frameDim.h);

  images.push(img);
  frames.push(frame);
  all.push(img);
  all.push(frame);

  frame = frame.clone();
  img = img.clone();
  frame.translate(this.frameDim.w + this.photoBorder, 0);
  img.translate(this.frameDim.w + this.photoBorder, 0);
  frames.push(frame);
  images.push(img);
  all.push(frame);
  all.push(img);

  frame = frame.clone();
  img = img.clone();
  frame.translate(-(this.frameDim.w + this.photoBorder), this.frameDim.h + this.photoBorder);
  img.translate(-(this.frameDim.w + this.photoBorder), this.frameDim.h + this.photoBorder);
  frames.push(frame);
  images.push(img);
  all.push(frame);
  all.push(img);

  frame = frame.clone();
  img = img.clone();
  frame.translate(this.frameDim.w + this.photoBorder, 0);
  img.translate(this.frameDim.w + this.photoBorder, 0);
  frames.push(frame);
  images.push(img);
  all.push(frame);
  all.push(img);

  return this.frameDim;

}

// LandscapeTwoByTwo.prototype.toString = function() {
//     ret = [];
//     ret.push("Size of 'all' set: " + all.length);
//     ret.push("Size of 'frames' set: " + frames.length);
//     ret.push("Composite photo is: " + this.all[0].attr('width') + 'x' + this.all[0].attr('height'));
//     ret.push("Frame photo is: " + this.frameDim.w + 'x' + this.frameDim.h);
//     return ret.join('\n');
//   }

  // /**
  //  * Updates the image at the set location.
  //  * @param {String} img_src
  //  *   The URL of the image resource the browser should fetch and display
  //  * @param {Integer} idx
  //  *   Index of frame to update
  //  * @param cb
  //  *   The callback to be executed when the UI has finished updating and zooming out.
  //  */
  // LandscapeTwoByTwo.prototype.updatePhotoSet = function(img_src, idx, cb) {
  //   var view = this;
  //   var imgEl = view.images[idx];
  //   var frameEl = view.frames[idx];
  //
  //   return [imgEl, frameEl]
  //   // imgEl.attr({'src': img_src, 'opacity': 0});
  //   // imgEl.show();
  //   //
  //   // var afterShowPhoto = function () {
  //   //   // We've found and revealed the photo, now hide the old black rect and zoom out
  //   //   frameEl.hide();
  //   //   p.zoomFrame(idx, 'out', cb);
  //   // }
  //   // imgEl.animate({'opacity': 1}, 200, afterShowPhoto);
  // }



  // /**
  //  * zoomFrame zooms into the indicated frame.
  //  * Call it once to zoom in, call it again to zoom out.
  //  *
  //  * @param idx Frame index
  //  *   Expect zoomFrame(1) to be matched immediately by zoomFrame(1)
  //  * frame: 0 (upper left), 1 (upper-right), 2 (lower-left), 3 (lower-right)
  //  * @param dir 'in' or 'out'
  //  *   Zoom in or out
  //  * @param onfinish
  //  *   Callback executed when the animation is finished.
  //  *
  //  * Depends on the presence of the .zoomed object to store zoom info.
  //  */
  // LandscapeTwoByTwo.prototype.zoomFrame = function(idx, dir, state, onfinish) {
  //   var view = this;
  //   // var composite = this.all[idx];
  //
  //   var frame = this.frames[idx];
  //   var frameX = frame.attr('x');
  //   var frameW = frame.attr('width');
  //   var frameY = frame.attr('y');
  //   var frameH = frame.attr('height');
  //   var centerX = frameX + frameW/2;
  //   var centerY = frameY + frameH/2;
  //
  //   var animSpeed = 700;
  //
  //   // delta to translate to.
  //   var dx = this.compositeCenter.x - centerX;
  //   var dy = this.compositeCenter.y - centerY;
  //   var scaleFactor = this.compositeDim.w / this.frameDim.w;
  //
  //   if (dir === "out" && state.zoomed) {
  //       scaleFactor = 1;
  //       dx = -state.zoomed.dx;
  //       dy = -state.zoomed.dy;
  //       view.all.animate({
  //           'scale': [1, 1, view.compositeCenter.x, view.compositeCenter.y].join(','),
  //       }, animSpeed, 'bounce', function() {
  //           view.all.animate({
  //               'translation': dx+','+dy
  //           }, animSpeed, '<>', onfinish)
  //       });
  //       // Clear the zoom data.
  //       return null;
  //   } else if (dir !== "out") {
  //       view.all.animate({
  //           'translation': dx+','+dy
  //       }, animSpeed, '<>', function() {
  //           view.all.animate({
  //               'scale': [scaleFactor, scaleFactor, view.compositeCenter.x, view.compositeCenter.y].join(','),
  //           }, animSpeed, 'bounce', onfinish)
  //       });
  //       // Store the zoom data for next zoom.
  //       return {
  //           dx: dx,
  //           dy: dy,
  //           scaleFactor: scaleFactor
  //       };
  //   }
  // }

  // LandscapeTwoByTwo.prototype.createOverlayImage = function(overlayImage) {
  //   return paper.image(
  //       overlayImage,
  //       this.compositeOrigin.x,
  //       this.compositeOrigin.y,
  //       this.compositeDim.w,
  //       this.compositeDim.h);
  //     }

// LandscapeTwoByTwo.prototype.removeImages = function () {
//   // images.clear();
//   // for (var i = 0; i < this.totalPictures; i++) {
//   //   this.images.pop();
//   // }
//   this.images.hide();
//   this.frames.show();
// }
