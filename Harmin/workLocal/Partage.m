function Partage(n)
res = [];
for nInst=0:n
    resLocal = [0 0 0 0];
    for j=1:nInst
        nTrainInst = ceil(nInst*0.2);
        nTestInst = floor(nInst*0.3);
        nEvalInst = nInst - nTrainInst - nTestInst;
        resLocal = [nInst nTrainInst nTestInst nEvalInst];
    end
    res = [res; resLocal];
end
res