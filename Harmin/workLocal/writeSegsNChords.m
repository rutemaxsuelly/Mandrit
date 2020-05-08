function seq = writeSegsNChords(fileName, outputFileName)
fid = fopen(fileName, 'rt');
oFile = fopen(outputFileName,'w');
y = 0;
seq = [];
classNumber = 255;
while feof(fid) == 0
    y = y + 1;
    tline = fgetl(fid); 
    numLettersRoot = 1;
    accident = 0;
    if (strcmp(tline, '<255>'))
        fprintf(oFile, '255 \n');
        seq = [seq; 255];
        continue;
    elseif(strcmp(tline, '.'))
        fprintf(oFile, '\n');
        seq = [seq; 255];
        continue;
    elseif(strcmp(lower(tline), 'r'))
        fprintf(oFile, '\n');
        seq = [seq; 255];
        continue;
    elseif(strcmp(lower(tline), 'x'))
        fprintf(oFile, '\n');
        seq = [seq; 255];
        continue;
    elseif(strcmp(tline, 'garbage'))
        fprintf(oFile, '\n');
        seq = [seq; 240];
        continue;
    elseif(strcmp(tline, '/'))
        fprintf(oFile, '%s %d %d \n', fileName, y, classNumber);    
        seq = [seq; classNumber];
        continue;
    elseif(length(tline) > 1)
        if(tline(2) == '#' )
            numLettersRoot = 2;
            accident = 1;
        elseif(tline(2) == 'b' )
            numLettersRoot = 2;
            accident = -1;
        end
    end
    switch (tline(1))
        case 'C'
            root = 0;
        case 'D'
            root = 2;
        case 'E'
            root = 4;
        case 'F'
            root = 5;
        case 'G'
            root = 7;
        case 'A'
            root = 9;
        case 'B'
            root = 11;
        otherwise
            disp('something strange with the root note');
    end
    root = root + accident;
    typeStr = tline(numLettersRoot+1:length(tline));
    if(length(typeStr) == 0)
        type = 0; %'' did not work
    else
        seventh = 0;        
        [typeStr, rest] = strtok(typeStr, '/');
        barInd = findstr('/',tline);
        if(length(barInd) > 0)
            if(barInd(1) == numLettersRoot + 1)
                rest = ['/' typeStr];
                typeStr = '';
            end
        end
        if(length(rest) > 1)
            [interval, bStr] = compInterval(root, rest);
            if(interval == 10)
                seventh = 1;
            end
            typeStr = [typeStr bStr];
        end
        
        switch(typeStr)
            case {'', '7M', '7M(9)','6','6/9', '6(9)','4','7M(#11)', '7M(#5/9)', '7M(6/9)','maj7','maj7(9)','maj7(6)','96','maj7(#9)','96(#11)','(#5)','(omit3)','9','9(#11)','(add9)','6(#11)','maj7(#11)','(#119)','(134)','(13)','(#9)','(#11)','(maj7)','(b13)','maj7(96)','maj7(13#119)','maj7(#5)','maj7(#9#5)','(b9)','(13#9)','maj7(#5','4(add9)'}
                type = 0 + seventh;
            case {'7','7/4','7(b9)','7(9)','7(#9)','7(13)','7(b13)','7(b9','7(b5)','7(#11)','7(#5)','7(9', '4/7(9)','7(b9/b13)','4/7','4/7(13)','7(9/#11)','7/4(b9)','4/7(b9)', 'aug', '7(b9/#11)', '7(b5/b9)','7(#119)','74','7(13b9)','74(9)','7(b13b9)','74(b9)','7(#11b9)','maj7(#119)','7(b9b5)','7(#11#5)','7(9#5)','7(b9#5)','7(#9#5omit3)','7(b13#9)','7(13#9)','7(13#119)','7(13#9)','7(13#11)','7(#11#9)','7(139)','7(#9#5)','7(b139)','7(9#)','7(11)','7(#9b9)','74(b13)'}
                type = 1;
            case {'m', 'm6', 'm(b6)', 'min', 'm6(9)', 'm7M', 'm7M(9)', 'm(7M)', 'm(9)','m(maj7)','m96','m(11maj7)','m(add9)','m(9maj7)','m(11)','m9(maj7)','m(#5)','m9'}
                type = 2 + seventh;
            case {'m7', 'm7(b5)','m7(9)','m7(11)','m7(b5','m7(b5/9)','min7','m74','m7(119)','min7(9)','m7(6)','m7(9b5)'}
                type = 3;
            case {'°','°(b13)','dim7','dim','dim7(b13)','dim(maj7)'}
                type = 4;
            otherwise
                disp(typeStr);
                disp(y);
                pause;
        end
    end
    %disp(tline);
    %disp(root);
    %disp(type);
    classNumber = root * 5 + type;
    fprintf(oFile, '%s %d %d \n', fileName, y, classNumber);    
    seq = [seq; classNumber];
end
fclose(fid); 
fclose(oFile);

function [i, backStr] = compInterval(root, invStr)
    accident = 0;
    backStr = '';
    if(length(invStr) > 2)
        if(invStr(3) == '#' )
            accident = 1;
        elseif(invStr(3) == 'b' )
            accident = -1;
        end
    end
    switch (invStr(2))
        case 'C'
            inv = 0;
        case 'D'
            inv = 2;
        case 'E'
            inv =  4;
        case 'F'
            inv =  5;
        case 'G'
            inv =  7;
        case 'A'
            inv =  9;
        case 'B'
            inv =  11;
        otherwise
            %disp('something strange with the inversion');
            %disp(invStr);
            backStr = invStr;
            i = 0;
            return;
    end
    inv = inv + accident;
 i = mod(inv - root, 12);