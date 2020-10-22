function printVect(chVect, fileName)
fid = fopen(fileName, 'wt');
global ch;
for i=1:73
    fprintf(fid, '%s\t%d\n', ch(i).name, chVect(i));
end

fclose(fid);