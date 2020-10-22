function printChr(tempChrTr, fileName, tableName)
fid = fopen(fileName, 'wt');
global ch;
if (nargin > 2)
    %print label line
    fprintf(fid, '%s\t', tableName);
    for k=1:73
        fprintf(fid, '%s\t', ch(k).name);     
    end
    fprintf(fid, '\n');
end
for i=1:73
    fprintf(fid, '%s\t', ch(i).name);
    for j=1:73
        fprintf(fid, '%d\t', tempChrTr(i, j));
    end
    fprintf(fid, '\n');
end

fclose(fid);