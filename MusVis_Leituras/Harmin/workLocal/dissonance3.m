function pond = dissonance3(varargin)
if (mod(length(varargin), 2) ~= 0)
    'error: number of arguments must be pair'
else
    varSize = length(varargin)/2;
    divisor = mgcd(varargin{1:varSize});
    
    pond = 0;
    list = [];
    for i=1:varSize
        decomposed = decomposePrimo(varargin{i}/divisor);
        [list, newElements] = append3(list, decomposed);
        for j=1:length(newElements);
            pond = pond + (newElements(j) - 1) * varargin{varSize + i};
        end
    end
end

function [l, ne] = append3(list, elements)
index = 1;
l = list;
ne = [];
for i=1:length(elements)
    j = 1;
    lastI = length(l);
    found = false;
    while (j <= lastI && ~found)
        if (l{j} == elements(i) && l{j} == 2)
            found = true;
        else 
            j = j + 1;
        end
    end
    if (~found)
        l{lastI + index} = elements(i);
        ne = [ne elements(i)];
        index = index + 1;
    end
end
