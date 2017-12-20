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
  //!checkEmail(email) ? throwError('Email not correct format') : 1;
  this.email = email;
  // Check length of name.
  this.name = name;
  this.target_name = undefined;
  this.target_email = undefined;
  return this;
}

function throwError(err) {
    throw new Error(err);
}


/**
 * @summary Checks if an email is the correct format.
 *
 * @param {String} email Email string to check.
 *
 * @returns {Boolean} Whether or not the email follows the correct format.
 */
function checkEmail(email) {
  if (email.indexOf('@') >= 0) {
    return true;
  } else {
    return false;
  }
}


function readUsers() {
  // Gets input from user.
  let formData = $('#input-form').serializeArray();
  // Convert form data to the correct user format.
  users = new Array();
  for (var i = 0; i < formData.length / 2; i++) {
    users.push(new user(formData[2*i].value,
                    formData[2*i+1].value));
  }
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
/*function sendEmail(user) {
  // Sends email to a specific user.
  try {
    window.open('mailto:' & user.target_email &
    '?subject=Your Secret Santa allocation!&body=' & user.target_name);
    return true;
  } catch {
    throwError('Failed to send email to ' & user.target_email);
  }
}*/


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
  console.log(users);
  users = shuffle(users);
  users.forEach(function(user, ix) {
    console.log(user, ix);
    user.target_name = users[(ix - 1) % users.length].name
    user.target_email = users[(ix - 1) % users.length].email
  });
  console.log(users);
  return users
}


function addInput(num=1) {
  num = String($('#add-fields').val());
  $('#add-fields').before(
    "Name " + num + ":<br>" +
    "<input type='text' class='name-input' name='name'><br>" +
    "Email " + num + ":<br>" +
    "<input type='text' class='email-input' name='email'><br>"
  );
  $('#add-fields').attr('value', Number(num)+1);
}


function runSecretSanta() {
  let users = readUsers();
  users = allocate(users);
  console.log(users);
}





var users = undefined;
