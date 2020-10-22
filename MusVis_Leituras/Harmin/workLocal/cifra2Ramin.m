function cifra2Ramin(direct)
cd(direct);
files = dir;
for i=3:length(files)
    ind = strfind(lower(files(i).name),'.txt');
    if(~isempty(ind))
        disp(files(i).name);        
        baseName = files(i).name(1:ind(1)-1);    
        sncName = [baseName '.snc'];
        harmName = [baseName '.db'];        
        chrName = [baseName '.chr'];
        readTranscriptedRobertWilley(files(i).name, harmName);
        %readTranscripted(files(i).name, 'capibaHarmony.db');
        writeSegsNChords_ChromaRobertWilley(files(i).name, sncName, chrName);        
        %writeSegsNChords_Chroma(files(i).name, 'capibaSegsNChords.db', 'capibaChroma.db');
    end
end