/*
Utility module for parsing the date from input text box
e.g. '02 de Julio 2020'-> '2020-07-02';  'ago 2011' -> '2011-08-*'
and converting into a date in format YYYY-MM-DD.

The result is passed to a function fmt query to send to the MySQL back end
*/
import {MONTHS, MONTH_NAMES_ES, MONTH_VALS} from './constants'

export const getMonthValue = (token) => {
    // returns the value corresponding to a string if it is a month, null otherwise
    token = token.trim();
    // try parsing number
    let n = Number.parseInt(token);
    if (n) {
        return (n in MONTH_VALS ? MONTH_VALS[n] : null)
    }
    // get first 3 lowercase letters
    let m = token.slice(0,3).toLowerCase();
    if (m in MONTHS) {
        let k = MONTHS[m]; // integer
        return MONTH_VALS[k]; // 2-digit string
    }
    return null
}

export const getMonthName_ES = (token) => {
    // returns the value corresponding to a string if it is a month
    // if not a month, return null
    token = token.trim();
    let n = Number.parseInt(token);
    if (n) {
        return (n in MONTH_NAMES_ES ? MONTH_NAMES_ES[n] : null)
    }
    let m = token.slice(0,3).toLowerCase();
    if (m in MONTHS) {
        let k = MONTHS[m]; // integer
        return MONTH_NAMES_ES[k]; // full name in spanish
    }
    return null
}
/* 
const fmtDate = (term) => {
    // split the text into parts

    // for every component test if its month, day, year.
    // we need a minimum of year, else month+year, month+day, else year+month+day

    return null
}

const fmtQuery = (dateStr) => {
    return null
}
 */