FROM mysql:8.0

# Copy initialization scripts
COPY init/*.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306