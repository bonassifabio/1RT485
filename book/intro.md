---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
---

# Introduction

Welcome to this interactive web book!

This resource contains a curated selection of exercises from the book [*Exercise Manual for Automatic Control*](https://uppsala.instructure.com/courses/102131/files/7991063?module_item_id=1296223). 
This collection is here to kickstart your 1RT485 exercise sessions and guide you through solving exercises. 
Take the time to engage with each problem and work through the solutions thoroughly!

Some exercises include corresponding MATLAB code to assist with problem-solving and visualization. To make the most of these exercises, refer to the [**How to Run the Code**](#how-to-run-the-code) section for step-by-step instructions on setting up your environment and running the code smoothly.

```{admonition} Disclaimer
:class: caution
Learn how to solve them step-by-step without relying too much on MATLAB. Remember, you won't have access to MATLAB during the exam, so focus on understanding the concepts and methods!  
```

Happy learning!

(how-to-run-the-code)=
## How to Run the Code

### Using Binder

The easiest way to interactively run the MATLAB code reported in the exercises' solutions is using Binder. Binder is a free and open source service that allows to open and run Jupyter Notebooks from your browser.

To run the code in Binder, just click on the rocket logo in the top navigation bar, and then on "Binder". When the notebook gets opened in Binder, select the **Octave kernel**[^octave].

```{note}
Binder is a free service, and from time to time it might be congested or offline. In this case, retry after a while or open the notebook locally, see below.
```

### Run notebooks locally

#### Setup 

First, the following software needs to be installed on your system:

- **Licensed MATLAB installation**
- **Mamba** (or **Conda**) – any distribution is fine, just make sure that it is in the Environment PATH. See [this documentation](https://github.com/conda-forge/miniforge) if you need help to setup a mamba installation.

Next, create a Conda environment (e.g., named `1RT485`) with the necessary packages:

:::{code}
  mamba create -n 1RT485 -c conda-forge jupyterlab ipywidgets
:::

Then, activate the environemnt with `mamba activate 1RT485` and install the Mathwork's [Jupyter MATLAB Proxy](https://github.com/mathworks/jupyter-matlab-proxy) via `pip`:
:::{code}
  pip install -U jupyter-matlab-proxy && install-matlab-kernelspec
:::

#### Opening Jupyter notebooks

The Jupyter notebook of exercise with code can be downloaded from the website (top-right corner).

To run one of those notebooks, you can open them in Jupyter Lab:

:::{code}
  mamba run -n 1RT485 jupyter lab
:::

Remember to set the notebook's kernel to `MATLAB (1RT485)`. The first time you run MATLAB code in Jupyter, you might be prompted to login with your Mathworks account ([see here](https://github.com/mathworks/jupyter-matlab-proxy?tab=readme-ov-file#notes)).

---

## Contributing

This book is still a work in progress. If you spot any error, you can proceed in two ways:
- Contact me (Fabio Bonassi) via email or on Studium
- Open a Github issue (this makes the discussion easier, but you need a Github account)

You are also welcome to contribute proposing additional exercises or fixing errors in existing ones.


---

[^octave]: Octave is a GNU-GPL scientific programming language that offers, in many cases, a drop-in replacement to MATLAB. See [the website](https://octave.org) for more information.