# Use the official R image as the base image
FROM rstudio/plumber:v1.2.0

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libz-dev \
    lbzip2 \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install R packages
RUN R -e "install.packages('BiocManager', repos='http://cran.rstudio.com/')"
RUN R -e "BiocManager::install('ginmappeR')"

# Copy the Gintegrator web files
COPY web /usr/share/nginx/html/web

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the ports for the API and web server
EXPOSE 1234 80

# Start the plumber API and NGINX
ENTRYPOINT ["R", "-e", \
    "library(plumber); pr <- plumb_api('ginmappeR', 'ginmappeR-API-server'); pr$run(host = '0.0.0.0', port=1234, docs=FALSE)"]