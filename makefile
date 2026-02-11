#!/bin/zsh

default: build

build:
	echo "Building the book"
	MWI_USE_EXISTING_LICENSE=true mamba run -n book jupyter book build ./book --path-output ./

setup:
	cd .dev/
	echo "Creating conda environment"
	mamba env create -y -f environment.yml -n book
	echo "Installing Octave's packages"
	mamba run -n book "install-matlab-kernelspec"
	mamba run -n book octave --eval "pkg install -forge control"
	cd ..

web:
	mamba run -n book ghp-import -n -p -f _build/html

notebooks:
	MWI_USE_EXISTING_LICENSE=true mamba run -n book python3 scripts/execute_notebooks.py

all: build web