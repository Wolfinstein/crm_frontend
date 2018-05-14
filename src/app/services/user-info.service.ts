import { Injectable } from '@angular/core';

export interface UserInStorage{
    userId:string;
    email:string;
    displayName:string;
    token:string;
    role:string;
}

export interface LoginInfoInStorage{
    success:boolean;
    message:string;
    landingPage:string;
    user?:UserInStorage;
}

@Injectable()
export class UserInfoService {

    public currentUserKey:string="currentUser";
    public storage:Storage = sessionStorage;

    constructor() {}

    storeUserInfo(userInfoString:string) {
        this.storage.setItem(this.currentUserKey, userInfoString);
    }

    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
    }

    getUserInfo():UserInStorage|null {
        try{
            let userInfoString:string = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {

              return JSON.parse(this.storage.getItem(this.currentUserKey));
            }
            else{
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }

    isLoggedIn():boolean{
        return !!this.storage.getItem(this.currentUserKey);
    }

    getUserName():string{
        let userObj:UserInStorage = this.getUserInfo();
        if (userObj!== null){
            return userObj.displayName
        }
        return "no-user";
    }

    getStoredToken():string|null {
        let userObj:UserInStorage = this.getUserInfo();
        if (userObj !== null){
            return userObj.token;
        }
        return null;
    }
}
