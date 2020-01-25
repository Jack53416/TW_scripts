import {Scheduler} from './scheduler';
import {Minter} from './minter';
import {Caller} from './caller';
import {Screens} from './worker';

async function main() {
    const scheduler = new Scheduler();
    const minter = new Minter(
        {screen: Screens.MINTER, mode: ''},
        'button',
        'button',
    );
    
    const caller = new Caller(
        {screen: Screens.MARKET, mode: 'call'}
    );
    
    await scheduler.load();
    scheduler.addWorker('minter', minter, 5000);
    scheduler.addWorker('caller', caller, 16000);
    scheduler.run();
}

window.main = main;

main();