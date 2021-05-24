#API MANDRIT Versao (0.1) Extracao de dados musicais do Ritmo de arquivos MIDI e conversao em CSV
#Por: Rute Maxsuelly, Giordano Cabral e Delando Junior. (MUSTIC - 2020)
import py_midicsv

#Carrega o arquivo MIDI e transforma em CSV
folder = "C:\\Users\\rutem\\Documents\\GitHub\\Music_Visual\\MandRit\\midicsv\\"
filename = "midi_file\\Base_MandRit\\_Plotar_Midis\\bateria150.mid"
csv_string = py_midicsv.midi_to_csv(folder + filename)
nome_do_csv = folder + "csv\\File_tracksname\\bateria1504por4_32.csv"

#Funcao que pega informacoes do cabecalho do MIDI
def get_compasso(csv_string):
    for line in csv_string:
        col = line.split(",")
        event = col[2]
        if(event == " Header"):
            compasso = col[-1]
        compasso.replace("\n", "")
        return int(compasso)

#Funcao extrai o metaevento da formula do compasso(ex: 4/4...)
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

# Funcao que transforma o output para o CSV a partir das infos do arquivo MIDI
def csv_formater(line, ticksPerBeat, numerador, denominador):
    #tempo;note;velocity;channel;compasso
    col = line.split(",")
    event = col[2]
    if(event == " Note_on_c"):
        track = int(col[0])
        nota = col[-2]

        #Calculo que determina as batidas por compasso e aplica a logica da formula do compasso (4/4, 2/4...)
        beatsPorCompasso = 4*numerador/2**denominador
        #TicksPerBeat e a unidade de tempo no MIDI, entao o Clocks realiza o calculo a cada ticksPerBeat pelo de seu compasso (beatsPorCompasso);
        clocks_por_compasso = ticksPerBeat* beatsPorCompasso
        #Parametro para o usuario verificar a regularidade da música pela "Janela de analise" pode ser determinada em valores diversos (4/ 5/ 6/ 2/ 0.5);
        tamanhoAnalise = 4
        janelaAnalise = tamanhoAnalise*clocks_por_compasso
        #tempo = deltatime(em tiques na sequência MIDI);
        tempo = int(col[1].replace(" "," "))
        #Faz o modulo das divisões do compasso (garante que o resto da divisao entre - sub_divisao_compasso / janelaAnalise- serao sempre entre 0 e 1);
        sub_divisao_compasso= tempo%janelaAnalise
        print("tempoTick", tempo)

        #Parametro para usuario verificar a regularidade e em quantas partes quer dividir o compasso (64, 32, 8);
        granularidade = 32

        #print("clocks por compasso", clocks_por_compasso)
        #print("janelaAnalise", janelaAnalise)
        #print("subdivisao compasso", sub_divisao_compasso)
        #O metodo "Round" realiza arredondamento dos valores(em tiques) da subdivisao do compasso para aglutinar as informacões com valores muito proximos.
        return track, int(round(sub_divisao_compasso /janelaAnalise*granularidade))%granularidade, nota
    else:
        return None, None, None

#Funcao que condiciona a relacao correspondente da quantidade de notas em funcao do tempo e das tracks.
def separate_note_por_compasso(csv_string):
    ticksPerBeat = get_compasso(csv_string)
    numerador, denominador = get_time_signature(csv_string)
    dic_matrix = {}
    for line in csv_string:
        print(line)
        track, sub_divisao_compasso, nota = csv_formater(line, ticksPerBeat, numerador, denominador)
        #print("Subdivisao pos conversao", sub_divisao_compasso)
        if(track == None):
            continue
        if ((track, sub_divisao_compasso) in dic_matrix.keys()):
            # O metodo "append" realiza a contagem dos eventos e adciona a uma lista seus valores guardando-os em um dicionario.
            dic_matrix[(track, sub_divisao_compasso)].append(nota)
        else:
            dic_matrix[(track, sub_divisao_compasso)] = [nota]
    
    return dic_matrix

#Funcao que organiza dados em formato de Matriz e gera o CSV      
dic_matrix = separate_note_por_compasso(csv_string)
with open(nome_do_csv, "w") as output_file:
    output_file.write("X,Y,Total_de_notas\n")
    for x in dic_matrix:
        #O metodo "len" so extrai o dic_Matrix e ignora as informacoes de velocidade, duracao e qual tipo da nota. 
        to_write = f"{x[0]},{x[1]},{len(dic_matrix[x])}\n"
        output_file.write(to_write)
