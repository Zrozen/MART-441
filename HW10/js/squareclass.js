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
