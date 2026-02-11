import nbformat
from nbconvert.preprocessors import ExecutePreprocessor
import glob
import os

def execute_notebook(file_path):
    print(f"Processing: {file_path}")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            nb = nbformat.read(f, as_version=4)
    except Exception as e:
        print(f"  Error reading {file_path}: {e}")
        return

    kernelspec = nb.get('metadata', {}).get('kernelspec', {})
    kernel_name = kernelspec.get('name')

    if not kernel_name:
        print(f"  Skipping: No kernel specified in metadata.")
        return

    print(f"  Executing with kernel: {kernel_name}")
    ep = ExecutePreprocessor(timeout=600)
    
    try:
        ep.preprocess(nb, {'metadata': {'path': os.path.dirname(file_path)}})
        with open(file_path, 'w', encoding='utf-8') as f:
            nbformat.write(nb, f)
        print(f"  Successfully executed and updated {file_path}")
    except Exception as e:
        print(f"  Error executing {file_path}: {e}")

if __name__ == "__main__":
    notebooks = glob.glob("book/**/*.ipynb", recursive=True)
    for nb_path in notebooks:
        if ".ipynb_checkpoints" in nb_path:
            continue
        execute_notebook(nb_path)
