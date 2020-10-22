function c = dissonance4(varargin)
if (mod(length(varargin), 2) ~= 0)
    'error: number of arguments must be pair'
else
    varSize = length(varargin)/2;
    divisor = mgcd(varargin{1:varSize});
    for i=1:varSize
        reduced{i} = min2(varargin{i}/divisor);
        weigths{i} = varargin{varSize + i};
    end
    [c, r] = mlcm(reduced, weigths);
end

function res = min2(num)
res= num;
while(mod(res,2)==0 && res > 2)
    res = res/2;
end