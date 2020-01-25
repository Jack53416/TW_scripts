//const unsafeWindow = window;

export class Globals {
    static get unsafeWindow() {
        // eslint-disable-next-line no-undef
        return unsafeWindow;
    }
    
    static get gameData() {
        return this.unsafeWindow.game_data;
    }
    
    static sleep(milis) {
        return new Promise((resolve) => setTimeout(resolve, milis));
    }
    
    static get resourceNames() {
        return ['wood', 'stone', 'iron'];
    }
}


Globals.TIMEOUT = 150;
Globals.RESOURCE_DELAY = 15 * 60 * 1000;
Globals.MINT_DELAY = 10000;