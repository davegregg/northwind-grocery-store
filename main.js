
fetch("https://api.potterdb.com/v1/spells")
    .then(response => response.json())
    .then(data => console.log(data))