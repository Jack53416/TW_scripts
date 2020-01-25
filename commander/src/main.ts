import { Order, OrderBuilder } from "./Order";
import { Utils } from './utils'
import { BatchOrderScheduler } from './Scheduler';
import { GUI } from './gui';

let scheduler = new BatchOrderScheduler();
let guard: HTMLDivElement = document.querySelector("div#HermitianGuard") as HTMLDivElement;
scheduler.loadFromGuardResults();
guard.innerHTML += GUI.progressBar();

let bar: HTMLProgressElement = document.querySelector("status > progress") as HTMLProgressElement;
bar.max = scheduler.taskCost;

scheduler.onProgress = function<number>(value) => {
    bar.value = value;
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
(<any>window).scheduler = scheduler;

