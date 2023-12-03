module.exports = {
  /**
   * Displays a graphic and logs the backend server port.
   * 
   * @param {number} port - The port number on which the backend server is listening.
   * @returns {void}
   */
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
