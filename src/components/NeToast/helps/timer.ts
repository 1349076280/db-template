// https://stackoverflow.com/a/3969760
export default class Timer {
    timer: NodeJS.Timeout
    callback: Function
    startedAt: number
    delay: number

    constructor(callback: Function, delay: number) {
        this.startedAt = Date.now()
        this.callback = callback
        this.delay = delay

        this.timer = setTimeout(() => {
            callback()
        }, delay)
    }

    pause() {
        this.stop()
        this.delay -= Date.now() - this.startedAt
    }

    resume() {
        this.stop()
        this.startedAt = Date.now()

        this.timer = setTimeout(() => {
            this.callback()
        }, this.delay)
    }

    stop() {
        clearTimeout(this.timer)
    }
}
