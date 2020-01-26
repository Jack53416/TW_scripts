import {Worker} from '../worker';
import {Globals} from '../globals';

export class Minter extends Worker {
    /**
     * Creates Minter object instance
     * @param {string} mintSelector querySelector for a mint button
     * @param {string} coinSelector querySelector fot 'select all coins' button
     */
    constructor(mintPage, mintSelector='a#coin_mint_fill_max + input[type=submit]') {
        super(mintPage);
        this.mintSelector = mintSelector;
    }
    
    mintCoins() {
        const mintButton = document.querySelector(this.mintSelector);
        mintButton.click();
    }
    
    selectAllCoins() {
        Globals.unsafeWindow.BuildingSnob.Modes.train.fillMaxMintable();
    }
    
    run() {
        this.validatePage();
        this.selectAllCoins();
        this.mintCoins();
    }
}