function getExerciseData(){
    fetch('js/data.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log(data[0].options[1]);
    })
}

getExerciseData();