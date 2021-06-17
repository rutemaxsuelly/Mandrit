TEXFILES:=$(shell ls *.tex)
BIBFILES:=$(shell ls *.bib)
FIGURES:=$(shell ls fig/*)
STYLE:=$(shell ls *.sty)
DOCX:=$(shell ls *.docx)
MAIN=paper_sbcm

all: paper_sbcm.pdf

paper_sbcm.pdf : $(TEXFILES) $(BIBFILES) $(FIGURES) $(STYLE)
	echo $(TEXFILES)
	pdflatex $(MAIN)
	bibtex $(MAIN)
	pdflatex $(MAIN)
	pdflatex $(MAIN)

zip :
	zip sbcm2019.zip $(STYLE) $(TEXFILES) $(BIBFILES) $(FIGURES) $(MAIN).pdf $(DOCX) Makefile
