"use strict";

import { parseHTML } from "./utils/parseHTML.js";

// DOM elements that we will use
const footerDeal = document.getElementById("page-footer");

function main() {
    loadFooter();

    // Enable Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////////////////////////////////////////////////////////////////////////

function loadFooter() {
    var currentYear = new Date().getFullYear();

    footerDeal.appendChild(parseHTML(`<div>
        <footer class='deal-footer'>
        <br>
        <div class="row">
            <div class="col-sm-0 col-md-1"></div>

            <div class="col-sm-6 col-md-3 my-auto">
                <p class="text-center" style="margin-top: 1em;">
                    Data Engineering Applications Laboratory<br>
                    ETSII. Avda. Reina Mercedes, s/n<br>
                    41012 Seville, Spain<br>
                </p>
            </div>
            <div class="col-sm-6 col-md-2 my-auto text-center">
                <img src="images/logo_etsii.png" class="img-fluid" style="border:0; margin: auto; display: block; margin-top: 1em;"
                    alt="Logo de la escuela técnica superior de ingeniería informática.">

                <img src="images/logo_us.png" class="img-fluid" style="border:0; margin: auto; display: block; max-width: 5em"
                    alt="Logo de la universidad de sevilla">
            </div>


            <div class="col-sm-6 col-md-3 my-auto">
                <img src="images/logo_gobierno1.png" class="img-fluid" style="border:0; margin: auto; display: block; margin-top: 1em;max-width: 12em;" alt="logo del ministerio de universidades">
                <img src="images/logo_gobierno2.png" class="img-fluid mt-2" style="border:0; margin: auto; display: block; max-width: 12em;" alt="logo del ministerio de educación">
            </div>

            <div class="col-sm-6 col-md-2 my-auto">
                <img src="images/logo_junta.png" class="img-fluid" style="border:0; margin: auto; display: block; max-width: 10em; margin-top: 1em;" alt="logo de la junta de andalucía">
            </div>

            <div class="col-sm-0 col-md-1 my-auto text-center"></div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12 text-center">
                <p id="year-footer">
                    Copyright ©${currentYear} <a href="https://deal.us.es/">DEAL</a> 
                    | 
                    <span data-bs-toggle="tooltip" style="text-decoration: underline; cursor: pointer;" data-bs-placement="right" title="Facing any issue? Contact us at: fsola@us.es">Contact us</span>
                </p>
            </div>
        </div>
    </footer><div>
    `));
}