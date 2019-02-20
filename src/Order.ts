﻿import { Utils, WorldConfig } from "./utils";
import { IUnits, Unitdefaults } from "./Unit";
import { Village, Position2D } from './Village';

enum OrderType {
    Help = "support",
    Attack = "attack"
}

enum OrderStatus {
    UNPREPARED,
    READY,
    EXCECUTED,
    EXPIRED
}

export class Order {

    source: Village = new Village(0, { x: 0, y: 0 });
    target: Village = new Village(0, { x: 0, y: 0 });
    units: IUnits = {};
    type: OrderType = OrderType.Attack;
    building: string =  "farm";
    private _status: OrderStatus = OrderStatus.UNPREPARED;
    private _ch: string = "";

    get status() {
        return this._status;
    }

    static fromUrlenCoded(url: string, type?: OrderType): Order {
        let queryString = new URLSearchParams(url);
        let newOrder = new OrderBuilder();

        let srcVillageId = queryString.get("village");
        let targetX = queryString.get("x");
        let targetY = queryString.get("y");

        if (!srcVillageId || !targetX || !targetY)
            throw new Error(`Could not parse and order from: ${url}`);

        let units: any = {};

        for (let key in Unitdefaults) {
            let val = queryString.get(key);
            if (val) {
                units[key] = parseInt(val);
            }
        }

        return newOrder.help()
            .from(parseInt(srcVillageId))
            .village(0, { x: parseInt(targetX), y: parseInt(targetY) })
            .with(<IUnits>units).build();
    }

    get ulrSerialized(): string {
        let queryString = new URLSearchParams();
        if (this.status == OrderStatus.UNPREPARED)
            queryString.append("37b2629a3410b85aa834b7", "60735c2637b262");
        

        if (this.status == OrderStatus.READY)
            queryString.append("ch", this._ch.toString());

        queryString.append(this.type.toString(), "true");
        queryString.append("x", this.target.pos.x.toString());
        queryString.append("y", this.target.pos.y.toString());
        queryString.append("source_village", this.source.id.toString());
        queryString.append("building", this.building);

        return queryString.toString() + "&" + Utils.serialize(this.units);
    }

    get url(): string {
        let ajaxName = this.status == OrderStatus.READY ? "ajaxaction" : "ajax";
        let ajaxVal = this.status == OrderStatus.READY ? "popup_command" : "confirm";
        return `${WorldConfig.baseUrl}?${ajaxName}=${ajaxVal}&client_time=${Math.trunc(Date.now() / 1000)}&h=${WorldConfig.csrf}&screen=place&village=${this.source.id}`;
    }

    async prepare(): Promise<boolean> {
        let responseText: string = await Utils.makeRequest(this.url, this.source.id, Utils.RequestType.POST, this.ulrSerialized); // what if there is an error in http request ?
        let re = /name=\\"ch\\" value=\\"([a-zA-Z0-9:]+)\\"/;
        let match = re.exec(responseText);

        return new Promise<boolean>((resolve, reject) => {
            if (!match)
                return reject(false);
            this._ch = match[1];
            this._status = OrderStatus.READY;
            resolve(true);
        });
    }

    async excecute(): Promise<string> {
        let responseText: string = await Utils.makeRequest(this.url, this.source.id, Utils.RequestType.POST, this.ulrSerialized);

        return new Promise<string>(resolve => {
            this._status = OrderStatus.EXCECUTED;
            resolve(responseText);
        });

    }
}

export interface IOrderBuilder{
    with(units: IUnits): IOrderBuilder;
    village(id: number, position: Position2D): IOrderBuilder;
    from(id: number, position?: Position2D): IOrderBuilder;
    attack(): IOrderBuilder;
    help(): IOrderBuilder;
    build(): Order;
}

export class OrderBuilder implements IOrderBuilder {

    private order: Order;

    constructor() {
        this.order = new Order();
    }

    with(units: IUnits): IOrderBuilder {
        this.order.units = { ...Unitdefaults, ...units };
        this.order.units = this.order.units;
        return this;
    }

    village(id: number, position: Position2D): IOrderBuilder {
        this.order.target = new Village(id, position);
        return this;
    }
    from(id: number, position?: Position2D | undefined): IOrderBuilder {
        let pos = position ? position : { x: 0, y: 0 };
        this.order.source = new Village(id, pos);
        return this;
    }

    attack(): IOrderBuilder {
        this.order.type = OrderType.Attack;
        return this;
    }
    help(): IOrderBuilder {
        this.order.type = OrderType.Help;
        return this;
    }

    build(): Order {
        return this.order;
    }
}
