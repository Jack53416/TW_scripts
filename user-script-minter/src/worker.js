import {
    LocationError
} from './exception';

export const Pages = Object.freeze({
    CALL_RESOURCES: {
        screen: 'market',
        mode: 'call',
        params: {
            page: -1,
        }
    },
    MINT: {
        screen: 'snob',
        mode: null,
        params: {},
    },
    RECRUIT: {
        screen: 'barracks',
        mode: 'train',
        params: {},
    },
    BUILD: {
        screen: 'main',
        mode: null,
        params: {},
    }
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
    constructor(page) {
        this.page = page;
    }

    get location() {
        let result = `${this.gameData.link_base_pure}${this.page.screen}`;
        if (this.page.mode) {
            result += `&mode=${this.page.mode}`;
        }
        const params = Object.keys(this.page.params)
            .map(key => `${key}=${this.page.params[key]}`).join('&');
        result += `&${params}`;
        return result;
    }

    get isCaptchaPresent() {
        return false;
    }

    get pageValid() {
        return this.gameData.screen === this.page.screen &&
            this.gameData.mode === this.page.mode;
    }

    validatePage() {
        if (!this.pageValid) {
            throw new LocationError('Invalid Page');
        }
    }
    /**
     * Execution entry for a job. Should return boolean flag which states if 
     * execution is expected to refresh the page.
     * @return {boolean} true if successfull worker execution refreshes the page,
     *                   false otherwise. 
     */
    run() {
        throw new Error('Method \'run\' not implemented');
    }
}