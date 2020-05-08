function pond = dissonance2(varargin)
if (mod(length(varargin), 2) ~= 0)
    'error: number of arguments must be pair'
else
    varSize = length(varargin)/2;
    divisor = mgcd(varargin{1:varSize});
    
    pond = 0;
    list = [];
    for i=1:varSize
        decomposed = decomposePrimo(varargin{i}/divisor);
        [list, newElements] = appendNew(list, decomposed);
        for j=1:length(newElements);
            pond = pond + (newElements(j) - 1) * varargin{varSize + i};
        end
    end
end

