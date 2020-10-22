function raminho2eds(harmonyFileName)
hf = fopen(harmonyFileName, 'rt');
edsF = fopen('perceptiveValues.txt', 'w');
y = 0;
while feof(hf) == 0
    y = y + 1;
    tline = fgetl(hf); 
    [fileName, r] = strtok(tline);
    baseName = strtok(fileName, '.');
    [s, r] = strtok(r);
    segNum = str2num(s);
    chordClass = str2num(r);
    if (chordClass ~= 255)
        fprintf(edsF, '%s%0.3d.wav\t%d\n',baseName,segNum,chordClass);
    end
end
fclose(hf);
fclose(edsF);