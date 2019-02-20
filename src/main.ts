import { Order, OrderBuilder } from "./Order";
import { Utils } from './utils'
import { BatchOrderScheduler } from './Scheduler';

let scheduler = new BatchOrderScheduler();
scheduler.loadFromGuardResults();

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
(<any>window).scheduler = scheduler;

