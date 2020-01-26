import { Worker } from '../worker';

export class Caller extends Worker {
    constructor(marketPage, 
        toggleAllSelector = 'input[name=select-all]',
        submitSelector = 'form[name=call-resources] > input[type=submit]') {
        super(marketPage);
        this.toggleAllSelector = toggleAllSelector;
        this.submitSelector = submitSelector;
    }
    
    selectAllVillages() {
        const button = document.querySelector(this.toggleAllSelector);
        button.click();
    }
    
    submitForm() {
        const button = document.querySelector(this.submitSelector);
        button.click();
    }
    
    run() {
        this.validatePage();
        this.selectAllVillages();
        this.submitForm();
        location.reload();
    }
}