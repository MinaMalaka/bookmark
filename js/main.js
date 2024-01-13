var site = document.getElementById('site'),
    link = document.getElementById('link')
// create input validation
site.addEventListener('input', function () {
    var reg = /^[A-z]{3,}$/gi,
        siteIn = site.value;
    if (reg.test(siteIn)) {
        site.classList.add("is-valid");
        site.classList.remove("is-invalid");
        document.getElementById('site-valid').classList.remove('d-none')
        document.getElementById('site-error').classList.add('d-none')

    } else {
        site.classList.add("is-invalid");
        site.classList.remove("is-valid");
        document.getElementById('site-error').classList.remove('d-none')
        document.getElementById('site-valid').classList.add('d-none')
    }
}
);
link.addEventListener('input', function () {
    var reg2 = /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
        urlIn = link.value;
    if (reg2.test(urlIn.toLowerCase())) {
        link.classList.add("is-valid");
        link.classList.remove("is-invalid");
        document.getElementById('valid').classList.remove('d-none')
        document.getElementById('err').classList.add('d-none')
    } else {
        link.classList.add("is-invalid");
        link.classList.remove("is-valid");
        document.getElementById('err').classList.remove('d-none')
        document.getElementById('valid').classList.add('d-none')
    }
}
);
//end input validation.
//start alert popup.
document.getElementById('close').addEventListener('click', function () {
        document.querySelector('.alert').classList.toggle('d-none')
    document.querySelector('.alert-overlay').classList.toggle('d-none')
});
document.querySelector('.alert-overlay').addEventListener('click', function (e) {
    document.querySelector('.alert-overlay').classList.toggle('d-none')
    document.querySelector('.alert').classList.toggle('d-none')
 
})
//end alert popup.
//start save in stotrage.
var dataArr;
if (localStorage.getItem('siteDetails') === null) {
    dataArr = [];
} else {
    dataArr = JSON.parse(localStorage.getItem('siteDetails'))
    display(dataArr);

}
//end save in stotrage.
//start catch input values.
function create() {

    var siteObj = {
        siteName: site.value,
        siteUrl: link.value
    }
    dataArr.push(siteObj);
    display(dataArr);
    localStorage.setItem('siteDetails', JSON.stringify(dataArr));
}
//end catch input values.
//start display input values.
function display(getCreate) {
    var table = ' ';
    for (var i = 0; i < getCreate.length; i++) {
        table += `<tr>
                <td>${i + 1}</td>
                <td>${getCreate[i].siteName}</td>
                <td><button class="btn-1"><i class="fa-solid fa-eye text-white pe-2"></i><a href="${getCreate[i].siteUrl}" target="_blank"> Visit</button></td>
                <td><button id="del" class="btn-2" onclick="deleteUp(${i})"><i class="fa-solid fa-trash-can pe-2 text-white"></i>Delete</button></td>
            </tr>`;
    }
    update()
    document.getElementById('inner-table').innerHTML = table
}
//end display input values.
//start update input values.
function update() {
    site.value = '';
    link.value = '';
    link.classList.remove("is-valid");
    site.classList.remove("is-valid");
    document.getElementById('site-valid').classList.add('d-none')
    document.getElementById('valid').classList.add('d-none')
    document.getElementById('err').classList.add('d-none')
    document.getElementById('site-error').classList.add('d-none')
}
//end update input values.
//start delete input values.
function deleteUp(x) {
    if (confirm('Your data will be permanently deleted')) {
          dataArr.splice(x, 1)
    display(dataArr)
    localStorage.setItem('siteDetails', JSON.stringify(dataArr));
} 
    }
  
//end delete input values.
//start check input values.

document.getElementById('regular').addEventListener('click', function () {
    if (site.classList.contains("is-valid")&&link.classList.contains("is-valid") ) {
       create()

    }else {
        document.querySelector('.alert-overlay').classList.toggle('d-none')
        document.querySelector('.alert').classList.toggle('d-none')
        
    } 
});
//end check input values.
