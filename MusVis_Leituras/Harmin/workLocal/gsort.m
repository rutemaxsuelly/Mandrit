function ord = gsort(matrix)
ord = zeros(length(matrix),1);

if (length(matrix) <= 2)
    ord = matrix;
else
    if(matrix(1) > matrix(2))
        max = matrix(1);
        min = matrix(2);
    else
        max = matrix(2);
        min = matrix(1);
    end
    nextMat = zeros(length(matrix)-2,1);
    counter = 1;
    for i=3:length(matrix)
        if matrix(i) > max
            nextMat(counter) = max;
            max = matrix(i);
        elseif matrix(i) < min
            nextMat(counter) = min;
            min = matrix(i);
        else
            nextMat(counter) = matrix(i);    
        end
        counter = counter + 1;        
    end    
    ord(1) = max;
    ord(length(matrix)) = min;
    ord(2:length(matrix)-1) = gsort(nextMat);
end
