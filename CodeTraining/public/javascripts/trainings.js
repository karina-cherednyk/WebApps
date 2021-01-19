$(document).ready( () => {
    initForm();
    configureForm();
});
function getData(){
    let data = {
        name: {
            en: $('#nameEn').val(),
            ua: $('#nameUa').val()
        },
        slogan: {
            en: $('#sloganEn').val(),
            ua: $('#sloganUa').val()
        },
        details: {
            en: $('#detailsEn').val(),
            ua: $('#detailsUa').val()
        }
    };
    return JSON.stringify(data);
}
function configureForm(){
    const form =  $('#trainForm');
    form.submit(e => {
        e.preventDefault();
        if(!validateForm()) return;
        let data = getData();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/data/trainings/add',
            data: data,
            success: (data) => {
                alert('Training was added');
                form.find("input[required=true]");
                form.find("input[type=text], textarea").val("");
                clearMsg();
            },
            error: (xhr, status, err) =>
                console.error(xhr.responseText)
        });
    });
}


function validateForm(){
    let nameEnVal = $('#nameEn').val();
    let detailsEnVal = $('#detailsEn').val();
    let sloganEnVal = $('#sloganEn').val();

    let nameUaVal = $('#nameUa').val();
    let detailsUaVal = $('#detailsUa').val();
    let sloganUaVal = $('#sloganUa').val();

    let accept = true;

    if (nameEnVal.trim() == '') {
        $('#nameEnMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else $('#nameEnMsg').removeClass('error');

    if (nameUaVal.trim() == ''){
        $('#nameUaMsg').addClass('error').text(mandatory);
    accept = false;
    }
    else $('#nameUaMsg').removeClass('error');

    if (sloganEnVal.trim() == '') {
        $('#sloganEnMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else $('#sloganEnMsg').removeClass('error');

    if (sloganUaVal.trim() == ''){
        $('#sloganUaMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else $('#sloganUaMsg').removeClass('error');


    if (detailsEnVal.trim() == '') {
        $('#detailsEnMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else $('#detailsEnMsg').removeClass('error');

    if (detailsUaVal.trim() == '') {
        $('#detailsUaMsg').addClass('error').text(mandatory);
        accept = false;
    }
    else $('#detailsUaMsg').removeClass('error');

    return accept;
}

function initForm(){
    function cap1(word){
        return  word.charAt(0).toUpperCase() + word.slice(1);
    }
    $('#nameLbl').text(cap1(name));
    $('#nameEn').prop('placeholder',cap1(name +' '+ending+' '+inEn));
    $('#nameUa').prop('placeholder',cap1(name +' '+ending+' '+inUa));

    $('#sloganLbl').text(cap1(slogan));
    $('#sloganEn').prop('placeholder',cap1(slogan +' '+ending+' '+inEn));
    $('#sloganUa').prop('placeholder',cap1(slogan +' '+ending+' '+inUa));

    $('#detailsLbl').text(cap1(details));
    $('#detailsEn').prop('placeholder',cap1(details+' '+ending+' '+inEn));
    $('#detailsUa').prop('placeholder',cap1(details+' '+ending+' '+inUa));

    $('#submit').text(cap1(submit));
    $('#reset').text(cap1(reset));
}
function clearMsg() {
    $('span.error').removeClass('error');
}