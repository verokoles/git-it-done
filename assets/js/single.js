var repoNameEL = document.querySelector("#repo-name");
var limitWarningEL = document.querySelector("#limit-warning");
var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function (repo) {
    console.log(repo);
    //format GitHub api url
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
// make request to URL
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                displayIssues(data);
                //checkif api has paginated issues
                if (response.headers.get("Link")) {
                  displayWarning(repo);
                } 
            });
               }       else {
                   console.log(response);
                    alert("There was a problem with your request!");
                }
            });
        };

        var displayIssues = function(issues) {
        if (issues.length === 0) {
            issueContainerEl.textContent = "This repo has no open issues!";
            return;
        }
        //loop over given issues
        for (var i = 0; i < issues.length; i++) {
            //create a link element to take users to the issue on github
            var issueEl = document.createElement("a");
            issueEl.classList = "list-item flex-row justify-space-between align-center";
            issueEl.setAttribute("href", issues[i].html_url);
            issueEl.setAttribute("target", "_blank");
            
            // create span to hold issue title
            var titleEl = document.createElement("span");
            titleEl.textContent = issues[i].title;
    
            // append to container
            issueEl.appendChild(titleEl);
    
            // create a type element
            var typeEl = document.createElement("span");
    
            // check if issue is an actual issue or a pull request
            if (issues[i].pull_request) {
                typeEl.textContent = "(Pull request)";
            } else {
                typeEl.textContent = "(Issue)";
            }
    
            // append to container
            issueEl.appendChild(typeEl);
            //append to dom
            issueContainerEl.appendChild(issueEl);
        }
    };
    
    var displayWarning = function(repo) {
        //add text to warning container
        limitWarningEL.textContent = "To see more than 30 issues, visit ";
        //create link element
        var linkEl = document.createElement("a");
        linkEl.textContent = "GitHub.com";
        linkEl.setAttribute("href", "https://gtihub.com/" + repo + "/issues");
        linkEl.setAttribute("target", "_blank");

        //append to warning container
        limitWarningEL.appendChild(linkEl);
    };

getRepoIssues("facebook/react");
