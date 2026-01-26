from docutils import nodes
from urllib.parse import quote

def tag_role(name, rawtext, text, lineno, inliner, options={}, content=[]):
    # Get the Sphinx application object from the inliner
    app = inliner.document.settings.env.app
    
    # Retrieve the dictionary from _config.yml
    # We use getattr to safely access the config or return an empty dict
    tags_dict = getattr(app.config, 'ilo_tags', {})
    
    # 'text' is the short key (e.g., "tag1")
    key = text.strip()
    
    # Look up the long label; fallback to the key itself if not found
    label = tags_dict.get(key, key)
    
    # Build the HTML
    escaped_label = quote(label)
    html = (
        f'<a href="../search.html?q={escaped_label}" '
        f'class="sd-badge sd-outline-primary sd-rounded-pill">'
        f'{label}</a>'
    )
    
    node = nodes.raw('', html, format='html')
    return [node], []

def setup(app):
    # Register the config variable so Sphinx knows it exists
    app.add_config_value('ilo_tags', {}, 'env')
    app.add_role('ilo', tag_role)
    return {'version': '0.2', 'parallel_read_safe': True}