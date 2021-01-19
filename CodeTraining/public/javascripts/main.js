$(document).ready( () => {
    initForm();
    configureForm();
});
function validateEmail(val){
    const re = /\S+@\S+\.\S+/;
    return re.test(val);
}
function validatePhone(val){
    const re = /\(\d{3}\)\d{3}-\d{2}-\d{2}/;
    return re.test(val);
}


function validateForm(){
    let nameVal = $('#name').val();
    let surnameVal = $('#surname').val();
    let emailVal = $('#email').val();
    let phoneVal = $('#phone').val();
    let detailsVal = $('#details').val();
    let accept = true;

    if (nameVal.trim() == '') {
        $('#nameMsg').addClass('error').text(mandatory);
    }
    else $('#nameMsg').removeClass('error');

    if (surnameVal.trim() == '') {
        $('#surnameMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else $('#surnameMsg').removeClass('error');

    if(emailVal.trim() == ''){
        $('#emailMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else if (!validateEmail(emailVal.trim())) {
        $('#emailMsg').addClass('error').text(emailError);
        accept = false;
    }
    else $('#emailMsg').removeClass('error');

    if(phoneVal.trim() == ''){
        $('#phoneMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else if (!validatePhone(phoneVal.trim())) {
        $('#phoneMsg').addClass('error').text(phoneError);
        accept = false;
    }
    else $('#phoneMsg').removeClass('error');

    if (detailsVal.trim() == '') {
        $('#detailsMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else $('#detailsMsg').removeClass('error');

    return accept;
}

function configureForm(){
    const form =  $('#targetForm');
    form.submit(e => {
        e.preventDefault();
        if(!validateForm()) return;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/data/appliers/add',
            data: form.serialize(),
            success: (data) => {
                form.find("input[required=true]");
                form.find("input[type=text], textarea").val("");
                clearMsg();
                if(emailConfirmation) alert('Confirm your email by clicking on link');
                else alert('You was registered!');
            },
            error: (xhr, status, err) =>{
                alert('This email is already registered');
                console.error(xhr.responseText)
            }

        });
    });
}

function initForm(){
    function cap1(word){
        return  word.charAt(0).toUpperCase() + word.slice(1);
    }

    $('#nameLbl').text(cap1(name));
    $('#name').prop('placeholder',cap1(enter +' '+name));
    $('#surnameLbl').text(cap1(surname));
    $('#surname').prop('placeholder',cap1(enter + ' '+surname));
    $('#emailLbl').text(cap1(email));
    $('#email').prop('placeholder',cap1(enter + ' '+email));
    $('#phoneLbl').text(cap1(phone));
    $('#phone').prop('placeholder',cap1('(xxx)xxx-xx-xx'));
    $('#detailsLbl').text(cap1(details));
    $('#details').prop('placeholder',cap1(enter + ' '+details));
    $('#submit').text(cap1(submit));
    $('#reset').text(cap1(reset));
}

function clearMsg() {
    $('span.error').removeClass('error');
}