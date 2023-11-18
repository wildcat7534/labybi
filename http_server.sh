#!/bin/bash
lauched_dir="$(pwd)";
current_dir="$(readlink -f ${0%/*})";
current_root="$(basename "$current_dir")";
log_ip="$(ip address)";
my_ip="$(ip address | grep -m1 -o 'inet.*brd' | sed -E "s/(\/\w*)|([^0-9\.])//g")";

xterm \
-fg white \
-bg darkblue \
-fa 'Monospace' \
-fs 7 \
-T "$my_ip  >>>>  Serveur HTTP actif : [$current_root]" \
-e "echo Serveur personnel; \
		echo en cours...; \
		echo ''; \
		echo ''; \
		echo Projet : $current_root; \
		echo ''; \
		echo Accès partagé : http://$my_ip:8000; \
		echo Accès local : http://localhost:8000/; \
		cd $current_dir; \
		echo ''; \
		echo ''; \
		python -m SimpleHTTPServer 8000" \
		&




