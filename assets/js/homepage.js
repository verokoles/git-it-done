var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
//execute upon form submisison browser event
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();
   //  console.log(event);
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }
};
var getUserRepos = function(user) {
    //format the gihub api url
    var apiUrl = 'https://api.github.com/users/' + user + '/repos';

    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        //if request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayRepos(data, user);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        //notice this '.catch()' getting chained to end of the '.then()'
        alert("Unable to connect to GitHub");
    });

};

var displayRepos = function(repos, searchTerm) {
    //check if api required any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    repoSearchTerm.textContent = searchTerm;
    
    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement('div');
    repoEl.classList = "list-item flex-row justify-space-between align-center";
//cerate a span element to hold a repo name
var titleEl = document.createElement("span");
titleEl.textContent = repoName;

//append to container
repoEl.appendChild(titleEl);
//append container to the dom

//create status element
var statusEl = document.createElement('span');
statusEl.classList = "flex-row align-center";
//check if current repo has issues or not 
if (repos[i].open_issues_count > 0) {
    statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + 'issue(s)';
} else {
statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

//append to container
repoEl.appendChild(statusEl);

repoContainerEl.appendChild(repoEl);
  }
};
// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);

