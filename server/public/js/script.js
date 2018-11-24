$(function() {
    const board = $('#board')
    // Make a get request to the server to retrieve buttons
    $.get('/button', (data) => {
        data.forEach((button) => {
            // Create a new element for each button
            var btn = document.createElement('div')
            btn.className = 'btn prettybox'
            btn.id = button.id
            var span = document.createElement('span')
            span.innerText = button.name
            btn.append(span)
            // Insert the element into the container
            board.append(btn)
        })
    }).done(() => {
        // Create click event handler
        $('.btn').on('click', (event) => {
            const requestData = { button: event.currentTarget.id }
            $.ajax({
                type: 'POST',
                url: '/button',
                data: JSON.stringify(requestData),
                contentType: 'application/json'
            })
        })
    })
})