%old version
function c = wavConsonance(wavFile)
[buffer, fs, nb] = wavread(wavFile);
fftBuffer = abs(fft(buffer(1:1024)));
%buffer[3,2,4,1] --> indexes[]

varSize = length(fftBuffer)/2;
index = 1;
for i=1:varSize
    decomposed = decomposePrimo(i);
    for j=1:length(decomposed);
        values{index} = decomposed(j);
        weigths{index} = fftBuffer(i);
        index = index + 1;
    end
end
[c, r] = mlcm(values, weigths);
