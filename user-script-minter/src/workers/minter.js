import {Worker} from '../worker';
import {Globals} from '../globals';
import {LocationError, WorkerError} from '../exception';

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
        if (!mintButton) {
            if (!this.areResourcesValid) {
                // reload when button cannot automatically recover. Does not miss execution
                throw new LocationError('Snoob page needs to be refreshed');
            }
            throw new WorkerError('Mint button not found');
        }
        mintButton.click();
    }
    
    get areResourcesValid() {
        const rarestResource = Globals.resourceNames.map(key => {
            return {name: key, value: Globals.gameData.village[key]}; 
        }).reduce((min, resource) => {
            return resource.value < min.value ? resource : min;
        });
        return Globals.unsafeWindow.BuildingSnob.Modes.train.storage_item[rarestResource.name] > rarestResource.value;
    }
    
    selectAllCoins() {
        Globals.unsafeWindow.BuildingSnob.Modes.train.fillMaxMintable();
    }
    
    run() {
        this.validatePage();
        this.selectAllCoins();
        this.mintCoins();
        return true;
    }
}