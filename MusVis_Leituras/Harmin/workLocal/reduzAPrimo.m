function n = reduzAPrimo(num)
found = false;
while (i <= round(num/2) && ~found)
    if mod(num, i)
        found = true;
    else
        i = i + 1;
    end
end
        
if (~found)
    n = num;
end