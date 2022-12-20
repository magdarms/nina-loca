(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"NIÑA_20animate_20movimiento_atlas_1", frames: [[0,0,1040,1236]]},
		{name:"NIÑA_20animate_20movimiento_atlas_2", frames: [[1030,0,917,1221],[0,0,1028,1126]]},
		{name:"NIÑA_20animate_20movimiento_atlas_3", frames: [[499,658,608,214],[982,942,600,206],[1200,655,584,285],[1848,354,180,63],[1848,289,186,63],[0,962,411,186],[499,0,699,656],[1568,0,278,653],[1200,0,366,613],[0,0,497,960],[1848,419,166,63],[1848,0,174,196],[1848,198,183,89],[1584,942,418,204],[499,874,481,260],[1848,484,74,74]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_12 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.flash0ai = function() {
	this.initialize(ss["NIÑA_20animate_20movimiento_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Símbolo3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.flash0ai();
	this.instance.setTransform(-37,-37);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo3, new cjs.Rectangle(-37,-37,74,74), null);


(lib.Símbolo2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAfBqIgKgFIgdgFIgHgFIgegFIgKgHIgDgFIAAgDIgUgFIgPgHIgMgIIgIgHIgPgIIgKgHIgKgIIgPgHIgPgIIgHgFIgegEIgKgHIgDgIIgMgHIgXAAIgFAHIgMAFIgPgFIgIgHIgCgIIgDgHIADgIIACgHIAIgIIAKgFIAHgCIAyACIAKAIIAKAHIAKAIIAUAHIAPAIIAIAFIACACIAPAFIAPAIIAIAHIAPAHIAKAHIAHAIIAPAHIASAIIAPAHIAHAFIAUAFIAMAFIAUAFIAMAFIB7gCIAHgIIANgHIAKgIIAKgHIAPgIIAHgHIAIgIIAHgHIADgHIAAgHIACgIIAIgHIACgIIADgHIAFgIIAAgHIAAgIIAAgHIACgIIAFgHIADgIIACgHIAFgFIAFgDIAIAAIAFAAIAKAIIACAHIADAIIgDAHIgCAIIgFAHIAAAIIAAAHIAAAIIAAAHIgDAIIgFAHIgFAIIgCAHIgFAHIgDAHIgCAIIgFAHIgIAIIgHAHIgIAIIgHAHIgKAIIgPAHIgIAIIgKAHIgKAIIgFAHIgHAFIgIADIiHgDg");
	this.shape.setTransform(30.875,10.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AheBxIgDgGIgvgEIgCgGIg9gEIgCgFIgZgGIgIgHIgHgHIgHgIIgDgIIgDgHIgHgIIAAgHIgFgHIgFgIIAAgIIgIgHIgCgHIgFgHIgFgHIAAgIIAAgIIAAgHIAFgIIAHgEIADgDIAFgDIAMgCIAIgCIDcAAIBIgDIAHgFIAggFIAIgFIAXgFIAHgFIAXgFIAHgFIAqgFIAIgCIAAgDIBdADIAHAHIAHAHIADAIIAAAHIAAAIIgDAIIgCAHIgIAHIgHAIIgIAHIgHAIIgHAIIgIAHIgIAHIgHAHIgIAHIgHAIIgHAIIgIAHIgIAHIgEAGIgFACIgNAFIgHAIIgIAHIgKAHIgPAIIgIAIIgCAFIgFACIgWAFIgIAFIgjAFIgFAFIiQgCgAC8hZIgIAFIgjAFIgIAFIgWAFIgIAFIgdAFIgIAFIgZAFIgFAFIhPACIjkAFIgHAAIgFAGIACAHIAGAHIAHAIIACAHIADAHIAHAIIADAHIADAHIAEAIIADAIIAFAHIAIAIIAEAEIAPAGIAIAEIA/AGIAEAEIArAGIAHAFIB9gDIAHgFIAqgFIAIgFIANgFIAKgIIAEgEIAGgDIAKgFIAHgHIAIgIIAKgIIAOgHIALgHIAHgIIAFgHIAKgHIAFgIIAHgHIAIgHIAHgIIAIgIIAIgHIAHgIIAHgHIAIgHIgCgIIgGgFIAAgDIhSAAIgCADg");
	this.shape_1.setTransform(33,11.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhpC4IgDgFIglgFIgDgFIgRgFIgIgIIgHgHIgIgIIgHgHIgFgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAFgGIAFgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAHgHIADgIIAAgHIAAgIIAAgHIAFgIIAFgHIAAgIIAAgHIAFgIIAFgHIAHgIIADgHIAFgIIAHgHIAFgFIAFgDIAKgFIAIgFIAUAAIAAgCIByACIAFAFIAPAFIAHAIIAIAFIACACIAXAFIAFAFIAPAFIAFAFIAZAFIAHAIIAKAHIAPAIIADAHIAFAIIAHAHIAFAIIAIAHIAFAIIACAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIgCAGIgIAIIAAAHIAAAIIAAAHIgCAIIgFAHIgDAIIAAAHIgCAIIgFAHIgDAIIgCAHIgIAIIgCAHIgDAIIgKAHIgKAIIgPAHIgFAIIgHAFIgNAFIgHAFIgNAFIgHAFIgSAFIglAHIgFAFIhygCgAhpieIgIAFIgMAFIgIAIIgFAHIgFAIIgCAHIgFAIIAAAHIAAAIIgFAHIgFAIIAAAHIAAAIIAAAHIgDAIIgHAHIAAAIIAAAHIAAAIIAAAHIAAAIIgFAGIgFAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAFAHIAHAIIAIAHIAHAFIAAADIAPAFIAFAFIAjAFIAFAFIBegDIAIgFIAogFIAHgHIAIgIIAPgHIAKgFIAKgFIAKgIIAMgHIAKgIIAFgHIADgIIAFgHIACgIIADgHIAHgIIAAgHIAAgIIADgHIAHgIIAAgHIAAgIIAAgGIADgIIAFgHIACgIIAAgHIAAgIIAAgHIgFgIIgFgHIgCgIIgIgHIgHgIIgFgHIgKgIIgPgHIgcgIIgCgFIgSgFIgCgFIgUgFIgKgHIgKgFIAAgDIgSgFIgCgFIgxAAIgUADIgZgDIgFAAIgFgCIgIAAIgCACg");
	this.shape_2.setTransform(29.125,14.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ah7CUIgCgFIgcgGIgHgHIgIgHIgKgGIgHgHIgFgHIgIgIIgCgHIAAgIIgDgIIgFgHIgCgHIAAgIIgFgHIgFgIIAAgIIgFgHIgFgHIAAgIIgIgGIgHgIIgFgIIgIgHIgKgHIgCgIIACgHIAFgIIADgIIAFgHIAHgHIAIAEIACADIANAFIAMAIIAKAHIAKAHIASAIIAHAFIAhAFIAFAFIAqAAIBVgFIAHgFIAUgFIAHgFIAZgFIAIgFIAUgFIAHgFIAPgFIAIgFIAKgFIAHgFIANgFIAHgFIANgFIAHgHIAFgGIAFgCIANgFIAHgFIANgFIAHgFIANgFIAKgIIAFgEIAFAAIAFgDIAKAHIACAIIAAAHIAAAIIAAAIIAAAHIAAAHIgCAIIgDAHIgFAIIAAAIIgCAHIgDAHIgFAIIgCAHIgIAIIgFAIIgHAHIgIAHIgCAHIgFAIIgDAHIgFAIIgHAHIgIAHIgMAIIgKAIIgNAHIgMAIIgIAHIgFAFIgMAFIgIAHIgKAIIgHAHIgZAIIgIAFIgPAFIgHAFIgUAFIgIAFIgVAFIgIAFIhpgCgAj6g0IAKAIIAKAHIAFAIIAHAIIAIAHIACAHIAFAHIAFAIIADAHIAAAIIAFAHIACAHIADAIIAFAIIACAHIADAIIAAAHIAFAHIAFAIIAHAIIAFAHIAIAIIAFAEIAZAGIAFAEIBfgCIAHgFIAWgFIAHgFIANgFIAHgFIAXgFIAHgFIAPgFIANgHIAKgIIAKgIIAHgHIANgIIAKgHIAKgHIAPgIIAHgIIAIgHIACgIIAFgGIAFgHIAIgIIAHgIIAFgHIAAgIIAIgHIAHgHIAFgIIAAgIIAAgHIAFgIIAFgHIAAgHIAAgIIAAgFIAAgDIgKAAIgCADIgIAFIgMAFIgKAHIgFAGIgFACIgNAFIgFAFIgMAFIgKAIIgDAEIgFADIgPAFIgFAFIgPAFIgFAFIgWAFIgIAFIgPAFIgFAFIgZAFIgFAFIgZAFIgFAEIhZAAIg3gEIgCgFIgegFIgDgFIgZgFIgHgHIgIgIIgKgHIgRgIIgIgFIADAHg");
	this.shape_3.setTransform(31.875,15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("EgrpAO2IgKgIIgCgHIACgIIADgHIAHgFIAIAAIAAgDIAeADIAKAHIACAIIAAAHIgFAIIgEAFIgIACIghgCgEAkqgKuIgDgFIgvgFIgCgFIgSgFIgDgFIgRgFIgDgFIgRgFIgFgIIgHgHIgKgIIgIgHIgFgIIgHgHIgLgIIgHgHIgFgIIgCgHIgGgIIgHgHIgFgIIgHgHIgKgIIgDgHIAAgIIgFgHIgIgIIgHgHIgHgIIgPgFIgGgHIAGgIIARAAIAKAIIAIAHIAHAIIAHAHIAIAIIAHAHIAKAIIAIAHIAFAIIAHAHIADAIIAFAHIAHAIIAIAHIAIAIIAHAHIAHAIIAIAHIAHAIIAIAHIAPAIIAPAHIANAIIARAHIAtAIIAHAFIArgDIAKgFIAbgFIAKgFIAVgFIAKgFIAWgFIAKgFIAUgFIAKgFIASgFIAOgHIAKgIIAIgHIAHgIIAKgHIAGgIIAHgHIAHgIIALgHIAKgIIAMgHIAIgIIAHgHIAKgIIAFgHIAPgIIACgHIAKgIIANgHIAIgIIAHgHIAKgIIAFgHIAFgIIAFgFIAHAAIAAgCIAQACIAHAIIAAAHIgDAIIgMAHIgIAIIgJAHIgNAIIgHAHIgIAIIgKAHIgFAIIgIAHIgKAIIgKAHIgMAIIgHAHIgIAIIgKAHIgKAIIgFAHIgPAIIgDAHIgHAIIgNAHIgHAIIgHAHIgLAIIgOAHIgKAFIgNAFIgKAFIgUAFIgIAFIgdAFIgKAFIgNAFIgKAFIgeAFIgHAFIhEgCg");
	this.shape_4.setTransform(-214.35,88.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-494.9,-6.5,561.1999999999999,190.5);


(lib.Símbolo1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_11();
	this.instance_1.setTransform(-7.55,39.55,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_12();
	this.instance_2.setTransform(-5.3,41.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},8).to({state:[{t:this.instance_2}]},3).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.5,0,306.2,148.8);


(lib.piernas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_17();
	this.instance_1.setTransform(-82,35.4,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_16();
	this.instance_2.setTransform(-99,35.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_2},{t:this.instance_1}]},1).to({state:[{t:this.instance}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99,0,304.5,93);


(lib.niña = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(10.95,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_9();
	this.instance_2.setTransform(8.25,2.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},5).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357.8,330.6);


(lib.flecha = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.flash0ai();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,74,74);


(lib.CARAGRANDE = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(-74,-133.3,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(-113.5,-128.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},12).to({state:[{t:this.instance_2}]},12).wait(14));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113.5,-133.3,520,622.5);


(lib.cabeza = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhhAJIAAgDIAAgGIAAgHIgBgBIBbADIAFAFIBWACIAKgFIAFgBIgCAEIAAAGIAAADgAhigIIAAAAIAAAAg");
	this.shape.setTransform(45.825,96.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ACLHpIgDAAIgPAAIAAgDIAAgHIACgEIgEABIgKAFIhYgCIgFgFIhZgDIAAAAIAAAAIAAAAIAAAIIAAAHIAAADIgPAAIAAgFIAAgIIAAgGIgggBIgDgFIhBgFIgCgFIgcgFIgCgFIgSgFIgHgIIgKgHIgIgIIgPgHIgFgIIgHgHIgKgIIgIgHIgFgIIgHgHIgDgIIgHgHIgFgIIgFgHIgKgIIgDgHIgFgIIgFgHIAAgIIgHgHIgDgIIAAgHIAAgIIgHgHIgDgIIAAgHIAAgIIgHgHIgDgIIgCgHIgFgIIgDgHIgFgIIgFgHIAAgIIAAgHIgFgIIgFgHIAAgIIAAgHIAAgIIgCgHIgFgIIgDgHIAAgIIAAgHIAAgIIADgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAFgHIAFgHIAAgHIAAgIIAAgHIAAgIIAHgHIADgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAHgHIADgIIACgHIAFgIIADgHIAHgIIADgHIACgIIAFgHIADgIIACgHIAIgIIAHgHIAIgIIAHgHIAFgIIADgHIAHgIIAPgHIAIgIIAHgHIAIgIIAHgHIAIgFIAJgEIgCgEIgFgHIgHgIIgFgHIgDgIIgFgHIgCgIIgDgHIgHgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIgDgIIgFgHIgCgIIgDgHIgHgIIAAgHIAAgIIgDgHIgHgIIAAgHIAAgIIAAgHIACgFIADgDIAFAAIACAAIAFAIIADAHIAAAIIACAHIAFAIIADAHIAAAIIACAHIAFAIIADAHIAFAIIACAHIADAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIACAHIAFAIIADAHIAFAIIAFAHIAHAIIADAHIAFAIIAEABIAIgGIAIgIIARgHIAIgFIAqgFIANgFIAHgDIAIAAIAAgCIA3ACIAFAEIAAgEIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIACgHIAFgIIADgHIAAgIIAAgHIAAgIIAHgHIADgIIACgHIAFgIIADgHIAAgIIACgHIAIgDIACAAIAFAIIADAHIAAAIIgDAHIgFAIIgCAHIgFAIIgFAHIAAAIIAAAHIAAAIIgFAHIgDAIIgCAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAABIBeAEIAHAFIAhAFIAHAFIAIACIAAgEIAFgIIAFgHIAAgIIAHgHIADgIIACgHIAIgIIAHgHIAIgIIAHgHIAIgIIAHgHIAIgIIAHgHIAKgIIAKgHIAKgFIADgDIAFAAIAAgCIAMACIAFAIIAAAHIgFAIIgHAAIgIAAIgKAHIgMAIIgKAHIgIAIIgHAHIgIAIIgHAHIgIAIIgHAHIgDAIIgFAHIgCAIIgFAHIgDAIIgCAHIAAAEIACABIAUAFIAIAFIAPAFIAPAIIAMAHIASAIIAFAHIAHAIIAKAHIASAIIAFAHIAPAIIAMAHIASAIIAPAHIAHAIIAKAHIAPAIIAIAHIAMAIIANAHIACAIIAFAHIAIAIIAHAHIAIAIIACAHIADAIIAFAHIACAIIADAHIAAAIIAFAHIACAIIADAHIAAAIIAAAHIAAAIIAAAHIAAAHIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIgDAIIgCAHIgFAIIAAAHIAAAIIAAAHIAAAIIgDAHIgCAIIgFAHIAAAIIgDAHIgCAIIgFAHIgDAIIgCAHIgFAIIgDAHIgFAIIgFAHIgCAIIgIAHIgCAIIgIAHIgFAIIgFAHIgCAIIgIAHIgFAIIgHAHIgDAIIgHAHIgIAIIgFAHIgKAIIgHAHIgIAIIgMAHIgNAIIgKAHIgMAIIgSAHIgKAFIgbAFIgKAFIgUAFIgKAFIgKADIAFAAIAKAHIAFAIgAjwkEIgNAFIgKAHIgCAFIgFADIgNAFIgHAHIgIAIIgKAHIgHAIIgFAHIgIAIIgHAHIgFAIIgDAHIgHAIIgDAHIgCAIIgFAHIgDAIIgFAHIgHAIIgFAHIgDAIIgCAHIgFAIIAAAHIAAAIIAAAHIAAAIIAAAHIgDAIIgCAHIgFAIIAAAHIAAAIIAAAHIAAAHIgFAHIgFAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIACAIIAAAHIADAIIAFAHIACAIIAAAHIAAAIIADAHIAFAIIACAHIAAAIIADAHIAFAIIACAHIAFAIIADAHIACAIIAFAHIADAIIACAHIAAAIIAFAHIADAIIACAHIAAAIIAFAHIADAIIAFAHIAFAIIAHAHIAFAIIAIAHIACAIIAFAHIAIAIIAHAHIAIAIIAHAHIAIAIIAHAHIAKAIIAIAHIAPAIIAFAFIAPAFIAFAFIAZAFIAFAFIA3AFIAHAFICEAFIAHAFIBOgDIAKgFIAUgFIAMgFIASgFIAKgFIAWgFIAKgFIASgFIAKgHIAKgIIAPgHIAHgIIAIgHIAHgIIAIgHIAHgIIAIgHIAFgIIACgHIAFgIIAIgHIAFgIIACgHIAFgIIAFgHIAFgIIADgHIACgIIAFgHIADgIIAFgHIAFgIIACgHIAFgIIADgHIAAgIIAAgHIACgIIAFgHIADgIIAAgHIAAgIIAAgHIAAgIIACgHIAFgIIADgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgGIAAgIIAAgHIAAgIIAAgHIgDgIIgFgHIgCgIIAAgHIgDgIIgFgHIgCgIIgFgHIgIgIIgHgHIgIgIIgHgHIgPgIIgKgHIgNgIIgMgHIgKgIIgNgHIgPgIIgPgHIgPgIIgHgHIgNgIIgMgHIgIgIIgHgHIgNgIIgPgHIgZgIIgFgFIgZgFIgFgFIgRgFIgFgFIgjgFIgFgFIheAAIgZADIg8gDIgKgFIgNAFIgHAAIgDgFIgWAAIgDADIgHAFIACAAIAIgFIAFAHIgDAIIgCAFIgKACIgUADIgIgBIgCABgAhBEeIgIgHIgKgIIgHgHIgFgIIgFgHIAAgIIgIgHIgHgIIgFgHIAAgIIAAgHIgFgIIgDgHIAAgIIADgHIAHAAIAFAHIADAIIAHAHIADAIIACAHIAIAIIAFAHIAFAIIACAHIAFAIIAFAHIANAIIBCAAIAPgIIAPgHIANgIIAHgHIAIgIIAHgHIAIgIIAHgHIAIgIIAHgHIAAgIIAAgHIAFgFIAIAAIAFAAIAFAHIAAAIIgFAHIgDAIIgHAHIgIAIIgHAHIgIAIIgFAHIgCAIIgPAHIgIAIIgKAHIgPAIIgHAFIgNAFIgHAFIhKgDgABUBWIgFgHIACgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAFgIIAFgHIADgHIAHgFIAIAAIAAgCIAUACIAKAIIAKAGIAFAIIAFAHIAAAIIAAAHIAAAIIAAAHIAAAIIgDAHIgCAIIgPAHIgFAFIgFADIgtgDgAibBCIgDgFIgRgFIgFgHIAAgIIAAgHIAAgIIAAgHIAAgIIACgHIAFgHIADgHIAHgIIAIgHIAHgDIAAgCIAUACIAIAFIAMAFIAKAIIADAHIAFAHIAAAHIAAAIIAAAHIgFAIIgFAHIgIAIIgHAHIgIAIIgHAFIgZgDg");
	this.shape_1.setTransform(43.375,48.875);

	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-83,4.3,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_19();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83,0,170,98);


(lib.Símbolo4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.movieClip_1 = new lib.Símbolo3();
	this.movieClip_1.name = "movieClip_1";
	this.movieClip_1.setTransform(37,37);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,74,74);


// stage content:
(lib.NIÑAanimatemovimiento = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,28,112,122];
	this.streamSoundSymbolsList[28] = [{id:"audiomarcos2mp3copia",startFrame:28,endFrame:113,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_28 = function() {
		var soundInstance = playSound("audiomarcos2mp3copia",0);
		this.InsertIntoSoundStreamData(soundInstance,28,113,1);
	}
	this.frame_112 = function() {
		var _this = this;
		/*
		Al hacer clic en la instancia del símbolo especificada, se ejecuta una función.
		*/
		_this.button_3.on('click', function(){
		/*
		Inicie la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
		createjs.Ticker.addEventListener('tick', stage);
		});
		var _this = this;
		/*
		Detenga la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
	}
	this.frame_122 = function() {
		var _this = this;
		/*
		Detener un clip de película o un vídeo
		Detiene el clip de película o el vídeo especificado.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(28).call(this.frame_28).wait(84).call(this.frame_112).wait(10).call(this.frame_122).wait(8));

	// Capa_6
	this.instance = new lib.Símbolo1("synched",0);
	this.instance.setTransform(465.35,192.2,1,1,0,0,0,146,71.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(63).to({_off:false},0).to({_off:true},50).wait(17));

	// muñeco
	this.instance_1 = new lib.cabeza();
	this.instance_1.setTransform(376.15,200.2,1,1,0,0,0,43.4,48.9);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.cabeza(), 3);

	this.instance_2 = new lib.piernas();
	this.instance_2.setTransform(394.55,424.4,1,1,0,0,0,102.8,46.4);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 2, false, new lib.piernas(), 3);

	this.instance_3 = new lib.CachedBmp_22();
	this.instance_3.setTransform(265,248.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},113).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},9).wait(8));

	// flecha
	this.button_2 = new lib.Símbolo4();
	this.button_2.name = "button_2";
	this.button_2.setTransform(743,469.95,1,1,0,0,0,37,37);
	new cjs.ButtonHelper(this.button_2, 0, 1, 1);

	this.button_3 = new lib.flecha();
	this.button_3.name = "button_3";
	this.button_3.setTransform(741,458,1,1,0,0,0,37,37);
	new cjs.ButtonHelper(this.button_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.button_2}]},111).to({state:[{t:this.button_3}]},1).to({state:[]},1).wait(17));

	// Capa_5
	this.instance_4 = new lib.CachedBmp_1();
	this.instance_4.setTransform(344.7,155.05,0.5,0.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(52).to({_off:false},0).to({_off:true},11).wait(67));

	// OJOS
	this.instance_5 = new lib.CachedBmp_2();
	this.instance_5.setTransform(399.25,209.75,0.5,0.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(40).to({_off:false},0).to({_off:true},8).wait(82));

	// cARA_GRANDEº
	this.instance_6 = new lib.CARAGRANDE("synched",0);
	this.instance_6.setTransform(461.35,369.55,1,1,0,0,0,124.1,240);
	this.instance_6._off = true;

	this.instance_7 = new lib.CachedBmp_21();
	this.instance_7.setTransform(225,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},40).to({state:[{t:this.instance_6}]},37).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},34).to({state:[]},1).wait(17));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(40).to({_off:false},0).to({startPosition:37},37).to({_off:true},1).wait(52));

	// BOCA
	this.instance_8 = new lib.Símbolo2("synched",0);
	this.instance_8.setTransform(446.15,282.1,1,1,0,0,0,30.9,10.8);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(43).to({_off:false},0).to({_off:true},70).wait(17));

	// ANDAR
	this.instance_9 = new lib.niña("synched",0);
	this.instance_9.setTransform(-161.4,353.35,1,1,0,0,0,91.5,153.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({x:461.55,y:377.35},39).to({_off:true},1).wait(90));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(147.1,296.3,632.9,322.49999999999994);
// library properties:
lib.properties = {
	id: '1A807C08A8659548B98AF03DB9AEDAD1',
	width: 800,
	height: 600,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/NIÑA_20animate_20movimiento_atlas_1.png", id:"NIÑA_20animate_20movimiento_atlas_1"},
		{src:"images/NIÑA_20animate_20movimiento_atlas_2.png", id:"NIÑA_20animate_20movimiento_atlas_2"},
		{src:"images/NIÑA_20animate_20movimiento_atlas_3.png", id:"NIÑA_20animate_20movimiento_atlas_3"},
		{src:"sounds/audiomarcos2mp3copia.mp3", id:"audiomarcos2mp3copia"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['1A807C08A8659548B98AF03DB9AEDAD1'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;