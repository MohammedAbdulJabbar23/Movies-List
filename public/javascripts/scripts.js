// document.addEventListener('DOMContentLoaded', function () {
//     const movieForm = document.getElementById('movieForm');
//     const movieList = document.getElementById('movieList');
//     const genreSelect = document.getElementById('genre');
//     const yearInput = document.getElementById('year');
  
//     // Movie genres
//     const genres = ["",'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  
//     // Function to add a new movie to the list
//     function addMovieToList(title, genre, year) {
//       const li = document.createElement('li');
//       li.className = 'list-group-item';
//       li.innerHTML = `<strong>${title}</strong> - ${genre} (${year})`;
//       movieList.appendChild(li);
//     }
  
//     // Populate the dropdown menu with genre options
//     genres.forEach((genre) => {
//       const option = document.createElement('option');
//       option.textContent = genre;
//       option.value = genre.toLowerCase(); // Set the value attribute to lowercase for easy comparison
//       genreSelect.appendChild(option);
//     });
  
//     // Movie year validation
//     yearInput.addEventListener('input', function () {
//       const currentYear = new Date().getFullYear();
//       const enteredYear = parseInt(yearInput.value);
//       if (isNaN(enteredYear) || enteredYear < 1800 || enteredYear > currentYear) {
//         yearInput.setCustomValidity(`Please enter a valid year between 1800 and ${currentYear}.`);
//       } else {
//         yearInput.setCustomValidity('');
//       }
//     });
  
//     // Handle form submission
//     movieForm.addEventListener('submit', function (e) {
//       e.preventDefault();
//       const formData = new FormData(movieForm);
//       const movieData = {
//         title: formData.get('title'),
//         genre: formData.get('genre'),
//         year: formData.get('year'),
//       };
  

  

//   });
// });
  