import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
    selector: 'app-world-map',
    standalone: true,
    imports: [],
    templateUrl: './world-map.component.html',
    styleUrl: './world-map.component.css'
})
export class SvgMap implements OnInit {
    @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef;
    svgContent!: SafeHtml;
    @Output() countrySelected = new EventEmitter();

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {};

    ngOnInit(): void {
        this.loadSvg();
    }

    loadSvg(): void {
        this.http.get('./assets/world-map.svg', { responseType: 'text' }).subscribe((svg: string) => {
            this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        })
    }

    onCountryClick(event: MouseEvent): void {
        const clickedElement = event.target as SVGElement;
        const countryCode = clickedElement.getAttribute('id');

        console.log(countryCode)
    }

}