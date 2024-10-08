"use strict";

function readRegularStr(regularStr) {
    const varsFound = regularStr.matchAll(/\^{(.*?)}\^/g);
    const varsList = [];

    for (const varFound of varsFound) {
        varsList.push(varFound.at(1));
    }

    return varsList;
}

function writeRegularStr(varSearch, varReplace, srtReplace) {
    return srtReplace.replace(`^{${varSearch}}^`, varReplace);
}

export default function replaceHtmlPatternValues(valuesList={}, htmlPattern="") {
    const values = readRegularStr(htmlPattern);
    let resultHtml = htmlPattern;

    for (const valueSearch of values) {
        resultHtml = writeRegularStr(valueSearch, valuesList[valueSearch], resultHtml);
    }  

    return resultHtml;
}