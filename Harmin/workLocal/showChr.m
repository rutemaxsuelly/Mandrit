function tempChrTr = showChr(chordTransitions)
%clear transitions to same chord
tempChrTr = chordTransitions;
for i=1:73
    tempChrTr(i,i) = 0;
end
imagesc(tempChrTr);
colormap(gray);

%print Y Axis
set(gca,'YTick',[1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73]);
%set(gca,'YTickLabel','C|C7|Cm|C院Csus||C#|C#7|C#m|C#院C#sus||D|D7|Dm|D院Dsus||D#|D#7|D#m|D#院D#sus||E|E7|Em|E院Esus||F|F7|Fm|F院Fsus||F#|F#7|F#m|F#院F#sus||G|G7|Gm|G院Gsus||G#|G#7|G#m|G#院G#sus||A|A7|Am|A院Asus||A#|A#7|A#m|A#院A#sus||B|B7|Bm|B院Bsus||?')
set(gca,'YTickLabel','M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||?');

yText= '   VII           bVII             VI             bVI             V             bV             IV            III             bIII             II             bII             I';
set(get(gca,'YLabel'),'String',yText);

%print X Axis
set(gca,'XTick',[1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73]);
%set(gca,'YTickLabel','C|C7|Cm|C院Csus||C#|C#7|C#m|C#院C#sus||D|D7|Dm|D院Dsus||D#|D#7|D#m|D#院D#sus||E|E7|Em|E院Esus||F|F7|Fm|F院Fsus||F#|F#7|F#m|F#院F#sus||G|G7|Gm|G院Gsus||G#|G#7|G#m|G#院G#sus||A|A7|Am|A院Asus||A#|A#7|A#m|A#院A#sus||B|B7|Bm|B院Bsus||?')
set(gca,'XTickLabel','M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||M|7|m|院4||?');
yText= '   VII           bVII             VI             bVI             V             bV             IV            III             bIII             II             bII             I';
set(get(gca,'YLabel'),'String',yText);

%print file
printChr(tempChrTr, 'tempChrTr.Tr', 'tempChr');
