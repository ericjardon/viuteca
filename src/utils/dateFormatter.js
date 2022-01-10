/*
Utility module for parsing the date from input text box
e.g. '02 de Julio 2020'-> '2020-07-02';  'ago 2011' -> '2011-08-*'
and converting into a date in format YYYY-MM-DD.

The result is passed to a function fmt query to send to the MySQL back end
*/

MONTHS = {
    'ene':01,
    'feb':02,
    'mar':03,
    'abr':04,
    'may':05,
    'jun':06,
    'jul':07,
    'ago':08,
    'sep':09,
    'oct':10,
    'nov':11,
    'dic':12
}


const likeMonth = (token) => {
    // returns the value corresponding to a month if it is a month
    // if not a month, return null

    return null
}

const fmtDate = (term) => {
    // split the text into parts

    // for every component test if its month, day, year.
    // we need a minimum of year, else month+year, month+day, else year+month+day

    return null
}

const fmtQuery = (dateStr) => {
    return null
}