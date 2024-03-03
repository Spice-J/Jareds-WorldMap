import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { error } from 'console';
import { ApiService } from '../api.service';
import { emit } from 'process';



@Component({
    selector: 'app-world-map',
    standalone: true,
    imports: [],
    templateUrl: './world-map.component.html',
    styleUrl: './world-map.component.css'
})

export class SvgMap implements OnInit {
    @ViewChild('svgContainer', { static: true }) 
    svgContainer!: ElementRef;
    svgContent!: SafeHtml;
    selectedCountryData: any = null;
    @Output() clickedCountry = new EventEmitter();

    constructor(private http: HttpClient, private apiService: ApiService, private sanitizer: DomSanitizer, private renderer: Renderer2) {};

    //Triggers loadSvg method
    ngOnInit(): void {
        this.loadSvg();
    }

    ngAfterViewInit(): void {
        this.addHoverEffect();
      }

    //Method gets world-map.svg, makes safe to render with sanitizer. Assigns to property svgContent.
    loadSvg(): void {
        this.http.get('./assets/world-map.svg', { responseType: 'text' }).subscribe((svg: string) => {
            this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        })
    }

    addHoverEffect(): void {
        const svgElement: SVGElement | null = this.svgContainer.nativeElement.querySelector('svg');
        
        if(svgElement) {
            const paths = svgElement.querySelectorAll('path');

            const pathsArray = Array.from(paths);

            pathsArray.forEach(path => {
                path.addEventListener('mouseenter', this.onMouseEnter);
                path.addEventListener('mouseleave', this.onMouseLeave);
            })
        }
    }

    onMouseEnter(event: MouseEvent): void {
        const hoverElement = event.target as SVGElement;
        hoverElement.style.fill = '#CC5500';
    }

    onMouseLeave(event: MouseEvent): void {
        const hoverElement = event.target as SVGElement;
        hoverElement.style.fill = '#000000';
    }

    //Click event handler sets clickedElement to DOM target event and sets contryCode to the clickedElemnts id attribute.
    onCountryClick(event: MouseEvent): void {
        const clickedElement = event.target as SVGElement;
        const clickedCountryId = clickedElement.getAttribute('id');

        if(clickedCountryId) {

            this.apiService.getWorldBankApiData(clickedCountryId).subscribe({
                next: (data: any) => {
                    this.selectedCountryData = data
                    this.clickedCountry.emit(data);
                    console.log("API Response: ", data);
                },
                error: (error) => {
                    console.error('Error fetching data from WorldBank API', error);
                }
        });
            
        } else {
            alert(`You're lost at sea! Please make your way to land.`)
        }
        
    }

}