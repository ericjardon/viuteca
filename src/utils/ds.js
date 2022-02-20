
export function inverse(obj){
    var retobj = {};
    for(var key in obj){
      retobj[obj[key]] = key;
    }
    return retobj;
  }