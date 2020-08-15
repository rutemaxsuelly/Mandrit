//
//
//

class ChordConversion{
    
    constructor(){
        this.dictRootNote = {
            "C":0,
            "C#":5,
            "D":10,
            "D#":3,
            "E":8,
            "F":1,
            "F#":6,
            "G":11,
            "G#":4,
            "A":9,
            "A#":2,
            "B":7,
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
            0:"C",
            1:"F",
            2:"A#",
            3:"D#",
            4:"G#",
            5:"C#",
            6:"F#",
            7:"B",
            8:"E",
            9:"A",
            10:"D",
            11:"G"
        }
        this.dictIndexToChordType = {
            // 5:"maj",
            // 4:"dom",
            // 3:"min",
            // 2:"dim",
            // 1:"sus",
            // 0:"?"
            5:"",
            4:"7",
            3:"m",
            2:"°",
            1:"4",
            0:"?"
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
