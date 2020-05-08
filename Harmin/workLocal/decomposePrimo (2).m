function n = decomposePrimo(num)
found = false;
nMax = num;
n = [];
lastI = floor(sqrt(num));
i = 2;
while (i <= lastI && ~found)
    if (mod(num, i)==0)
        found = true;
    else
        i = i + 1;
    end
end
        
if (found)
    n = [i decomposePrimo(num/i)];
else
    n = num;
end