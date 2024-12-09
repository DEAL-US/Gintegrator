<p align="center"><img width="60%" src="web/images/gintegrator-logo-lightgrey.svg" alt="Gintegrator logo"></p>

<hr>

<b>Gintegrator</b> is a web application that provides functionalities for translating gene or protein identifiers across various biological sequence databases, including CARD, NCBI Protein, Nucleotide and Gene, UniProt, and KEGG. It allows for easy mapping of identifiers across these databases, ensuring access to the most accurate and up-to-date information.
In addition to identifier mapping, Gintegrator also offers the retrieval of NCBI identical proteins or UniProt similar genes clusters. This makes it a valuable tool for researchers, bioinformaticians, and anyone interested in gene and protein data.

This application is built upon the ginmappeR R language package, available at the <a     href="https://bioconductor.org/packages/ginmappeR">Bioconductor repository</a>. The package provides the core functionalities for identifier translation, which this web application makes accessible through a user-friendly interface.

To use Gintegrator, you have several options:

## Use it online

Visit the online <a href="https://gin.us.es">Gintegrator app</a> deployment.

## Mount it as a Docker container

1. <b>Download Gintegrator</b> Github project.

2. <b>Build and launch the Docker app</b> in the root folder of the project. The created container has two services: the ginmappeR API service at port 1234 and the Gintegrator web app at port 8080.

```
docker-compose up --build
```

3. <b>Access the web app</b> at ``http://localhost:8080``.

## Use it locally installed (manually)

1. <b>Install ginmappeR R package</b> from Bioconductor and plumber from CRAN in your R environment:

```
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")

# The following initializes usage of Bioc devel
BiocManager::install(version='devel')

BiocManager::install("ginmappeR")
```

```
install('plumber')
```
<br>

1. 2 (Optional) <b>Set a NCBI API key</b> to get better requests limits with rentrez package. Simply <a href="https://www.ncbi.nlm.nih.gov/account/">register at NCBI</a> and retrieve your API key in your <a href="https://www.ncbi.nlm.nih.gov/account/settings/">account settings page</a>. Finally, register your API key in rentrez package so it can make use of it:

```
set_entrez_key("your_api_key")
```
<br>


2. <b>Launch ginmappeR API</b> with plumber (you can configure the port on which it will run):

```
plumber::plumb_api("ginmappeR", "ginmappeR-API-server")$run(port=1234)
```
<br>

3. <b>Download Gintegrator</b> Github project and configure `/web/js/api/common.js` with the selected port (by default it is ``1234``):

```
const BASE_URL = "http://localhost:1234";
```
<br>

4. <b>Serve Gintegrator</b> with your preferred web server (e.g. NGINX) or deploy it with <a href="https://github.com/DEAL-US/Silence">Silence</a> framework:

```
### In the Gintegrator folder
$ silence run
```
<br>

5. <b>Access the web app</b> at ``http://localhost:8080`` (default port in Silence, can be configured in file ``settings.py``) or at the defined port by your web server.

### License 

Gintegrator is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Gintegrator is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.



