function DrawSquareOverImageSc(matr, lin, col)
nRows = size(matr, 1);
nCols = size(matr, 2);
imagesc(matr);
rect = get(gcf, 'Position');
left = rect(1);
bottom = rect(2);
width = rect(3);
height = rect(4);
sqWidth = width/nCols;
sqHeight = height/nRows;
sqLeft = left + col*sqWidth;
sqBottom = bottom - lin*sqHeight;
%rectangle('Position', [sqLeft, sqBottom, sqWidth, sqHeight])
rectangle('Position', [col-0.5, lin-0.5, 1, 1], 'LineWidth', 1, 'EdgeColor', [1 0 1])