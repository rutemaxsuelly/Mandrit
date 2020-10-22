function rec = mgcd(varargin)
if (length(varargin) < 2)
    'error: must have at least 2 values'
    rec = 1;
else    
    rec = varargin{1};
    for i=2:length(varargin)
        rec = gcd(rec, varargin{i});
    end
end