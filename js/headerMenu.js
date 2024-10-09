"use strict";

import replaceHtmlPatternValues from "./RegularMethod.js";

export default class HeaderMenu {
    constructor(id, headerList, htmlLinkHeader) {
        this.id = id;
        this.headerList = headerList;
        this.htmlLinkHeader = htmlLinkHeader;
        this.replaceHtmlPatternValues = replaceHtmlPatternValues;
        this.isShow = false;

        this.header = document.getElementById(this.id);
        this.listItem = document.getElementById(`${this.id}SideList`);
        this.sideButton = document.getElementById(`${this.id}SideButton`);  

        this.createHeader();    
        
        this.sideButton.addEventListener("click", e => this.show(e)); 
    }

    createHeader() {
        const headerListItem = [];

        for (const listItem of this.headerList) {
            headerListItem.push(this.replaceHtmlPatternValues(listItem, this.htmlLinkHeader));
            
        }
        
        let blackBlur = document.createElement("div");
        blackBlur.className = "header__black-blur";
        blackBlur.addEventListener("click", e=> this.hidden(e));
        this.header.append(blackBlur);

        this.listItem.innerHTML = headerListItem.join("");
    }

    show(e) {
        if (this.isShow) {
            this.isShow = false;
            this.header.classList.remove("header--active");
        } else {
            this.isShow = true;
            this.header.classList.add("header--active");
        }
    }

    hidden(e) {
        this.show(e);
    }
}