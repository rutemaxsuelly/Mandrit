function [pond, rec] = mlcm(varargin)
inCellArray = varargin{1};
w = varargin{2};
pond = 0;
if (length(inCellArray) < 2)
    'error: must have at least 2 values'
    rec = 1;
else    
    rec = 1;
    for i=1:length(inCellArray)
        newRec = lcm(rec, inCellArray{i});
        pond = pond+(newRec/rec-1)*(w{i});
        rec = newRec;
    end
end