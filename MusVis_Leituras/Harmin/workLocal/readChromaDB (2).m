function readChromaDB(directory)
ind = [1;2;3;4;5;6;7;8;9;10;11;12];
files = listDir(directory);
wdbFile = fopen('chroma.db','r');
simple = zeros(0,12);
weig  = zeros(0,12);
exp  = zeros(0,12);
while ~feof(dbFile)
name = fscanf(dbFile, '%s\n\r');
      chromaSimple = zeros(1,12);
      chromaLinWeighted = zeros(1,12);
      chromaExpWeighted = zeros(1,12);
      for j=1:12
          chromaSimple(j) = fscanf(dbFile, ' %0.4f');
      end
      simple = [simple chromaSimple];
      fscanf(dbFile, '\n\r');      
      for j=1:12
          chromaLinWeighted(j) = fscanf(dbFile, ' %0.4f');
      end
      weig = [weig chromaLinWeighted];
      fscanf(dbFile, '\n\r');      
      for j=1:12
          chromaExpWeighted(j) = fscanf(dbFile, ' %0.4f');
      end
      exp = [exp chromaExpWeighted];
      fscanf(dbFile, '\n\r');      
      for j=1:12
          fscanf(dbFile, ' %d');
      end
      fscanf(dbFile, ' \n\r');      
      
end
fclose(dbFile);