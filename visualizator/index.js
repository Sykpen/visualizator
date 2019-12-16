
let COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];
var Analyse = function () {
    var an= this,
    AudioContext = w.AudioContext || w.webkitAudioContext;

    this.audio = new Audio();
    this.audio.src = 'http://phalcon.demosite.pro/files/test3.ogg';
    this.controls = true;
    this.context = new AudioContext();
    this.node = this.context.createScriptProcessor(2048, 1, 1);
    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 512;
    this.bands = new Uint8Array(this.analyser.frequencyBinCount);
    this.audio.addEventListener('canplay', function () {
              an.source = an.context.createMediaElementSource(an.audio);
              an.source.connect(an.analyser);
              an.analyser.connect(an.node);
              an.node.connect(an.context.destination);
              an.source.connect(an.context.destination);
              an.node.onaudioprocess = function () {
                  an.analyser.getByteFrequencyData(an.bands);
                  if (!an.audio.paused) {
                      if (typeof an.update === "function") {
                          return an.update(an.bands);
                      } else {
                          return 0;
                      }
                  }
              };
      });

      return this;
  };
  var createParticles = function () {
    var particle = null, audio = null;
    for (var i = 0; i < 50; i++) {
        particle = new Particle();
        particles.push(particle);
    }
    elem = new Analyse();
   document.body.appendChild(elem.audio);
   audio.update = function (bands) {
       var ln = 50;
        while (ln--) {
            var loc = particles[ln];
            loc.pulse = bands[loc.band] / 256;
        }
   };
    setInterval(draw,33);
}
