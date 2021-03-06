

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent='From JavaScript';

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    const location = search.value;
    url = '/weather?address=' + location ;

    messageOne.textContent = '搜尋數據...';
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
                console.log(data.error);
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
});
