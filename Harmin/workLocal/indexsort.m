function ord = indexsort(matrix, indexmat)
ord = zeros(length(matrix),1);

if (length(matrix) < 2)
    ord = indexmat;
else
    if(matrix(1) > matrix(2))
        max = matrix(1);
        indexMax = indexmat(1);
        min = matrix(2);
        indexMin = indexmat(2);
    else
        max = matrix(2);
        indexMax = indexmat(2);
        min = matrix(1);
        indexMin = indexmat(1);
    end    
    
    if (length(matrix) > 2)
        nextMat = zeros(length(matrix)-2,1);
        nextIndexMat = zeros(length(matrix)-2,1);
        counter = 1;
        for i=3:length(matrix)
            if matrix(i) > max
                nextMat(counter) = max;
                nextIndexMat(counter) = indexMax;
                max = matrix(i);
                indexMax = indexmat(i);
            elseif matrix(i) < min
                nextMat(counter) = min;
                nextIndexMat(counter) = indexMin;
                min = matrix(i);
                indexMin = indexmat(i);
            else
                nextMat(counter) = matrix(i);    
                nextIndexMat(counter) = indexmat(i);
            end
            counter = counter + 1;        
        end    
        ord(2:length(matrix)-1) = indexsort(nextMat, nextIndexMat);
    end
    
    ord(1) = indexMax;
    ord(length(matrix)) = indexMin;
end
