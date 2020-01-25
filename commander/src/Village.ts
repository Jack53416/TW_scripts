export interface Position2D {
    readonly x: number;
    readonly y: number;
}

export class Village {
    pos: Position2D;
    readonly id: number;

    constructor(id: number, position: Position2D) {
        this.id = id;
        this.pos = position;
    }

}