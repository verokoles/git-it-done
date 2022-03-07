var getUserRepos = function() {
    console.log("function was called");
};

getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos");

};
