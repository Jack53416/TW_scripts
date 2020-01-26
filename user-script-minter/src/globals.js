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
}


Globals.TIMEOUT = 2000;
Globals.RESOURCE_DELAY = 15000;
Globals.MINT_DELAY = 7000;