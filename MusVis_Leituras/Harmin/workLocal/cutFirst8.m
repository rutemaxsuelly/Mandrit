function cutFirst(fileName)
[buf, fs, nb] = wavread(fileName);
buf(1:8*29400) = [];
wavwrite(buf, fs, nb, fileName);