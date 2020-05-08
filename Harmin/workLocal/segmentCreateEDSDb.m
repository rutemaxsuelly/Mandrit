function segmentCreateEDSDb(FileName)
edsPV = fopen('perceptiveValues.txt','w');
segSize = 29400;
[buf, fs, b] = wavread(FileName);
restSize = segSize - mod(length(buf), segSize);
buf = [buf; zeros(restSize, 1)];
[coreFileName, r] = strtok(FileName, '.');
mkdir(coreFileName);
numBeatsSize = length(buf)/segSize;
numEmptyBeats = 8;
numBeatsPerChord = 4;
numBeats = 60 * numBeatsPerChord;
if(numBeats > numBeatsSize - numEmptyBeats)
    disp('problem! Not enough class samples');
end
for i=1:numBeats
    chordClass = floor((i-1)/numBeatsPerChord);
    segBuff = buf((i + numEmptyBeats - 1) * segSize + 1 : (i + numEmptyBeats) * segSize);    
    segFileName = sprintf('%s%0.3d.wav', coreFileName, i);
    fprintf(edsPV, '%s  %d  \n\r', segFileName, chordClass);
    wavwrite(segBuff, fs, b, [coreFileName '\' segFileName]);
end
fclose(edsPV);