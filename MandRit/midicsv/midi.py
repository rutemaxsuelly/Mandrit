import py_midicsv

# Load the MIDI file and parse it into CSV format
folder = "C:\\Users\\rutem\\Documents\\GitHub\\Music_Visual\\MandRit\\midicsv\\"
filename = "midi_file\\Base_MandRit\\_Plotar_Midis\\Samba_de_Uma_Nota2por4_STIPO1.mid"
csv_string = py_midicsv.midi_to_csv(folder + filename)
nome_do_csv = folder + "csv\\File_tracksname\\Samba_de_Uma_Nota2por4_STIPO1.csv"

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

def csv_formater(line, division, numerador, denominador):
    #tempo;note;velocity;channel;compasso
    col = line.split(",")
    event = col[2]
    if(event == " Note_on_c"):
        track = int(col[0])
        nota = col[-2]
        clocks_por_compasso = division*4*numerador/2**denominador
        tempo = int(col[1].replace(" "," "))
        sub_divisao_compasso = tempo%clocks_por_compasso
        return track, sub_divisao_compasso, nota
    else:
        return None, None, None

# Save the parsed MIDI file to disk
def separate_note_por_compasso(csv_string):
    division = get_compasso(csv_string)
    numerador, denominador = get_time_signature(csv_string)
    dic_matrix = {}
    for line in csv_string:
        track, sub_divisao_compasso, nota = csv_formater(line, division, numerador, denominador)
        if(track == None):
            continue
        if ((track, sub_divisao_compasso) in dic_matrix.keys()):
            dic_matrix[(track, sub_divisao_compasso)].append(nota)
        else:
            dic_matrix[(track, sub_divisao_compasso)] = [nota]
    
    return dic_matrix

dic_matrix = separate_note_por_compasso(csv_string)
with open(nome_do_csv, "w") as output_file:
    output_file.write("X,Y,Total_de_notas\n")
    for x in dic_matrix:
        to_write = f"{x[0]},{x[1]},{len(dic_matrix[x])}\n"
        output_file.write(to_write)

