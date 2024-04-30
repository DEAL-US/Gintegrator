## ginmappeR-web
<b>ginmappeR-web</b> is a web application that provides functionalities for translating gene or protein identifiers across various biological sequence databases, including CARD, NCBI Protein, Nucleotide and Gene, UniProt, and KEGG. It allows for easy mapping of identifiers across these databases, ensuring access to the most accurate and up-to-date information.

In addition to identifier mapping, ginmappeR-web also offers the retrieval of NCBI identical proteins or UniProt similar genes clusters. This makes it a valuable tool for researchers, bioinformaticians, and anyone interested in gene and protein data.

This application is built upon the ginmappeR R language package, available at the <a     href="https://bioconductor.org/packages/ginmappeR">Bioconductor repository</a>. The package provides the core functionalities for identifier translation, which this web application makes accessible through a user-friendly interface.

### Usage
#### Online

Visit the online <a href="https://gin.us.es">ginmappeR-web app</a> deployment.

#### Local

1. Install ginmappeR R package from Bioconductor and plumber from CRAN in your R environment:

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

2. Launch ginmappeR API with plumber (you can configure the port on which it will run):

```
plumb(file='inst/plumber/ginmappeR-API-server/plumber.R')$run(port=1234, swagger=FALSE)
```

3. Download ginmappeR-web project and configure `/web/js/api/common.js` with the selected port (by default it is ``1234``):

```
const BASE_URL = "http://localhost:1234";
```

4. Serve ginmappeR-web with your preferred web server (e.g. NGINX) or deploy it with python <a href="https://github.com/DEAL-US/Silence">Silence</a> framework:

```
### In the ginmappeR-web folder
$ silence run
```

5. Access the web app at ``localhost:8080`` (default port in Silence, can be configured in file ``settings.py``) or at the defined port by your web server.

### License 

ginmappeR web is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

ginmappeR web is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.



