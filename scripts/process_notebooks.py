import nbformat
import glob
import os

def process_notebook(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            nb = nbformat.read(f, as_version=4)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return

    metadata = nb.get('metadata', {})
    kernelspec = metadata.get('kernelspec', {})
    kernel_name = kernelspec.get('name')
    
    is_matlab = (kernel_name == 'jupyter_matlab_kernel')
    
    if not is_matlab:
        return

    code_cells = [cell for cell in nb.cells if cell.cell_type == 'code']
    target_line = "set(groot, 'defaultLineLineWidth', 2);"
    
    if not code_cells:
        # If there is no code-cell, but the kernel is set to "jupyter_matlab_kernel" remove this kernel
        print(f"Cleaning metadata for empty MATLAB notebook: {file_path}")
        nb.metadata.kernelspec = {}
        nb.metadata.language_info = {}
        changed = True
    else:
        # Check if we already added the cell to avoid duplicates
        already_added = False
        first_code_cell = code_cells[0]
        if 'remove-cell' in first_code_cell.get('metadata', {}).get('tags', []) and \
           target_line in first_code_cell.source:
            already_added = True

        changed = False
        
        # 1. Remove target line from all existing code cells (except our injected one if it exists)
        for cell in nb.cells:
            if cell.cell_type == 'code':
                # Skip our injected cell if we are re-running
                if already_added and cell == first_code_cell:
                    continue
                
                lines = cell.source.splitlines()
                new_lines = [line for line in lines if target_line not in line]
                
                if len(new_lines) != len(lines):
                    cell.source = "\n".join(new_lines)
                    changed = True

        # 2. Add the new cell if not already present
        if not already_added:
            new_cell = nbformat.v4.new_code_cell(source=target_line)
            new_cell.metadata['tags'] = ['remove-cell']
            
            # Find index of first code cell to insert before it
            first_code_idx = -1
            for i, cell in enumerate(nb.cells):
                if cell.cell_type == 'code':
                    first_code_idx = i
                    break
            
            if first_code_idx != -1:
                nb.cells.insert(first_code_idx, new_cell)
                changed = True
                print(f"Added setup cell and cleaned up {file_path}")
            else:
                # Should not happen given code_cells check above
                pass
        elif changed:
            print(f"Cleaned up existing target lines in {file_path}")

    if changed:
        with open(file_path, 'w', encoding='utf-8') as f:
            nbformat.write(nb, f)

if __name__ == "__main__":
    notebooks = glob.glob("book/**/*.ipynb", recursive=True)
    for nb_path in notebooks:
        # Skip checkpoint files
        if ".ipynb_checkpoints" in nb_path:
            continue
        process_notebook(nb_path)
