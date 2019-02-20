import { Order, OrderBuilder } from "./Order";
import { Utils } from './utils'

function getOrderQueue(): Array<Order> {
    let nodes = document.querySelectorAll("tbody#GuardResultList > tr > td[href]");
    let orders: Array<Order> = [];

    nodes.forEach((el) => {
        let link = el.getAttribute("href");
        if (link) {
            try {
                orders.push(Order.fromUrlenCoded(link.split("?")[1]));
            } catch (ex) {
                console.log(`Error parsing order: ${ex.message}`)
            }

        }
    });

    return orders;
}

async function scheduleOrders(orders: Array<Order>) {
    let promises = [];
    for (let [idx, order] of orders.entries()) {
        promises.push(order.prepare());
        console.log(`Preparing order ${idx} of ${orders.length}`);
        await Utils.wait(140);
    }

    await Promise.all(promises);
    promises = [];

    for (let [idx, order] of orders.entries()) {
        promises.push(order.excecute());
        console.log(`Excecuting order ${idx} of ${orders.length}`);
        await Utils.wait(140);
    }

    await Promise.all(promises);
}

let builder = new OrderBuilder();

let order = builder
    .attack()
    .village(42809, { x: 296, y: 526 })
    .from(46192)
    .with({
        axe: 200,
        light: 50,
        spy: 1
    })
    .build();

(<any>window).order = order;
(<any>window).getOrderQueue = getOrderQueue;
(<any>window).scheduleOrders = scheduleOrders;

