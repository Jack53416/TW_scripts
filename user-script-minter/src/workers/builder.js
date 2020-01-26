import { Worker } from '../worker';

export class Builder extends Worker {
    constructor(builderPage, villageNameSelector) {
        super(builderPage);
        this.nameInput = document.querySelector(villageNameSelector);
    }
    
    run() {
        this.validatePage();
        this.nameInput.value = 'auto';
    }
}