function seqLength = createChromaFile(dirPath, fileName, seqLength, dbName, introLength)
cutFirst([dirPath '\' fileName], introLength);
%create chroma db file
ind = [1;2;3;4;5;6;7;8;9;10;11;12];
cd(dirPath);
mkdir('tempSegs');
baseName = strtok(fileName, '.');
chromaFile = fopen(dbName,'w');
h = hann(29400);
if(~isempty(findstr(lower(fileName),'.wav')))
    [w, nb, fr] = wavread(fileName);
    if (length(w)/29400 < seqLength) 
        disp('possible problem! wav shorter then sequence. Croping file...')
        seqLength = length(w)/29400;
    end
    for k=1:seqLength
        firstSample = (k - 1) * 29400 + 1;
        lastSample = k * 29400;
        w2 = w(firstSample:lastSample,1);
        w3 = zeros(32768, 1);
        w3(3685:33084) = h.*w2;
        tempFileName = sprintf('tempSegs\\%s_%0.3d.wav',baseName,k);
        wavwrite(w3, nb, fr, tempFileName);
        [chromaSimple, chromaLinWeighted, chromaExpWeighted] = wav2chr(tempFileName);
        fprintf(chromaFile, '%s\t %0.3d\n\r',fileName,k);
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
end
fclose(chromaFile);
%% cleaning...
cd('tempSegs');
files = dir;
for i=3:length(files)
    delete(files(i).name);
end
cd ..
rmdir('tempSegs')

