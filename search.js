// // search.js
const products = [
  "Amazon Echo",
  "Google Home",
  "iPhone 12",
  "Samsung Galaxy S21",
  "MacBook Air",
  "Dell XPS 13",
  "Sony PlayStation 5",
  "Xbox Series X",
  "Nintendo Switch",
  "Apple Watch",
];

// // KMP algorithm implementation
function computeLPSArray(pattern, M, lps) {
  let length = 0; // length of the previous longest prefix suffix
  lps[0] = 0; // lps[0] is always 0
  let i = 1;

  while (i < M) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
}

function KMPsearch(text, pattern) {
  let N = text.length;
  let M = pattern.length;

  let lps = Array(M).fill(0);
  computeLPSArray(pattern, M, lps);

  let i = 0; // index for text[]
  let j = 0; // index for pattern[]
  while (i < N) {
    if (pattern[j] === text[i]) {
      j++;
      i++;
    }

    if (j === M) {
      return true; // Pattern found in the text
    } else if (i < N && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return false;
}

// Function to handle input and search
function searchSuggestions() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const suggestionsBox = document.getElementById("suggestionsBox");

  // Clear previous suggestions
  suggestionsBox.innerHTML = "";

  // If input is empty, don't show suggestions
  if (input === "") {
    return;
  }

  // Filter products and show suggestions
  let suggestions = products.filter((product) =>
    KMPsearch(product.toLowerCase(), input)
  );

  // Show suggestions
  suggestions.forEach((suggestion) => {
    let div = document.createElement("div");
    div.textContent = suggestion;
    div.onclick = function () {
      document.getElementById("searchInput").value = suggestion;
      suggestionsBox.innerHTML = "";
    };
    suggestionsBox.appendChild(div);
  });
}

// Event listener for the search input
document
  .getElementById("searchInput")
  .addEventListener("input", searchSuggestions);

