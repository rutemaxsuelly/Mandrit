function c = consonance(varargin)
if (mod(length(varargin), 2) ~= 0)
    'error: number of arguments must be pair'
else
    varSize = length(varargin)/2;
    divisor = mgcd(varargin{1:varSize});
    index = 1;
    for i=1:varSize
        decomposed = decomposePrimo(varargin{i}/divisor);
        for j=1:length(decomposed);
            values{index} = decomposed(j);
            weigths{index} = varargin{varSize + i};
            index = index + 1;
        end
    end
    decSize = index - 1;
    %divisor = mgcd(values{1:decSize});
    for i=1:decSize
        %reduced{i} = values{i}/divisor;
        reduced{i} = values{i};
    end
    [c, r] = mlcm(reduced, weigths);
end
% e os numeros fracionarios?
% como fazer calculos aproximativos?
% como ponderar pela intensidade das notas?