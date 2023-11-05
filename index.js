document.addEventListener('DOMContentLoaded', function () {
    fetch('./sites/home.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contentContainer').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});