import { Worker } from '../worker';
import {Globals} from '../globals';

export class Recruiter extends Worker {
    constructor(recruitPage) {
        super(recruitPage);
    }
    
    recruitUnits(unitName){
        Globals.unsafeWindow.unit_build_block.set_max(unitName);
    }
    
    run() {
        this.validatePage();
        this.recruitUnits('spear');
    }
}