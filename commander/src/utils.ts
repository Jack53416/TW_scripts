export namespace WorldConfig {
    declare let game_data: any;
    
    export let csrf = game_data.csrf;
    export let host = location.host;
    export let origin = location.origin;
    export let cookie = document.cookie;
    export let baseUrl = `${origin}/game.php`;

};

export namespace Utils {
    export enum RequestType {
        GET = "GET",
        POST = "POST"
    }

    export function serialize(obj: any): string {
        var str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    
    }

    export async function wait(milis: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, milis);
        });

    }

    export async function makeRequest(url: string, villageID: number = 0, type: RequestType = RequestType.GET, payload?: string) {
        return new Promise<string>((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = (event) => {
                if (xhr.readyState !== xhr.DONE)
                    return;
                if (xhr.status >= 200 && xhr.status <= 300)
                    resolve(xhr.responseText);
                else
                    reject(new Error(xhr.statusText));
            };

            xhr.open(<string>type, url, true);

            if (type == RequestType.POST)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

          //  xhr.setRequestHeader('Cookie', WorldConfig.cookie);
          //  xhr.setRequestHeader('host', WorldConfig.host);
          //  xhr.setRequestHeader('Referer', `${WorldConfig.baseUrl}?village=${villageID}&screen=map`);
            xhr.setRequestHeader('TribalWars-Ajax', '1');
            xhr.send(payload);
        });
    }
}