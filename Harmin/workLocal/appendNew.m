function [l, ne] = appendNew(list, elements)
index = 1;
l = list;
ne = [];
for i=1:length(elements)
    j = 1;
    lastI = length(l);
    found = false;
    while (j <= lastI && ~found)
        if (l{j} == elements(i))
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
