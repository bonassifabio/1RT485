if [[ ! "$CONDA_PREFIX" =~ book$ ]]; then
    echo "Activate the environment fist. Run 'mamba activate book'"
    exit 1
fi

echo "Installing MATLAB kernel for Jupyter"
install-matlab-kernelspec

echo "Installing Octave's control system toolbox"
octave --eval "pkg install -forge control"

echo "Adding utility functions to Octave's path"
echo "addpath('book/res/matlab')" >> ~/.octaverc