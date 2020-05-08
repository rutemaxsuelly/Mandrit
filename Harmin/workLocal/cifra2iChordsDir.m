function song = cifra2iChordsDir(inDirName, outDirName)
cd(inDirName);
if (inDirName(length(inDirName)) == '\')
    inCompl = '';
else
    inCompl = '\'
end
if (outDirName(length(outDirName)) == '\')
    outCompl = '';
else
    outCompl = '\';
end
files = dir;
for i=3:length(files)
        ind = strfind(lower(files(i).name),'.txt');
        if(~isempty(ind))
            disp(files(i).name);
            inName = [inDirName inCompl files(i).name];    
            outName = [outDirName outCompl files(i).name];    
            cifra2iChords(inName, outName);
        end
end