import {Worker} from '../worker';
import {WorkerError} from '../exception';

export class Caller extends Worker {
    constructor(marketPage, 
        toggleAllSelector = 'input[name=select-all]',
        submitSelector = 'form[name=call-resources] > input[type=submit]') {
        super(marketPage);
        this.toggleAllSelector = toggleAllSelector;
        this.submitSelector = submitSelector;
    }
    
    clickButton(selector, name) {
        const button = document.querySelector(selector);
        if(!button) {
            throw new WorkerError(`${name} button could not be found!`);
        }
        button.click();
    } 
    
    run() {
        this.validatePage();
        this.clickButton(this.toggleAllSelector, 'toggleAllVillages');
        this.clickButton(this.submitSelector, 'submitForm');
        location.reload();
    }
}