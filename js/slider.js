"use strict";

import replaceHtmlPatternValues from "./RegularMethod.js";

export default class Slider {
    constructor(id, dataSlides, htmlSlide, htmlPagIndex, speed) {
        this.id = id;
        this.dataSlides = dataSlides;
        this.htmlSlide = htmlSlide;
        this.htmlPagIndex = htmlPagIndex;
        this.speed = speed;
        this.slidesLength = this.dataSlides.length - 1;
        this.slideCurrent = 0;
        this.isMove = false;
        this.replaceHtmlPatternValues = replaceHtmlPatternValues;

        this.slider = document.getElementById(`${this.id}Slider`);
        this.slides = document.getElementById(`${this.id}Slides`);
        this.left = document.getElementById(`${this.id}Left`);
        this.right = document.getElementById(`${this.id}Right`);
        this.pagIndex = document.getElementById(`${this.id}Index`);
        
        this.left.addEventListener("click", e => this.moveLeft(e));
        this.right.addEventListener("click", e => this.moveRight(e));
        this.pagIndex.addEventListener("click", e => this.moveIndex(e));

        this.render();
    }

    shift(shiftCount) {
        const newSlideList = this.dataSlides;
    
        if (shiftCount < 0) {
            for (let index = 0; index < -shiftCount; index++) {
                const lastSlide = newSlideList.pop();
                newSlideList.unshift(lastSlide);
            }
        } else {
            for (let index = 0; index < shiftCount; index++) {
                const firstSlide = newSlideList.shift();
                newSlideList.push(firstSlide);
            }   
        }
        
        this.dataSlides = newSlideList;
    }
    
    createPag() {
        const pag = [];

        for (let index = 0; index <= this.slidesLength; index++) {
            const objectPag = {index: index, active: ""};

            if (index == this.slideCurrent) {     
                objectPag.active = "active";
            }

            pag.push(this.replaceHtmlPatternValues(objectPag, this.htmlPagIndex));
        }

        this.pagIndex.innerHTML = pag.join("");   
    }

    createSlides() {
        const slides = [];
        const copySlides = [];

        for (const dataSlide of this.dataSlides) {
            slides.push(this.replaceHtmlPatternValues(dataSlide, this.htmlSlide));
        }

        Object.assign(copySlides, slides);

        copySlides.push(slides.at(0));   
        copySlides.push(slides.at(1));  
        copySlides.unshift(slides.at(-1));
        copySlides.unshift(slides.at(-2)); 

        this.slides.innerHTML = copySlides.slice(0, 5).join("");
        this.slides.children[2].classList.add("current");  
    }
    
    render() {  
        this.createSlides();
        this.createPag();
    }

    animate(direction) {
        return new Promise((resolve, reject) => {
            let linkSlideCurrent = this.slides.querySelector(".current");
            const slidesGap = parseInt(getComputedStyle(this.slides).getPropertyValue("gap"));
            const slideWidth = linkSlideCurrent.offsetWidth;
        
            const shift = -direction * (slideWidth + slidesGap);
            
            this.slides.setAttribute("style", `--speed: ${this.speed}ms; --shift: ${shift}px`);
            setTimeout(() => {
                this.slides.setAttribute("style", `--speed: 0s; --shift: 0px`); 
                resolve();
            }, this.speed);
        })        
    }
    
    swipeSlide(shiftIndex) {
        this.isMove = true;
        const direction = shiftIndex > 0 ? 1 : -1;
        const mathSlideCurrent = this.slideCurrent+direction;
        
        if (mathSlideCurrent > this.slidesLength) {
            this.slideCurrent = 0;    
        } else if (mathSlideCurrent < 0) {
            this.slideCurrent = this.slidesLength;         
        } else {
            this.slideCurrent = mathSlideCurrent;  
        }

        this.shift(direction);
        const animate = this.animate(direction);
        animate
        .then(() => {
            this.render();
            if (Math.abs(shiftIndex)-1 > 0) {
                this.swipeSlide(direction * (Math.abs(shiftIndex)-1));
            } else {
                this.isMove = false;
        }})
    }

    moveLeft(e) {  
        if (this.isMove) {
            return 0;
        }

        this.swipeSlide(-1);
    }

    moveRight(e) {
        if (this.isMove) {
            return 0;
        }

        this.swipeSlide(1);
    }

    moveIndex(e) {
        const pagElement = e.target.closest("[index]") || false;

        if (!pagElement || pagElement.getAttribute("index") == this.slideCurrent || this.isMove) {
            return 0;
        }
        
        const index = pagElement.getAttribute("index");
        this.swipeSlide(index - this.slideCurrent);
    }
}
