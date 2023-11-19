module.exports = {
  displayGraphic(port) {
    console.log(`\x1b[31m
  ____        _
 / __ \\      (_)
| |  | |_   _ _ ___________  ___
| |  | | | | | |_  /_  / _ \\/ __|
| |__| | |_| | |/ / / /  __/\\__ \\
 \\___\\_\\\\__,_|_/___/___\\___||___/
\x1b[34m 
Backend server is listening on port ${port} \x1b[0m`);
  },
};
