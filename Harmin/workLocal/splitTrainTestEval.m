function [segs, trainSegs, testSegs, evalSegs] = splitTrainTestEval(edsDir)
cd(edsDir);
trainF = fopen('trainPV.txt', 'w');
testF = fopen('testPV.txt', 'w');
evalF = fopen('evalPV.txt', 'w');
edsF = fopen('perceptiveValues.txt', 'rt');
y = 0;
for i=1:60
    segs(i).list = [];
    trainSegs(i).list = [];
    testSegs(i).list = [];
    evalSegs(i).list = [];
end
while feof(edsF) == 0
    y = y + 1;
    tline = fgetl(edsF); 
    [s, r] = strtok(tline);
    seg.fileName = s;
    seg.index = randn;
    chordClass = str2num(r);
    if (chordClass ~= 255)
        segs(chordClass + 1).list = insertSeg(segs(chordClass + 1).list, seg);
    end
end

for i=1:60
    curSegs = segs(i).list;
    nInst = length(curSegs);
    if(nInst < 4)
        nTrainInst = floor(nInst*0.2);
        nTestInst = ceil(nInst*0.3);
    else
        nTrainInst = ceil(nInst*0.2);
        nTestInst = floor(nInst*0.3);
    end
    nEvalInst = nInst - nTrainInst - nTestInst;
    for j=1:nTrainInst
        cs.fileName = curSegs(j).fileName;
        trainSegs(i).list = [trainSegs(i).list; cs];
        fprintf(trainF, '%s\t%d\n',cs.fileName, i - 1);
    end
    for j=nTrainInst+1:nTrainInst+nTestInst
        cs.fileName = curSegs(j).fileName;
        testSegs(i).list = [testSegs(i).list; cs];        
        fprintf(testF, '%s\t%d\n',cs.fileName, i - 1);
    end
    for j=nTrainInst+nTestInst+1:nInst
        cs.fileName = curSegs(j).fileName;
        evalSegs(i).list = [evalSegs(i).list; cs];        
        fprintf(evalF, '%s\t%d\n',cs.fileName, i - 1);
    end
end

fclose(edsF);
fclose(trainF);
fclose(testF);
fclose(evalF);

function resS = insertSeg(segs, s)
ls = length(segs);
if(ls == 0)
    resS= [s];
else
    posS = searchSeg(segs, s, ls);
    resS = [segs(1:(posS-1)); s; segs(posS:ls)];
end

function p = searchSeg(segs, s, ls)
i = 1;
curS = segs(i).index;
while (s.index > curS)
    i = i + 1;
    if (i > ls) 
        p = i;
        return;
    else
        curS = segs(i).index;
    end
end
p = i;