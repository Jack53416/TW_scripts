import {Worker} from '../worker';

export class Minter extends Worker {
    /**
     * Creates Minter object instance
     * @param {string} mintSelector querySelector for a mint button
     * @param {string} coinSelector querySelector fot 'select all coins' button
     */
    constructor(mintPage, mintSelector, coinSelector) {
        super(mintPage);
        this.mintSelector = mintSelector;
        this.coinSelector = coinSelector;
    }
    
    mintCoins() {
        const mintButton = document.querySelector(this.mintSelector);
        mintButton.click();
    }
    
    selectAllCoins() {
        const coinButton = document.querySelector(this.coinSelector);
        coinButton.click();
    }
    
    run() {
        this.validatePage();
        this.mintCoins();
        
        //this.selectAllCoins();
        
    }
}