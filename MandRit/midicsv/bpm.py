import py_midicsv

# Load the MIDI file and parse it into CSV format
folder = "C:\\Users\\rutem\\Documents\\GitHub\\Music_Visual\\MandRit\\midicsv\\"
filename = "midi_file\\Base_MandRit\\_Plotar_Midis\\everytime4por4TIPO1TESTE.mid"
csv_string = py_midicsv.midi_to_csv(folder + filename)
nome_do_csv = folder + "csv\\File_tracksname\\everytime4por4TIPO1TESTE.csv"

float ppqn

float kMillisecondsPerQuarterNote = tempo / 1000.0f
float kMillisecondsPerTick = kMillisecondsPerQuarterNote / ppqn
float deltaTimeInMilliseconds = tick * kMillisecondsPerTick
printf("deltaTimeInMilliseconds %f \n", deltaTimeInMilliseconds)