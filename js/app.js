let page = 1;

const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");

btnNext.addEventListener("click",()=>{
    if(page < 1000){
        page++;
        loadMovies();
    }

});

btnPrevious.addEventListener( "click" , () => {
    if(page > 1){
        page--;
        loadMovies();
    }
});

const loadMovies = async() =>{

    try{
        const answer = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=en-US&page=${page}`);
        console.log(answer);

        let movies = "";
        if(answer.status === 200){
            const data  = await answer.json();
            data.results.forEach(movie =>{
                movies += `
                <div class="movie">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    <h3 class="title">${movie.title}</h3>
                </div>
                <h1>${movie.title}</h1>
                `;
            });
            document.getElementById("container").innerHTML = movies;
        } else if(answer.status === 401){
            console.log("You put the wrong key");
        } else if(answer.status === 404){
            console.log("The movie that you searched doesn't exist");
        } else{
            console.log("There is a unknown error");
        }
    } catch(error){
        console.log(error);
    }
    
}

loadMovies();