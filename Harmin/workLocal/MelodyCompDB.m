function MelodyCompDB(directory, targetFile)
ind = [1;2;3;4;5;6;7;8;9;10;11;12];
files = listDir(directory);
for i=3:length(files)
  files(i).name
  if(~isempty(strfind(lower(files(i).name),'.wav')))
      [chromaSimple, chromaLinWeighted, chromaExpWeighted] = wav2chr(files(i).name);
      node(i).chroma = chromaSimple;
  else
      node(i).chroma = zeros(1,12);
  end  
end
buffFinal = zeros(0,1);
mute = zeros(29400,1);
[buff, fs, nb] = wavread(targetFile);
for i=1:30
    min = inf;
    [cs, cw, ce] = buff2chr(buff(i*29400:(i+1)*29400,1), fs, nb);
    for j=3:length(node)
        d = chrDistance(node(j).chroma, cs);
        if d < min
            min = d;
            index = j;
        end
    end
    index
    if(~isempty(strfind(lower(files(index).name),'.wav')))
        [buffCur, fs, nb] = wavread(files(index).name);
        buffFinal = [buffFinal; buffCur];
    else
        buffFinal = [buffFinal; mute];
    end
end
wavwrite(buffFinal, fs, nb, 'adaptation.wav');
function d = chrDistance(chr1, chr2)
d = 0;
for i=1:12
    d = d + abs(chr1(i) - chr2(i));
end