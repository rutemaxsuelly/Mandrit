function testDissonanceProperties(functionName)
% propriedade 1: independencia da fundamental
% propriedade 2: independencia da oitava
% propriedade 3: inter-independencia da oitava (para cada nota)
% propriedade 4: ponderacao pelas intensidades --> intensidade 0 é o mesmo
%                de nao haver a nota
% validacao: testes com usuarios

disp('testing dissonance evolution on 2 values (3M > 5 > T)');
x = eval([functionName '(1,2,1,1);']);
disp(['1:2 = ' num2str(x)]);
x = eval([functionName '(1,3,1,1);']);
disp(['1:3 = ' num2str(x)]);
x = eval([functionName '(1,4,1,1);']);
disp(['1:4 = ' num2str(x)]);
x = eval([functionName '(1,5,1,1);']);
disp(['1:5 = ' num2str(x)]);

disp('testing dissonance evolution on 3 values (if a:b > a:c -> a:b:d > a:c:d and a:b:d >= a:b)');
x = eval([functionName '(1,5,1,1);']);
disp(['1:5 = ' num2str(x)]);
x = eval([functionName '(1,2,5,1,1,1);']);
disp(['1:2:5 = ' num2str(x)]);
x = eval([functionName '(1,3,5,1,1,1);']);
disp(['1:3:5 = ' num2str(x)]);
x = eval([functionName '(1,4,5,1,1,1);']);
disp(['1:4:5 = ' num2str(x)]);

disp('testing weigth influence (if w1 > w2 -> a*w1:b*w3 > a*w2:b*w3 and a*w1:b*w2:c*0 == a*w1:b*w2)');
x = eval([functionName '(1,2,5,1,1,1);']);
disp(['1*1:2*1:5*1 = ' num2str(x)]);
x = eval([functionName '(1,2,5,1,0.5,1);']);
disp(['1*1:2*0.5:5*1 = ' num2str(x)]);
x = eval([functionName '(1,2,5,1,0,1);']);
disp(['1*1:2*0:5*1 = ' num2str(x)]);
x = eval([functionName '(1,5,1,1);']);
disp(['1*1:5*1 = ' num2str(x)]);

disp('testing octave independency (a:b == 2a:2b and a:b == a:2b)');
x = eval([functionName '(1,2,1,1);']);
disp(['1:2 = ' num2str(x)]);
x = eval([functionName '(2,4,1,1);']);
disp(['2:4 = ' num2str(x)]);
x = eval([functionName '(17,34,1,1);']);
disp(['17:34 = ' num2str(x)]);
x = eval([functionName '(2,64,1,1);']);
disp(['2:64 = ' num2str(x)]);
x = eval([functionName '(1,3,9,1,1,1);']);
disp(['1:3:9 = ' num2str(x)]);

disp('testing order influence (3:5:1 == 1:3:5 and fundamental independent 2:3:5 == 3:5:8)');
x = eval([functionName '(1,2,5,1,1,1);']);
disp(['1:2:5 = ' num2str(x)]);
x = eval([functionName '(2,5,1,1,1,1);']);
disp(['2:5:1 = ' num2str(x)]);
x = eval([functionName '(5,2,1,1,1,1);']);
disp(['5:2:1 = ' num2str(x)]);
x = eval([functionName '(2,64,1,1);']);
disp(['2:64 = ' num2str(x)]);
x = eval([functionName '(64,2,1,1);']);
disp(['64:2 = ' num2str(x)]);
x = eval([functionName '(2,3,5,1,1,1);']);
disp(['2:3:5 = ' num2str(x)]);
x = eval([functionName '(3,5,8,1,1,1);']);
disp(['3:5:8 = ' num2str(x)]);

