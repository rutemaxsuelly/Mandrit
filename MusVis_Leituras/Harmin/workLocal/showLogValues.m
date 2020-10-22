function showLogValues
costFunction = GetLogValues;
nSegs = size(costFunction, 1);
for i=1:nSegs
    x = squeeze(costFunction(i, :, :));
    subplot(1,2,1);
    imagesc(x);
    subplot(1,2,2);
    surfc(x);
    pause(1);
end