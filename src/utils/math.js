/* 
Functions to perform mathematical operations; 
ideally in a functional paradigm 
*/
function all(pred, as) {
    for (var a of as) if (!pred(a)) return false;
    return true;
}

function isIn(as) {
    return function (a) {
        return as.has(a);
    };
}

export const equalSets = (as, bs) => {
    return as.size === bs.size && all(isIn(bs), as);
}
