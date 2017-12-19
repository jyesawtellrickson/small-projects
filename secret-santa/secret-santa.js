/* Web app for secret santa competiton.
Takes as input a list of names and emails of participants.
Returns HTTP 200 Status OK and sends emails to the people.
*/

/**
 * @summary User is the main class in the program.
 *
 * @param {String} name Name of the user.
 * @param {String} email Email of the user.
 *
 */
function user(name, email) {
    // Perform check on email.
    !checkEmail(email) ? throw new Error('Email not correct format');
    this.email = email;
    // Check length of name.
    this.name = name;
    this.target_name = undefined;
    this.target_email = undefined;
}


/**
 * @summary Checks if an email is the correct format.
 *
 * @param {String} email Email string to check.
 *
 * @returns {Boolean} Whether or not the email follows the correct format.
 */
function checkEmail(email) {
  email.indexOf('@') >= 0 ? return true : return false;
}


function readUsers() {
  // Gets input from user.
  users = [user(undefined, undefined)];
  return users
}


/**
 * @summary Fisher-Yates (Knuth) Shuffle algorithm.
 *
 * @param {Array} array Unshuffled array.
 *
 * @returns {Array} Shuffled array.
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


/**
 * @summary Sends an email to the specified user via the local mail app.
 *
 * @param {Object} user User to mail to.
 *
 * @returns {Boolean} True if mail sent successfully.
 */
function sendEmail(user) {
  // Sends email to a specific user.
  try {
    window.open('mailto:' & user.target_email &
    '?subject=Your Secret Santa allocation!&body=' & user.target_name);
    return true
  } catch {
    throw new Error('Failed to send email to ' & user.target_email);
  }
}


/**
 * @summary Allocates names to each email, making sure to follow logic.
 *
 * Function randomises the order of the array and then assigns in a directed
 * manner.
 *
 * @param {Array} users Array of user objects.
 *
 * @returns {Array} Allocated users.
 */
function allocate(users){
  users = shuffle(users);
  users.forEach(function(ix, user) {
    user.target_name = users[(ix - 1) % users.length].name
    user.target_email = users[(ix - 1) % users.length].email
  });
  return users
}

var users = undefined;
