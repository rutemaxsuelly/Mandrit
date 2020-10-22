function [matrices, M] = LoadConfusionMatrices(dirName)
cd(dirName);
files = dir;
M = [];
matrices = [];
figure;
pause;
for i=3:length(files)
    if(length(strfind(files(i).name, '.txt')) > 0)
        disp(['loading...' files(i).name]);
        [matr, mov] = LoadConfusionMatrixFromWekaScript(files(i).name);        
        M = [M mov];
        for j=1:length(matr)
            m = NormalizeM(matr(j).matrix, matr(j).nInstances);
            matrices = [matrices m];
        end
    end
end
movie(M,5);

function m = NormalizeM(m, nIns)
numLines = size(m,1);
numCols = size(m,2);
for i=1:numLines
    for j=1:numCols
        m(i,j) = m(i,j)/nIns(i);
    end
end
       