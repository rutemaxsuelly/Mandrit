function cutFirst(fileName, n)
[buf, fs, nb] = wavread(fileName);
segLength = fs *2 / 3;
buf(1:n*segLength) = [];
wavwrite(buf, fs, nb, fileName);