function getExactChords(exactTextFile, dirName)
%Load Text File
associations = LoadExactTextFile(exactTextFile);
cd(dirName);
files = dir;
for i=3:length(files)
    if(~isempty(strfind(lower(files(i).name),'.wav')))
        newName = makeNewName(files(i).name, associations);
        disp(['renaming ' files(i).name ' to ' newName]);
        movefile(files(i).name, newName);
    end
end