function createRaminhoDB(wavPath, wavFileName, seqPath, seqFileName, introLength)
if (nargin < 5)
    introLength = 0;
end
cd(seqPath);
baseName = strtok(wavFileName, '.');
dbSeqName = [baseName 'Sequence.db'];
dbSegsNChordsName = [baseName 'SegsNChords.db'];
dbChromaName = [seqPath '\' baseName 'Chroma.db'];
%create sequence file, and get the list of chords
seq = readTranscripted(seqFileName, dbSeqName);
seqLength = length(seq);
%create the chroma file and check if wave has the wright length
numSegs = createChromaFile(wavPath, wavFileName, seqLength, dbChromaName, introLength);
cd(seqPath);
%create the segs and chords file
SnC = fopen(dbSegsNChordsName, 'w');
for i = 1:numSegs
    fprintf(SnC, '%s\t %0.3d\t %d\n\r', wavFileName, i, seq(i));
end
fclose(SnC);
%create C++ code
cppName = [baseName '.ini'];
cppFile = fopen(cppName, 'w');
fprintf(cppFile, 'Lembrar de mudar \ para \\, e transformar caminhos absolutos em relativos\n\r\n\r', wavPath);
fprintf(cppFile, 'retrieval_compDir = "%s";\n\r', wavPath);
fprintf(cppFile, 'retrieval_FeaturesFileName = "%s";\n\r', dbChromaName);
fprintf(cppFile, 'retrieval_SegsNChordsFileName = "%s";\n\r', dbSegsNChordsName);
fprintf(cppFile, 'learning_MarkovDBFileName = "%s";\n\r', dbSeqName);
fclose(cppFile);