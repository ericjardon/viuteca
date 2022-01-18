/*
Utility module for parsing the date from input text box
e.g. '02 de Julio 2020'-> '2020-07-02';  'ago 2011' -> '2011-08-*'
and converting into a date in format YYYY-MM-DD.

The result is passed to a function fmt query to send to the MySQL back end


*/

MONTHS = {
    'ene':'01',
    'feb':'02',
    'mar':'03',
    'abr':'04',
    'may':'05',
    'jun':'06',
    'jul':'07',
    'ago':'08',
    'sep':'09',
    'oct':'10',
    'nov':'11',
    'dic':'12'
}

PERIODS = {
    'ad': [08,12],
    'fj': [02, 06],
}

DEFAULT = {
    year: (new Date().getFullYear().toString()),
    month: (new Date().getMonth() +1).toString().padStart(2, '0'),
    date: (new Date().getDate()).toString().padStart(2,'0'),
}  // for iso strings only

const PATTERNS = [
    /(\d{1,2})?( de )? *(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\w{0,8}( de )? *(\d{4})?/, // full date
    /(\d{4})/,  // single year
    /([a-z]{1,10})/,  // single month
    /([a-z]{1,10})[ -]+([a-z]{1,10}) ?(\d{2,4})?/,  // agosto - diciembre 2021
    /([a-z]{2}\d{2})/  // AD21
]

const processMatch = (matchObj, index) => {
    // returns the parts of date given the match {year, month, day}
    if (!matchObj) return null;

    if (index==0) {
        // full date
        return {
            date: matchObj[1].padStart(2, '0'),
            month: matchObj[3],
            year: matchObj[5],
        }
    }
    else if (index == 1) {
        // single year
        return {
            year: matchObj[1]
        }
    }
    else if (index == 2) {
        // single month
        return {
            month: matchObj[1],
        }
    }
    else if (index == 3) {
    }
    else if (index == 4) {
    }
    return null;
}


const getMonthNumber = (token) => {
    // returns the value corresponding to a month if it is a month
    // if not a month, return null
    let key = token.slice(0,3).toLowerCase()
    if (key in MONTHS) {
        return MONTHS[key];
    }

    return null
}

const fmtDate = (searchTerm) => {
    searchTerm = searchTerm.trim().toLowerCase();
    // Scan regex by regex, stop on first success
    let match;

    let i;
    for (i=0; i<PATTERNS.length; i++) {
        match = searchTerm.match(PATTERNS[i]);
        if (match !== null) break;
    }

    if (!match) return null

    const dateParts = processMatch(match, i);

    return toISODateStr(dateParts)

}

const toISODateStr = (data) => {
    // receives an obj with optionals {year, month, date}
    // returns a string yyyy-mm-dd
    console.log("data", data);
    let dt = ''
    
    dt += (data.year || DEFAULT['year'])
    dt += '-'
    dt += (getMonthNumber(data.month) || DEFAULT['month'])
    dt += '-'
    dt += (data.date || DEFAULT['date']);
    console.log("Converted date", dt);

    return dt;
}


fmtDate('5 de Agosto');