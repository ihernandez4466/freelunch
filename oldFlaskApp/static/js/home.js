/* utility functions */
function openDiv(id) {
    document.getElementById(id).style.display = "block";
}
function closeDiv(id) {
    document.getElementById(id).style.display = "none";
}

/* functions called in html */
function viewProduct(event) {
    console.log(event.id);
    productID = event.id.split("-")[1];
    openDiv(`modal-${productID}`);
}
function closeModal(event) {
    console.log(event.id);
    productID = event.id.split("-")[1];
    closeDiv(`modal-${productID}`);
}
// wow so organized