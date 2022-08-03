interface Queue {
 [key: string]: Function[]
}
class Event {
    queue: Queue
    constructor() {
        this.queue = {}
    }

    $on(name: string, callback: Function) {
        this.queue[name] = this.queue[name] || []
        this.queue[name].push(callback)
    }

    $off(name: string, callback: Function) {
        if (this.queue[name]) {
            for (let i = 0; i < this.queue[name].length; i++) {
                if (this.queue[name][i] === callback) {
                    this.queue[name].splice(i, 1)
                    break
                }
            }
        }
    }

    $emit(name: string, data: Function) {
        if (this.queue[name]) {
            this.queue[name].forEach(function (callback) {
                callback(data)
            })
        }
    }
}

export default new Event()
