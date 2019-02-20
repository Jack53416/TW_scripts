import { Order, OrderStatus } from "./Order";
import { Utils } from "./utils";

abstract class OrderScheduler {
    protected scheduled: Array<Order> = [];
    protected completed: Array<Order> = [];
    protected failed: Array<Order> = [];

    schedule(order: Order): void {
        order.onStatusChange = (id) => {
            let idx = this.scheduled.findIndex((or) => or.id == id);
            if (idx >= 0) {
                let completedOrder = <Order>this.scheduled.splice(idx, 1).pop();
                if (completedOrder.status == OrderStatus.EXCECUTED)
                    this.completed.push(completedOrder);
                else if (completedOrder.status == OrderStatus.ERROR)
                    this.failed.push(completedOrder);
            }
        };
        this.scheduled.push(order);
    }
}

class BatchOrderScheduler extends OrderScheduler {
    readonly workInterval: number = 140;

    constructor() {
        super();
    }

    private async prepare(): Promise<boolean[]> {
        let promises = [];
        for (let [idx, order] of this.scheduled.entries()) {
            promises.push(order.prepare());
            console.log(`Preparing order ${idx} of ${this.scheduled.length}`);
            await Utils.wait(this.workInterval);
        }
        return Promise.all(promises);
    }

    private async excecute(): Promise<string[]> {
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

