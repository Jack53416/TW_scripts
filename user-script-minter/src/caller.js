import { Worker } from './worker';

export class Caller extends Worker {
    constructor(marketPage) {
        super(marketPage);
    }
    
    callResources() {
        console.log('Resource called');
    }
    
    run() {
        if(!this.pageValid){
            throw new Error('Invalid Page');
        }
        this.callResources();
    }
}