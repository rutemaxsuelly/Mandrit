function [sD, m] = analyseConfMatrix(confMatrices)
nCl = size(confMatrices, 1);
nMat = length(confMatrices)/nCl;
bigMat = zeros(nMat, nCl, nCl);
for i=1:nMat
    bigMat(i, :, :) = confMatrices(:,(i-1)*nCl+1:i*nCl);
end

sD = squeeze(std(bigMat, 0, 1));
m = squeeze(mean(bigMat, 1));

% 
% sD = zeros(nCl);
% m = zeros(nCl);
% for i=1:nCl
%     for j=1:nCl
%         sD(i, j) = standardDeviation(bigMat(:,i,j));
%         m = mean(bigMat