//const unsafeWindow = window;

export class Globals {
    static get unsafeWindow() {
        // eslint-disable-next-line no-undef
        return unsafeWindow;
    }
    
    static get gameData() {
        return this.unsafeWindow.game_data;
    }
}