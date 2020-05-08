//
//
//

class TempConversion{
    
    constructor(){

        this.dictRootTemp = {
     
            0:"0",
            1:"1",
            2:"2",
            3:"3",
            4:"4",
            5:"5",
            6:"6",
            7:"7",
            8:"8",
            9:"9",
            10:"10",
            11:"11",
            12:"12",
            13:"13",
            14:"14",
            15:"15",
            16:"16"
        }
    }

    getdivTempName(TempInString){
        let rootTemp_ = TempInString.match([0-16]);
        
        
        let rootTempNum = this.dictRootTemp[rootTemp_];
        if(rootTempNum == null){
            rootTempNum = -1;
        }
        return new divTempName(rootTempNum);
    }

}

/*const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((afc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    afc[val] = afc[val] || [];
    afc[val].push(key);
    return afc;
  }, {});*/
