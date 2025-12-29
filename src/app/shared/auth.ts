import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class Auth {

   getLocalStroage(key:string){
    if (typeof window !== 'undefined') {
       return localStorage.getItem(key)
    }
    return null
   }
}