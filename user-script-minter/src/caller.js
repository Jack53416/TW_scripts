import { Worker } from './worker';

export class Caller extends Worker {
    constructor(marketPage) {
        super(marketPage);
    }
    
    callResources() {
        console.log('Resource called');
    }
    
    run() {
        this.validatePage();
        this.callResources();
    }
}