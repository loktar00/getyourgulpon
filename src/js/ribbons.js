(function(global){
    'use strict';

    global.Ribbons = function(){
        this.canvas     = document.querySelector('canvas');
        this.ctx        = this.canvas.getContext('2d');
        this.width      = window.innerWidth;
        this.height     = window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.cycle = 6.8;
        this.angleY = 0;
        this.offset = -80;
        this.offsetY = this.height/4;
        this.radius = 10;

        this.points = this.update();
        this.pointsMorph = this.update();
        this.lastMorph = 0;
        this.morphDelay = 1000;

        this.ctx.fillStyle = "rgba(0,0,0,0.1)";
        this.ctx.strokeStyle = colorCycle(this.cycle);
        this.ctx.globalCompositeOperation = "lighter";

        this.render();
    };

    global.Ribbons.prototype = {
        update : function(){
            var points = [],
                power = 64,
                displacement = Math.random() * 100;

            points[0] = Math.random() * displacement;
            points[power] = points[0];

            for (var i = 1; i < power; i *= 2) {
                for (var j = (power / i) / 2; j < power; j += power / i) {
                    points[j] = ((points[j - (power / i) / 2] + points[j + (power / i) / 2]) / 2) + (Math.random() * -displacement + displacement);
                }
                displacement *= 0.6;
            }
            return points;
        },
        ribbonAnimation : function(){
            var ctx = this.ctx;

                this.angle -= 0.01;
                this.offset++;
                
                if (this.offset > this.width + 100) {
                    this.offset = -80;
                    this.offsetY += 80;
                    this.ctx.strokeStyle = colorCycle(this.cycle+=3);
                }
                
                ctx.save();
                ctx.translate(this.offset - this.radius, (this.offsetY - this.radius) + Math.sin(this.angleY += 0.01) * 50);
                ctx.transform(1, 0, 0.8, 1, 0, 0);
                ctx.rotate(this.angle);
                ctx.beginPath();
                ctx.moveTo(this.radius, this.radius + this.points[0]);

                for (var i = 0; i <= this.points.length; i++) {
                    ctx.rotate((Math.PI * 2) / this.points.length);
                    ctx.lineTo(this.radius, this.radius + this.points[i]);
                    if (this.points[i] !== this.pointsMorph[i]) {
                        if (this.points[i] > this.pointsMorph[i]) {
                            this.points[i] -= 0.2;
                        } else {
                            this.points[i] += 0.2;
                        }
                    }
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();

                if (Date.now() > this.lastMorph + this.morphDelay) {
                    this.lastMorph = Date.now();
                    this.pointsMorph = this.update();
                }
        },
        render : function(){
            var that = this;
            
            for(var i = 0; i < 5; i++){
                this.ribbonAnimation();
            }

            requestAnimationFrame(function(){
                that.render();
            });
        }
    };
})(this);