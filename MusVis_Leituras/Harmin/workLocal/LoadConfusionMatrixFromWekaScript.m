function [matr, M] = LoadConfusionMatrixFromWekaScript(fileName)
f = fopen(fileName);
i = 0;
isFirst = true;
while(~feof(f) && i < 5)
    i = i + 1;
    %% SKIP NON PERTINENT DATA
    curLine = '';
    disp('searching confusion matrix tag...');
    while (strncmp(curLine, '=== Confusion Matrix ===', 24) == 0 && ~feof(f))
        curLine = fgets(f);    
    end
    if (~feof(f))            
        disp('loading confusion matrix...');
        [matr(i).matrix, matr(i).nInstances, nClasses] = LoadConfusionMatrix(f);
        matr(i).fileName = fileName;
        if (isFirst) 
            [errClasses, nErrClass] = InitializeClassesOfErrors(nClasses);            
            isFirst = false;
        end
        errors = computeErrors(matr(i).matrix, errClasses, nErrClass);
        matr(i).errors = errors;
        subplot(1,2,1);
        plot(errors);
        subplot(1,2,2);
        imagesc(matr(i).matrix);
        %subplot(1,2,2);
        %surfc(matr(i).matrix);
        title(fileName);
        M(i) = getframe;
    end
end
disp(['number of confusion matrices: ' num2str(i)]) ;


function [m, nInst, nCl] = LoadConfusionMatrix(f)
%% READ CONFUSION MATRIX
curLine = fgets(f);
curLine = fgets(f);
%% READ NUMBER OF CLASSES
r = curLine;
s = 'trash';
nCl = -1;
disp('verifying number of classes...');
while (strcmp(s, '<--') == 0)
    [s, r] = strtok(r);
    nCl = nCl + 1;
end
m = zeros(nCl);
nInst = zeros(1, nCl);
disp('reading data...');
curLine = fgets(f);    
i = 0;
%%READ DATA
while (length(curLine) > 2 && ~feof(f))
    i = i + 1;
    r = curLine;
    [s, r] = strtok(r);
    j = 0;
    lineCounter = 0;
    while (strcmp(s, '|') == 0)
        j = j + 1;
        m(i, j) = log2(str2num(s) + 1);
        %m(i, j) = str2num(s);
        lineCounter = lineCounter + m(i, j);
        [s, r] = strtok(r);
    end
    nInst(i) = lineCounter;
    curLine = fgets(f);    
end
disp('finished loading matrix...');

function [errorClasses, numClasses] = InitializeClassesOfErrors(numClasses)
errorClasses = ones(numClasses);
for i=1:numClasses
    errorClasses(i, i) = 2;
end
errorClasses(5, 29) = 3;  %Amaj
errorClasses(3, 40) = 3;  %A#maj
errorClasses(9, 37) = 3;  %Bmaj
errorClasses(14, 7) = 3;  %Cmaj
errorClasses(14, 6) = 3;  %Cmaj
errorClasses(21, 10) = 3; %Dmaj
errorClasses(17, 15) = 3; %D#maj
errorClasses(25, 12) = 3; %Emaj
errorClasses(32, 23) = 3; %Fmaj
errorClasses(32, 22) = 3; %Fmaj
errorClasses(28, 18) = 3; %F#maj
errorClasses(39, 26) = 3; %Gmaj

errorClasses(29, 5) = 3;  %Amaj
errorClasses(40, 3) = 3;  %A#maj
errorClasses(37, 9) = 3;  %Bmaj
errorClasses(7, 14) = 3;  %Cmaj
errorClasses(6, 14) = 3;  %Cmaj
errorClasses(10, 21) = 3; %Dmaj
errorClasses(15, 17) = 3; %D#maj
errorClasses(12, 25) = 3; %Emaj
errorClasses(23, 32) = 3; %Fmaj
errorClasses(22, 32) = 3; %Fmaj
errorClasses(18, 28) = 3; %F#maj
errorClasses(26, 39) = 3; %Gmaj
numClasses = 3;

% errorClasses(5, 29) = 3;  %Amaj
% errorClasses(3, 40) = 3;  %A#maj
% errorClasses(9, 37) = 3;  %Bmaj
% errorClasses(14, 7) = 3;  %Cmaj
% errorClasses(14, 6) = 5;  %Cmaj
% errorClasses(21, 10) = 3; %Dmaj
% errorClasses(17, 15) = 3; %D#maj
% errorClasses(25, 12) = 3; %Emaj
% errorClasses(32, 23) = 3; %Fmaj
% errorClasses(32, 22) = 5; %Fmaj
% errorClasses(28, 18) = 3; %F#maj
% errorClasses(39, 26) = 3; %Gmaj
% 
% errorClasses(29, 5) = 4;  %Amaj
% errorClasses(40, 3) = 4;  %A#maj
% errorClasses(37, 9) = 4;  %Bmaj
% errorClasses(7, 14) = 4;  %Cmaj
% errorClasses(6, 14) = 6;  %Cmaj
% errorClasses(10, 21) = 4; %Dmaj
% errorClasses(15, 17) = 4; %D#maj
% errorClasses(12, 25) = 4; %Emaj
% errorClasses(23, 32) = 4; %Fmaj
% errorClasses(22, 32) = 6; %Fmaj
% errorClasses(18, 28) = 4; %F#maj
% errorClasses(26, 39) = 4; %Gmaj
% numClasses = 6;


function errors = computeErrors(m, errClasses, nErrClasses)
nLines = size(m, 1);
nCols = size(m,2);
errors = zeros(1, nErrClasses);
for i=1:nLines;
    for j=1:nCols;
        errorClasse = errClasses(i, j);
        %disp([num2str(i) ' ' num2str(j) ' ' num2str(errorClasse)]);
        errors(errorClasse) = errors(errorClasse) + m(i,j);
    end
end
