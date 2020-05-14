//
//
//

class ChordConversion{
    
    constructor(){
        this.dictRootNote = {
            "0":0,
            "5#":5,
            "10":10,
            "3#":3,
            "8":8,
            "1":1,
            "6#":6,
            "11":11,
            "4":4,
            "9":9,
            "2":2,
            "7":7,
            "12":12,
            "13":13,
            "14":14,
            "15":15,
        };
        this.dictChordType = {
            "":5,
            "7":4,
            "m":3,
            "°":2,
            "4":1,
            "?":0
        };
        this.dictIndexToRootNote = {
            // 0:"I",
            // 1:"IV",
            // 2:"bVII",
            // 3:"bIII",
            // 4:"bVI",
            // 5:"bII",
            // 6:"bV",
            // 7:"VII",
            // 8:"III",
            // 9:"VI",
            // 10:"II",
            // 11:"V"
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
        }
        this.dictIndexToChordType = {
            // Gneros: Bossa Nova, Shikko, Son, Rumba, Soukous, Gahu...
            5:"",
            4:"",
            3:"",
            2:"",
            1:"",
            0:"",
        }
    }

    getChordName(chordInString){
        let rootNote_ = chordInString.match(/([A-G][#]|[A-G])/gm);
        let chordType_ = chordInString.match(/([7m°4?])/gm);
        if(chordType_ == null){
            chordType_ = "";
        }
        let rootNoteNum = this.dictRootNote[rootNote_];
        let chordTypeNum = this.dictChordType[chordType_];
        if(rootNoteNum == null){
            rootNoteNum = -1;
        }
        return new ChordName(rootNoteNum, chordTypeNum);
    }

}

const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});
