import {Scheduler} from './scheduler';
import {Minter} from './workers/minter';
import {Caller} from './workers/caller';
import {Pages} from './worker';
import {Globals} from './globals';

async function main() {
    const scheduler = new Scheduler();
    const minter = new Minter(
        Pages.MINT,
    );
    
    const caller = new Caller(
        Pages.CALL_RESOURCES,
    );
    
    await scheduler.load();
    scheduler.addWorker('minter', minter, Globals.MINT_DELAY);
    scheduler.addWorker('caller', caller, Globals.RESOURCE_DELAY);
    
    scheduler.run();
}

window.main = main;

main();