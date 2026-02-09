if [[ ! "$CONDA_PREFIX" =~ book$ ]]; then
    echo "Activate the environment fist. Run 'mamba activate book'"
    exit 1
fi

echo "Installing MATLAB kernel for Jupyter"
install-matlab-kernelspec

echo "Updating .octaverc"
echo "addpath('~/book/res/matlab/'); pkg load control; warning('off', 'all'); if isempty(getenv('BINDER_SERVICE_HOST')); t = 'notebook'; else; t = 'plotly'; end; graphics_toolkit(t);" >> ~/.octaverc
