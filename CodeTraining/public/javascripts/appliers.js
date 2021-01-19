function changeStatus( aId, status){
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/data/appliers/status',
        data: { "id": aId, "status": status },
        success: (data) => {
            alert('Status was changed!');
        },
        error: (xhr, status, err) =>
            console.error(xhr.responseText)
    });
}