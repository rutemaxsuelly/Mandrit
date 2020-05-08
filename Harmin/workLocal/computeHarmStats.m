function [chordVect, chordTransitions] = computeHarmStats(fileName)
fid = fopen(fileName, 'rt');
y = 0;
curChord = 73;
chordVect = zeros(72);
chordTransitions = zeros(73, 73);
while feof(fid) == 0
    y = y + 1;
    tline = fgetl(fid); 
    nextChord = str2num(tline)+1;    
    %disp(['curChord: ' num2str(curChord)]);
    %disp(['nextChord: ' num2str(nextChord)]);
    chordVect(nextChord) = chordVect(nextChord) + 1;
    chordTransitions(curChord, nextChord) = chordTransitions(curChord, nextChord) + 1;
    curChord = nextChord;
end
global ch;
ch = initChords;
printChr(chordTransitions, [fileName '.Tr']);
printVect(chordVect, [fileName '.Vct']);
showChr(chordTransitions);
fclose(fid);