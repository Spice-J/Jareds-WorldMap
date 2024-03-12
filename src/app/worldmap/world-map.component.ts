import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { error } from 'console';
import { ApiService } from '../api.service';
import { emit } from 'process';
import { NgIf } from '@angular/common';



@Component({
    selector: 'app-world-map',
    standalone: true,
    imports: [NgIf],
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
        this.changeBorderColor();
      }

    //Method gets world-map.svg, makes safe to render with sanitizer. Assigns to property svgContent.
    loadSvg(): void {
        this.http.get('./assets/world-map.svg', { responseType: 'text' }).subscribe((svg: string) => {
            this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        })
    }

    //Method attaches mouseenter and mouseleave events to svg paths
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

    //changes hovered country fill and changes cursor to pointer
    onMouseEnter(event: MouseEvent): void {
        const hoverElement = event.target as SVGElement;
        hoverElement.style.fill = '#a26413';
        hoverElement.style.cursor = 'pointer';
    }

    //reverts country fill color on mouseleave
    onMouseLeave(event: MouseEvent): void {
        const hoverElement = event.target as SVGElement;
        hoverElement.style.fill = '#000000';
    }

    //Method to change border color for all paths in svg
    changeBorderColor(): void {
        const svgElement: SVGElement = this.svgContainer.nativeElement;
        const countryPaths = svgElement.querySelectorAll('path');
        const countryPathsArray = Array.from(countryPaths)

        countryPathsArray.forEach((path) => {
            path.setAttribute('stroke', '#2f4f4f')
        })
    }

    //Click event handler sets clickedElement to DOM target event and sets contryCode to the clickedElemnts id attribute.
    onCountryClick(event: MouseEvent): void {
        const clickedElement = event.target as SVGElement;
        const clickedCountryId = clickedElement.getAttribute('id');

        if(clickedCountryId) {

            this.apiService.getWorldBankApiData(clickedCountryId).subscribe({
                next: (data: any) => {
                    this.selectedCountryData = data
                    this.clickedCountry.emit(this.selectedCountryData);
                    console.log("API Response: ", this.clickedCountry);
                },
                error: (error) => {
                    console.error('Error fetching data from WorldBank API', error);
                }
        });
            
        } else {
            alert(`You're lost at sea! Please click on land to learn more.`)
        }
        
    }

}