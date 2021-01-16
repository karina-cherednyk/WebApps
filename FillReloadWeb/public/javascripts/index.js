$( document ).ready(() => fillContent());

function appendCard(book){

    let cardBody = $("<div></div>").addClass('card-body');
    let cardTitle = $("<h5></h5>").addClass('card-title').text(book.title);
    let cardSubtitle =  $("<h6</h6>").addClass('card-subtitle text-muted').text(book.author);
    let cardText = $("<p></p>").addClass('card-text').text(book.description);
    cardBody.append([cardTitle, cardSubtitle, cardText]);

    $("<div></div>").addClass('card mb-3').append(cardBody).prependTo('#content');
}

function fillContent(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/data',
        success: (books) => {
            books.forEach( book => appendCard(book));
        },
        error: (xhr, status, err) =>
            console.error(xhr.responseText)
});
}

const socketUrl = `ws://localhost:4000/data`;
const socket = new WebSocket(socketUrl);

socket.onopen = () =>
    console.log('Socket connection opened');

socket.onclose = () => console.log('Socket connection closed');

socket.onmessage = e => {
    appendCard(JSON.parse(e.data));
};