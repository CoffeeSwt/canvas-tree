export interface Point {
    x: number,
    y: number
}

export interface Line {
    startPoint: Point,
    length: number,
    angle: number
}

export interface treeConfig {
    offset?: number //树枝左右偏移量 弧度
    renderRate?: number //渲染速率，多少帧渲染一次
    lengthOffset?: number //长度差异值
    maxDepth?: number //最大层级
    minDepth?: number //最小层级
    chance?: number //左右枝生成概率 0~1取值，越大生成概率越高
}

export class CanvasTree {
    el: HTMLCanvasElement | null
    private ctx: CanvasRenderingContext2D | null
    private renderCount: number
    private pendingTasks: Function[] = []
    config: treeConfig
    constructor(
        el: HTMLCanvasElement,
        startLine: Line = {
            startPoint: { x: el.width / 2, y: el.height },
            length: 50,
            angle: - Math.PI / 2
        },
        config: treeConfig = {
            offset: 0.4,
            renderRate: 3,
            lengthOffset: 10,
            maxDepth: 11,
            minDepth: 5,
            chance: 0.4,
        }) {
        this.el = el
        this.ctx = el.getContext('2d')
        this.config = config
        this.pendingTasks = []
        this.renderCount = 0

        //构建树
        this.setp(startLine)
    }

    //渲染树
    render() {
        requestAnimationFrame(() => {
            if (this.renderCount % this.config.renderRate! == 0)
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
            length: l.length + (Math.random() * this.config.lengthOffset! - this.config.lengthOffset!),
            angle: l.angle - this.config.offset! * Math.random()
        }

        const rightLine: Line = {
            startPoint: endPoint,
            length: l.length + (Math.random() * this.config.lengthOffset! - this.config.lengthOffset!),
            angle: l.angle + this.config.offset! * Math.random()
        }
        if (depth >= this.config.maxDepth!) return
        if (Math.random() < this.config.chance! || depth < this.config.minDepth!) {
            this.pendingTasks.push(() => {
                this.setp(leftLine, depth + 1)
            })
        }
        if (Math.random() < this.config.chance! || depth < this.config.minDepth!) {
            this.pendingTasks.push(() => {
                this.setp(rightLine, depth + 1)
            })
        }
    }
}

