const API_URL = 'https://api.lyrics.ovh';
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
// SEARCH BY SONG OR ARTIST
async function searchSongs(term) {
  // fetch(`${API_URL}/suggest/${term}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}
// SHOW SONG AND ARTIST TO DOM
function showData(data) {
  let output = '';
  data.data.forEach((song) => {
    output += `
    <li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    <!-- <img src=${song.artist.picture_small} alt="Girl in a jacket"> -->
    </li>`;
  });
  result.innerHTML = `<ul class="songs">${output}</ul>`
  // result.innerHTML = `<ul class="songs">
  // ${data.data
  //   .map(
  //     (song) =>
  //       `<li>
  //   <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //   <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //   <!-- <img src=${song.artist.picture_small} alt="Girl in a jacket"> -->
  //   </li>`
  //   )
  //   .join('')}
  // </ul>`;
}
// EVENT LISTENERS
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert('PLEASE TYPE SOMENTHING');
  } else {
    searchSongs(searchTerm);
  }
});
