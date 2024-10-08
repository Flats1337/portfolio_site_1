"use strict";

import replaceHtmlPatternValues from "./RegularMethod.js";

export default class HeaderMenu {
    constructor(id, headerList, htmlLinkHeader) {
        this.id = id;
        this.headerList = headerList;
        this.htmlLinkHeader = htmlLinkHeader;
        this.replaceHtmlPatternValues = replaceHtmlPatternValues;

        this.elementListItem = document.getElementById(`${this.id}SideList`);
        this.menuSideButton = document.getElementById(`${this.id}SideButton`);  

        this.createHeader();    
        
        this.menuSideButton.addEventListener("click", e => this.show(e)); 
    }

    createHeader() {
        const headerListItem = [];

        for (const listItem of this.headerList) {
            headerListItem.push(this.replaceHtmlPatternValues(listItem, this.htmlLinkHeader));
            
        }

        this.elementListItem.innerHTML = headerListItem.join("");
    }

    show() {
        this.elementListItem.setAttribute("style", "display: flex");      
    }
}