import py_midicsv

# Load the MIDI file and parse it into CSV format
folder = "C:\\Users\\rutem\\Documents\\GitHub\\Music_Visual\\MandRit\\midicsv\\"
filename = "midi_file\\Base_MandRit\\_Plotar_Midis\\bateri.mid"
csv_string = py_midicsv.midi_to_csv(folder + filename)
nome_do_csv = folder + "csv\\File_tracksname\\bateriTEMPO_segundos.csv"

def get_compasso(csv_string):
    for line in csv_string:
        col = line.split(",")
        event = col[2]
        if(event == " Header"):
            compasso = col[-1]
        compasso.replace("\n", "")
        return int(compasso)

def get_time_signature(csv_string):
    for line in csv_string:
        col = line.split(",")
        event = col[2]
        if(event == " Time_signature"):
            numerador = col[3]
            denominador = col[4]
            numerador.replace("\n", "")
            denominador.replace("\n", "")
            return int(numerador), int(denominador)
#print(csv_string)

# Parse the CSV output of the previous command back into a MIDI file
#midi_object = py_midicsv.csv_to_midi(csv_string)

def csv_formater(line, ticksPerBeat, numerador, denominador):
    #tempo;note;velocity;channel;compasso
    col = line.split(",")
    event = col[2]
    if(event == " Note_on_c"):
        track = int(col[0])
        nota = col[-2]
        #Parametro para o usuário 
        tamanhoAnalise = 4
        #/ 5/ 6/ 2/ 0.5
        tiques_por_compasso = ticksPerBeat*4*numerador/2**denominador 
        janelaAnalise = tamanhoAnalise*tiques_por_compasso
        print(janelaAnalise)
        print(ticksPerBeat)
        
        print(tiques_por_compasso)
        #tempo = deltatime registrados na sequência MIDI
        tempoDelta = int(col[1].replace(" "," "))
        sub_divisao_compasso_tiques= tempoDelta%janelaAnalise

        # primeira tentativa calcular tempo em seg
        #MICROSECOND_PER_MINUTES = 60000000
        #tempoSegundos = tempoDelta *(60/ MICROSECOND_PER_MINUTES* ticksperbeat)
        # sub_divisao_compasso= tempoSegundos%janelaAnalise
        # ----------------------------------------------------------------#
        #ou -> 

        #Para músicas 120 BPM
        tempobpm = 120
        microsecondsPerMinute = 1000000*60 / tempobpm
        sub_divisao_compasso_segundos = sub_divisao_compasso_tiques*( 60 / microsecondsPerMinute/tempobpm)* ticksPerBeat
        print(sub_divisao_compasso_segundos)
        return track, sub_divisao_compasso_segundos, nota
    else:
        return None, None, None


# Save the parsed MIDI file to disk
def separate_note_por_compasso(csv_string):
    ticksPerBeat = get_compasso(csv_string)
    numerador, denominador = get_time_signature(csv_string)
    dic_matrix = {}
    for line in csv_string:
        print(line)
        track, sub_divisao_compasso_segundos, nota = csv_formater(line, ticksPerBeat, numerador, denominador)
        if(track == None):
            continue
        if ((track, sub_divisao_compasso_segundos) in dic_matrix.keys()):
            dic_matrix[(track, sub_divisao_compasso_segundos)].append(nota)
        else:
            dic_matrix[(track, sub_divisao_compasso_segundos)] = [nota]
    
    return dic_matrix

dic_matrix = separate_note_por_compasso(csv_string)
with open(nome_do_csv, "w") as output_file:
    output_file.write("X,Y,Total_de_notas\n")
    for x in dic_matrix:
        to_write = f"{x[0]},{x[1]},{len(dic_matrix[x])}\n"
        output_file.write(to_write)

