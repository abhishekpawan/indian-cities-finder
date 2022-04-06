const search = document.getElementById("search");
const matchlist = document.getElementById("match-list");

// search states.json and filter

const searchStates = async (searchText) => {
  const res = await fetch("https://gist.githubusercontent.com/abhishekpawan/cf56a7bf99f249f7bbc2e22eae6a8364/raw/c09f3ccc7da1e637411a176e5b0147114b80bf98/india.json");
  const states = await res.json();

  // Get matches to current text input
  let matches = states.filter((state) => {
    const ragex = new RegExp(`^${searchText}`, "gi");
    return state.city.match(ragex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchlist.innerHTML = '';
  }

  output(matches);
};

//show result in html
const output = (matches) => {
  if (matches.length > 0) {
    const html = matches.map(
      (match) => `
              <div class ="card card-body mb-1 mt-1">
              <h4>${match.city}, <span class="text-primary">${match.admin_name}</span>
              </h4>
              <small>Lat: ${match.lat} / Long: ${match.long}</small>
              </div>
            `
    ).join('');

    matchlist.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
