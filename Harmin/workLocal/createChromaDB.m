function createChromaDB(directory)
ind = [1;2;3;4;5;6;7;8;9;10;11;12];
files = listDir(directory);
dbFile = fopen('revisedChroma.db','w');
for i=3:length(files)
  disp(files(i).name);
  if(~isempty(strfind(lower(files(i).name),'.wav')))
      [chromaSimple, chromaLinWeighted, chromaExpWeighted] = wav2chr(files(i).name);
      fprintf(dbFile, '%s\n\r',files(i).name);
      for j=1:12
          fprintf(dbFile, ' %0.4f', chromaSimple(j));
      end
      fprintf(dbFile, '\n\r');      
      for j=1:12
          fprintf(dbFile, ' %0.4f', chromaLinWeighted(j));
      end
      fprintf(dbFile, '\n\r');      
      for j=1:12
          fprintf(dbFile, ' %0.4f', chromaExpWeighted(j));
      end
      fprintf(dbFile, '\n\r');      
      ordered = indexsort(chromaExpWeighted, ind);
      for j=1:12
          fprintf(dbFile, ' %d', ordered(j));
      end
      fprintf(dbFile, ' \n\r');      
  end
end
fclose(dbFile);