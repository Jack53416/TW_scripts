import {Scheduler} from './scheduler';
import {Minter} from './workers/minter';
import {Caller} from './workers/caller';
import {Pages} from './worker';

async function main() {
    const scheduler = new Scheduler();
    const minter = new Minter(
        Pages.MINT,
        'button',
        'button',
    );
    
    const caller = new Caller(
        Pages.CALL_RESOURCES,
    );
    
    await scheduler.load();
    scheduler.addWorker('minter', minter, 5000);
    scheduler.addWorker('caller', caller, 16000);
    scheduler.run();
}

window.main = main;

main();