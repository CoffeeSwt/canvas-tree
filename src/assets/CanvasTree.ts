export interface Point {
    x: number,
    y: number
}

export interface Line {
    startPoint: Point,
    length: number,
    angle: number
}

export class CanvasTree {
    el: HTMLCanvasElement | null
    private ctx: CanvasRenderingContext2D | null
    private renderCount: number
    private pendingTasks: Function[] = []
    constructor(el: HTMLCanvasElement, startLine: Line = {
        startPoint: { x: el.width / 2, y: el.height },
        length: 50,
        angle: - Math.PI / 2
    }) {
        this.el = el
        this.ctx = el.getContext('2d')
        this.pendingTasks = []
        this.renderCount = 0

        //构建树
        this.setp(startLine)

    }

    render() {
        requestAnimationFrame(() => {
            if (this.renderCount % 3 == 0)
                this.frame()
            this.render()
            this.renderCount++
        })
    }

    private frame() {
        const tasks = [...this.pendingTasks]
        this.pendingTasks.length = 0
        tasks.forEach(fn => fn())
    }

    private lineTo(startPoint: Point, endPoint: Point) {
        this.ctx?.beginPath()
        this.ctx?.moveTo(startPoint.x, startPoint.y)
        this.ctx?.lineTo(endPoint.x, endPoint.y)
        this.ctx?.stroke()
    }

    private drawLine(l: Line) {
        this.lineTo(l.startPoint, this.getEndPoint(l))
    }

    private getEndPoint(l: Line) {
        return {
            x: l.startPoint.x + l.length * Math.cos(l.angle),
            y: l.startPoint.y + l.length * Math.sin(l.angle)
        }
    }

    private setp(l: Line, depth = 0) {
        const endPoint = this.getEndPoint(l)
        this.drawLine(l)
        const leftLine: Line = {
            startPoint: endPoint,
            length: l.length + (Math.random() * 5 - 5),
            angle: l.angle - 0.4 * Math.random()
        }

        const rightLine: Line = {
            startPoint: endPoint,
            length: l.length + (Math.random() * 5 - 5),
            angle: l.angle + 0.4 * Math.random()
        }
        if (depth >= 11) return
        if (Math.random() < 0.4 || depth < 5) {
            this.pendingTasks.push(() => {
                this.setp(leftLine, depth + 1)
            })

        }
        if (Math.random() < 0.4 || depth < 5) {
            this.pendingTasks.push(() => {
                this.setp(rightLine, depth + 1)
            })
        }
    }
}

