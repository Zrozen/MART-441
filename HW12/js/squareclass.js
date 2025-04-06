class Shape {
    constructor(x, y, width, height, color, isCircle = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.isCircle = isCircle;
        this.dx = 2;
        this.dy = 2;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        if (this.isCircle) {
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    moveAutonomous(canvas) {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce on edges
        if (this.x <= 0 || this.x + this.width >= canvas.width) this.dx *= -1;
        if (this.y <= 0 || this.y + this.height >= canvas.height) this.dy *= -1;
    }

    stayInBounds(canvas) {
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }

    isCollidingWith(other) {
        return !(
            this.x + this.width < other.x ||
            this.x > other.x + other.width ||
            this.y + this.height < other.y ||
            this.y > other.y + other.height
        );
    }
}
class GameObject {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    moveRandom(canvas) {
        // Move by -10 to +10 pixels in x or y
        const dx = Math.floor(Math.random() * 21) - 10;
        const dy = Math.floor(Math.random() * 21) - 10;
      
        // Update position, keeping within bounds
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x + dx));
        this.y = Math.max(0, Math.min(canvas.height - this.height, this.y + dy));
      }
      
  }
  
  class Collectible {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.collected = false;
      this.angle = 0;
    }
  
    draw(ctx) {
        if (this.collected) return;
      
        const spikes = 5;
        const outerRadius = this.size;
        const innerRadius = this.size / 2;
      
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle); // Just apply rotation here
      
        ctx.beginPath();
        let rot = Math.PI / 2 * 3; // Start at top
        const step = Math.PI / spikes;
      
        ctx.moveTo(0, -outerRadius);
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
          rot += step;
          ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
          rot += step;
        }
        ctx.closePath();
      
        // Glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
      
        ctx.fillStyle = this.color;
        ctx.fill();
      
        ctx.restore();
      }
      
  
    moveRandom(canvas) {
      if (this.collected) return;
  
      const dx = Math.floor(Math.random() * 15) - 7;
      const dy = Math.floor(Math.random() * 15) - 7;
  
      this.x = Math.max(0, Math.min(canvas.width, this.x + dx));
      this.y = Math.max(0, Math.min(canvas.height, this.y + dy));
  
      // Add spin
      this.angle += 0.05;
    }
  
    collect(player) {
      const dx = this.x - (player.x + player.width / 2);
      const dy = this.y - (player.y + player.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + player.width / 2 && !this.collected) {
        this.collected = true;
        return true;
      }
      return false;
    }
  }
  