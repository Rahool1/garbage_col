import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    
    user = "Menu"
    constructor() {
        this.user = JSON.parse(localStorage.getItem("user"));
    }

    ngOnInit() {}
}
