#API MANDRIT Version (0.1) Extracting music data from Rhythm MIDI files and converting to CSV
#by: Rute Maxsuelly, Giordano Cabral e Delando Junior. (MUSTIC - 2021)
import py_midicsv

#Carrega o arquivo MIDI e transforma em CSV
folder = "C:\\Users\\rutem\\Documents\\GitHub\\Music_Visual\\MandRit\\midicsv\\"
filename = "midi_file\\Base_MandRit\\_Plotar_Midis\\bateria150.mid"
csv_string = py_midicsv.midi_to_csv(folder + filename)
nome_do_csv = folder + "csv\\File_tracksname\\bateria1504por4_32.csv"

#Function that gets information from the MIDI header
def get_bars(csv_string):
    for line in csv_string:
        col = line.split(",")
        event = col[2]
        if(event == " Header"):
            bars = col[-1]
        bars.replace("\n", "")
        return int(bars)

#Function extracts the meta-event from the time signature (ex: 4/4...)
def get_time_signature(csv_string):
    for line in csv_string:
        col = line.split(",")
        event = col[2]
        if(event == " Time_signature"):
            numerator = col[3]
            denominator = col[4]
            numerator.replace("\n", "")
            denominator.replace("\n", "")
            return int(numerator), int(denominator)

# Function that transforms output to CSV from MIDI file info
def csv_formater(line, ticksPerBeat, numerator, denominator):
    #tempo;note;velocity;channel;bars
    col = line.split(",")
    event = col[2]
    if(event == " Note_on_c"):
        track = int(col[0])
        nota = col[-2]

        #Calculation that determines beats per measure and applies the logic of the time signature (4/4, 2/4...)
        beatsPerBars = 4*numerator/2**denominator
        #TicksPerBeat e a unidade de tempo no MIDI, entao o Clocks realiza o calculo a cada ticksPerBeat pelo de seu bars (beatsPerBars);
        clocks_per_bars = ticksPerBeat* beatsPerBars
        #Parametro para o usuario verificar a regularidade da música pela "Janela de analise" pode ser determinada em valores diversos (4/ 5/ 6/ 2/ 0.5);
        sizeAnalysis = 4
        windowAnalyze = sizeAnalysis*clocks_per_bars
        #tempo = deltatime(em tiques na sequência MIDI);
        tempo = int(col[1].replace(" "," "))
        #Faz o modulo das divisões do bars (garante que o resto da divisao entre - sub_division_measure / windowAnalyze- serao sempre entre 0 e 1);
        sub_division_measure= tempo%windowAnalyze
        print("tempoTick", tempo)
        
        #Parametro para usuario verificar a regularidade e em quantas partes quer dividir o bars (64, 32, 8);
        granularidade = 32

        #print("clocks por bars", clocks_per_bars)
        #print("windowAnalyze", windowAnalyze)
        #print("subdivisao bars", sub_division_measure)
        
        #O metodo "Round" realiza arredondamento dos valores(em tiques) da subdivisao do bars para aglutinar as informacões com valores muito proximos.
        return track, int(round(sub_division_measure /windowAnalyze*granularidade))%granularidade, nota
    else:
        return None, None, None

#Funcao que condiciona a relacao correspondente da quantidade de notas em funcao do tempo e das tracks.
def separate_note_por_bars(csv_string):
    ticksPerBeat = get_bars(csv_string)
    numerator, denominator = get_time_signature(csv_string)
    dic_matrix = {}
    for line in csv_string:
        print(line)
        track, sub_division_measure, nota = csv_formater(line, ticksPerBeat, numerator, denominator)
        #print("Subdivisao pos conversao", sub_division_measure)
        if(track == None):
            continue
        if ((track, sub_division_measure) in dic_matrix.keys()):
            # O metodo "append" realiza a contagem dos eventos e adciona a uma lista seus valores guardando-os em um dicionario.
            dic_matrix[(track, sub_division_measure)].append(nota)
        else:
            dic_matrix[(track, sub_division_measure)] = [nota]
    
    return dic_matrix

#Funcao que organiza dados em formato de Matriz e gera o CSV      
dic_matrix = separate_note_por_bars(csv_string)
with open(nome_do_csv, "w") as output_file:
    output_file.write("X,Y,Total_notes\n")
    for x in dic_matrix:
        #O metodo "len" so extrai o dic_Matrix e ignora as informacoes de velocidade, duracao e qual tipo da nota. 
        to_write = f"{x[0]},{x[1]},{len(dic_matrix[x])}\n"
        output_file.write(to_write)
