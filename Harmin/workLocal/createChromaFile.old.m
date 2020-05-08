function createChromaFile(fileName)
% Cut first 8 beats
cutFirst8(fileName);
% 

%create chroma db file
ind = [1;2;3;4;5;6;7;8;9;10;11;12];
newName = [strtok(fileName, '.') '.db'];
chromaFile = fopen(newName,'w');
[chromaSimple, chromaLinWeighted, chromaExpWeighted] = wav2chr(fileName);
fprintf(chromaFile, '%s\n\r',files(i).name);
for j=1:12
    fprintf(chromaFile, ' %0.4f', chromaSimple(j));
end
fprintf(chromaFile, '\n\r');      
for j=1:12
    fprintf(chromaFile, ' %0.4f', chromaLinWeighted(j));
end
fprintf(chromaFile, '\n\r');      
for j=1:12
    fprintf(chromaFile, ' %0.4f', chromaExpWeighted(j));
end
fprintf(chromaFile, '\n\r');      
ordered = indexsort(chromaExpWeighted, ind);
for j=1:12
    fprintf(chromaFile, ' %d', ordered(j));
end
fprintf(chromaFile, ' \n\r');      
end
fclose(chromaFile);