function showOrder(mat)
nRows = size(mat, 1);
nCols = size(mat, 2);
chNames = getChordNames;
x = reshape(mat', 1, nRows * nCols);
[x2, ind] = sort(x);
for i=1:length(x2)
    res(i).value = x2(i);
    res(i).row = ceil(ind(i)/nCols);
    res(i).col = ind(i) - (res(i).row - 1) * nCols;
    if (~isnan(res(i).value) && res(i).row ~= res(i).col && res(i).value > 0)
        disp([num2str(res(i).row) ',' num2str(res(i).col) ': ' num2str(res(i).value) ' ' chNames(res(i).row).name ' --> ' chNames(res(i).col).name]);
    end
end

function chNames = getChordNames
chNames(1).name = 'Gmaj';
chNames(2).name = 'D7';
chNames(3).name = 'Ddim';
chNames(4).name = 'Fmin7';
chNames(5).name = 'Gmin7';
chNames(6).name = 'Cmin7';
chNames(7).name = 'F#7';
chNames(8).name = 'C7';
chNames(9).name = 'A#7';
chNames(10).name = 'G7';
chNames(11).name = 'Amin7';
chNames(12).name = 'Bmin7';
chNames(13).name = 'A7';
chNames(14).name = 'Cmaj';
chNames(15).name = 'Fmin';
chNames(16).name = 'F#min7';
chNames(17).name = 'C#7';
chNames(18).name = 'A#dim';
chNames(19).name = 'F7';
chNames(20).name = 'Dmaj';
chNames(21).name = 'E7';
chNames(22).name = 'Dmin7';
chNames(23).name = 'G#min7';
chNames(24).name = 'C#min7';
chNames(25).name = 'Fmaj';
chNames(26).name = 'Emin7';
chNames(27).name = 'F#maj';
chNames(28).name = 'G#dim';
chNames(29).name = 'Emaj';
chNames(30).name = 'D#7';
chNames(31).name = 'B7';
chNames(32).name = 'Amin';
chNames(33).name = 'G#7';
chNames(34).name = 'Fdim';
chNames(35).name = 'Dmin';
chNames(36).name = 'D#maj';
chNames(37).name = 'Amaj';
chNames(38).name = 'Bmaj';
chNames(39).name = 'D#min7';
chNames(40).name = 'A#maj';