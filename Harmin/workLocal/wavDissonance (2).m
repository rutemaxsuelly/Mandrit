function pond = wavDissonance(wavFile)
[buffer, fs, nb] = wavread(wavFile);
fftBuffer = abs(fft(buffer));
varSize = length(fftBuffer)/2;
pond = 0;
list = [];
for i=1:varSize
    decomposed = decomposePrimo(i);
    [list, newElements] = appendNew(list, decomposed);
    for j=1:length(newElements);
        pond = pond + (newElements(j)-1) * fftBuffer(i);
    end
end