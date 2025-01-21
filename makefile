#!/usr/bin/zsh

setup:
	echo "Creating conda environment"
	mamba env create -y -f environment.yml -n book
	echo "Installing Octave's packages"
	mamba run -n book "install-matlab-kernelspec"
	mamba run -n book octave --eval "pkg install -forge control"

build:
	echo "Building the book"
	mamba run -n book jupyter book build ./book --path-output ./

web:
	ghp-import -n -p -f _build/html

all: build web