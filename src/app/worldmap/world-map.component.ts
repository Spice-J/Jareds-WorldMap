import { Component, OnInit, Output } from '@angular/core';



@Component({
    selector: 'app-world-map',
    standalone: true,
    imports: [],
    templateUrl: './world-map.component.svg',
    styleUrl: './world-map.component.css'
})
export class SvgMap {
    countryData: any = null;

}