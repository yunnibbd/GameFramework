import { _decorator, Component, Node } from 'cc';
import {Head, decodeHead, encodeHead} from "./Untitle";
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    start() {

        let client = new WebSocket("ws://127.0.0.1:9002");

        client.onopen = ()=>{
            this.schedule(()=>{
                let head:Head = {
                    begin: 1,
                    end: 2
                };
                client.send(encodeHead(head));
            }, 1);
        };

        client.onmessage = async(event)=>{
            let data = event.data;
            var reader = new FileReader();
            reader.readAsArrayBuffer(data);
            reader.onload = function (e) {
                var buf = new Uint8Array(reader.result as Uint8Array);
                let ret:Head = decodeHead(buf);
                console.log(`从服务端接收消息${ret.begin} === ${ret.end}`);
            }
        };
    }

    update(deltaTime: number) {
        
    }
}

