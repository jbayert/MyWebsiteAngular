import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
//TODO:remove
@Injectable()
export class GetDomainService {

    constructor(
        private router: Router,
        private location: Location,
    ) {
    }

    getHostname() : string {
        console.log(window.location);
        return window.location.origin;
    }
}