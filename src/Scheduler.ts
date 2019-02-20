import { Order, OrderStatus } from "./Order";
import { Utils } from "./utils";

export abstract class OrderScheduler {
    protected scheduled: Array<Order> = [];
    protected completed: Array<Order> = [];
    protected failed: Array<Order> = [];

    schedule(order: Order): void {
        order.onStatusChange = (id) => {
            let idx = this.scheduled.findIndex((or) => or.id == id);
            if (idx >= 0) {
                let completedOrder = <Order>this.scheduled[idx];
                if (completedOrder.status == OrderStatus.EXCECUTED) {
                    this.completed.push(completedOrder);
                }

                else if (completedOrder.status == OrderStatus.ERROR) {
                    this.failed.push(completedOrder);
                }
                   
            }
        };
        this.scheduled.push(order);
    }
}

export class BatchOrderScheduler extends OrderScheduler {
    readonly workInterval: number = 140; //ms

    constructor() {
        super();
    }

    private async prepare() {
        let promises = [];
        for (let [idx, order] of this.scheduled.entries()) {
            promises.push(order.prepare());
            console.log(`Preparing order ${idx} of ${this.scheduled.length}`);
            await Utils.wait(this.workInterval);
        }

        // Some other approach instead of callback
        const results = await Promise.all(promises.map(p => p.catch(e => e)));
        const errResults = results.filter((res) => res instanceof Error);
        if (errResults.length > 0) {
           // this.failed.push(...errResults)
        }
    }

    private async excecute() {
        let promises = [];
        for (let [idx, order] of this.scheduled.entries()) {
            promises.push(order.excecute());
            console.log(`Excecuting order ${idx} of ${this.scheduled.length}`);
            await Utils.wait(this.workInterval);
        }
        return Promise.all(promises);
    }

    async run() {
        await this.prepare();
        this.scheduled = this.scheduled.filter((el) => el.status == OrderStatus.READY);
        await this.excecute();
    }

    loadFromGuardResults(): void {
        let nodes = document.querySelectorAll("tbody#GuardResultList > tr > td[href]");
        nodes.forEach((el) => {
            let link = el.getAttribute("href");
            if (link) {
                try {
                    this.schedule(Order.fromUrlenCoded(link.split("?")[1]));
                } catch (ex) {
                    console.log(`Error parsing order: ${ex.message}`)
                }
            }
        });
    }
}

