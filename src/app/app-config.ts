import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {

    public apiPort:string = "8080";
    public apiProtocol:string;
    public apiHostName:string;
    public baseApiPath:string;

    constructor(){
        if (this.apiProtocol===undefined){
            this.apiProtocol = window.location.protocol;
        }
        if (this.apiHostName===undefined){
            this.apiHostName = window.location.hostname;
        }
        if (this.apiPort===undefined){
            this.apiPort = window.location.port;
        }
        if (this.apiHostName.includes("billennium")){
            this.baseApiPath = this.apiProtocol + "//" + this.apiHostName + "/";
        }
        else{
            this.baseApiPath = this.apiProtocol + "//" + this.apiHostName + ":" + this.apiPort +"/";
        }

    }
}
