import { Injectable } from "@angular/core";
import {environment}  from "../../environments/environment";

@Injectable(
    {providedIn: 'root'}
)

export class AppConfig {
    enviornment:string = environment.environment
    clientAddress:string = environment.clientAddress
    serverAddress:string = environment.serverAddress
}