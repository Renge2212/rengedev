#
# Gunicorn config file
#
from glob import glob

wsgi_app = 'app:app'

bind = "0.0.0.0:8000"

reload = True
reload_extra_file = glob('templates/**', recursive=True) + glob('static/**', recursive=True)
print(glob('templates/**', recursive=True) + glob('static/**', recursive=True))