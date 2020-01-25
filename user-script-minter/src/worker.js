import {
    Globals
} from './globals';

export const Screens = Object.freeze({
    MARKET: 'market',
    MINTER: 'noble',
});

export const Modes = Object.freeze({
    CALL: 'call',
});

export class Worker {
    /**
     * [constructor description]
     * @param {object} page             Page configuration object
     * @param {string} page.screen      Name of a page screen ex. main, market
     * @param {string} page.mode        Name of the specific page mode, ex call, trade etc
     * @param {object} [gameData=Globals.gameData] game_data object from tribal war interface
     * @param {string} gameData.screen
     * @param {string} gameData.mode
     * @param {string} gameData.link_base_pure
     */
    constructor(page, gameData = Globals.gameData) {
        this.page = page;
        this.gameData = gameData;
    }
    
    get location() {
        // return `${this.gameData.link_base_pure}${this.page.screen}&mode=${this.page.mode}`;
        return `${this.gameData.link_base_pure}${this.page.screen}.html`;
    }
    
    get isCaptchaPresent() {
        return false;
    }
    
    get pageValid() {
        return this.gameData.screen === this.page.screen && 
               this.gameData.mode === this.page.mode;
    }
    
    run() {
        throw new Error('Method \'run\' not implemented');
    }
}