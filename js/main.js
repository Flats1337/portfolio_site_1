"use strict";

import Slider from "./slider.js";
import HeaderMenu from "./headerMenu.js";

function main() {
    const idSlider = "testimonials";
    const data = [{
        slideContent: `"1We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."`,
        subtitle: "John Smith",
        paragraph: "Marketing Director at XYZ Corp"
    }, {
        slideContent: `"2We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."`,
        subtitle: "John Smith",
        paragraph: "Marketing Director at XYZ Corp"
    }, {
        slideContent: `"3We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."`,
        subtitle: "John Smith",
        paragraph: "Marketing Director at XYZ Corp"
    }];
    const htmlSlide = `
    <div class="testimonials__slide">
        <div class="testimonials__comment">
            <p class="testimonials__slide-p font-p">^{slideContent}^</p>
        </div>     
        <div class="testimonials__people">
            <h4 class="font-h4">^{subtitle}^</h4>
            <p class="font-p">^{paragraph}^</p>
        </div>
    </div>`;
    const htmlPagIndex = `
    <button type="button" index="^{index}^" class="testimonials__index ^{active}^">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.0099 2.05941L14 0L11.9604 7.0099L14 14L7.0099 11.9604L0 14L2.05941 7.0099L0 0L7.0099 2.05941Z" fill=""/>
        </svg>
    </button>`;
    const speed = 400;

    new Slider(idSlider, data, htmlSlide, htmlPagIndex, speed);

    const idHeader = "headerMenu";
    const headerList = [{
        title: "About us",
        link: ""
    }, {
        title: "Services",
        link: ""
    }, {
        title: "Use Cases",
        link: ""
    }, {
        title: "Pricing",
        link: ""
    }, {
        title: "Blog",
        link: ""
    }, {
        title: "Request a quote",
        link: ""
    }];
    const htmlLinkHeader = `<li class="menu-list__item"><a class="menu-list__link" href="^{link}^">^{title}^</a></li>`;

    new HeaderMenu(idHeader, headerList, htmlLinkHeader);
}

document.addEventListener("DOMContentLoaded", main);