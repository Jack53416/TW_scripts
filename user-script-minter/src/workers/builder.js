import { Worker } from '../worker';

export class Builder extends Worker {
    constructor(builderPage, villageNameSelector) {
        super(builderPage);
        this.nameInputSelector = villageNameSelector;
    }
    
    run() {
        this.validatePage();
        const nameInput = document.querySelector(this.nameInputSelector);
        nameInput.value = 'auto';
    }
}