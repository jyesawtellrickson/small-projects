/* The player is initially faced with a

*/


const scoreRoot = document.getElementById("status-view"),
      electabuzz = scoreRoot.querySelector("#electabuzz"),
      cpu_hpView = scoreRoot.querySelector("#hp"),
      cpu_angerView = scoreRoot.querySelector("#anger"),
      attackBtn = document.getElementById("attack"),
      feedBtn = document.getElementById("feed"),
      finalBtn = document.getElementById("final"),
      game_message = document.getElementById("game-message"),
      stats = {hp: 100, anger: 0};


/**
 * @summary Initiliases the game.
 */
function gameInit() {

}


/**
 * @summary Gives stats for a given item.
 *
 * @param {String} item An item name.
 *
 * @returns {Object} A dictionary containing the item properties.
 */
function getItemStats(item){
  let effect = {
    'attack': {hp: -10, anger: 20},
    'feed': {hp: 0, anger: -30},
    'finalise': {hp: 0, anger: -40}
  };
  try{
    return effect[item]
  }
  catch (e){
    console.error('Item ' + item + ' not found.')
    return {hp: 0, anger: 0}
  }
}


/**
 * @summary Interacts with the object with an item.
 */
function interact(item) {
   // Item thrown and object is changed.
   // Get the item stats.
   console.log(stats);
   let itemStats = getItemStats(item);
   let newHP = stats['hp'] + itemStats['hp'];
   let newAnger = stats['anger'] + itemStats['anger'];
   newHP = newHP < 0 ? 0 : newHP
   newAnger = newAnger > 100 ? 100 : newAnger
   newAnger = newAnger < 0 ? 0 : newAnger
   stats['hp'] = newHP;
   stats['anger'] = newAnger;
   return {hp: newHP, anger: newAnger};
}


/**
 * @summary Attempts to finalise the game.
 */
function gameFinish() {
  // Attempt at finalising the game is undertaken.
}

/**
 * @summary Gets the decision from the player.
 */
function playerDecide() {
  // Decide which action to take.
  return new Promise((resolve) => {
    const actions = {
      attackItem: () => {
        item = 'attack';
        let stats = interact(item);
        updateStats(stats, cpu_hpView, cpu_angerView);
        attackBtn.removeEventListener('click', actions.attackItem);
        feedBtn.removeEventListener('click', actions.feedItem);
        finalBtn.removeEventListener('click', actions.finalise);
        resolve(stats);
      },
      feedItem: () => {
        item = 'feed';
        let stats = interact(item);
        updateStats(stats, cpu_hpView, cpu_angerView);
        attackBtn.removeEventListener('click', actions.attackItem);
        feedBtn.removeEventListener('click', actions.feedItem);
        finalBtn.removeEventListener('click', actions.finalise);
        resolve(stats);
      },
      finalise: () => {
        item = 'final';
        let stats = interact(item);
        updateStats(stats, cpu_hpView, cpu_angerView);
        attackBtn.removeEventListener('click', actions.attackItem);
        feedBtn.removeEventListener('click', actions.feedItem);
        finalBtn.removeEventListener('click', actions.finalise);
        resolve(stats);
      }
    };
    attackBtn.addEventListener('click', actions.attackItem);
    feedBtn.addEventListener('click', actions.feedItem);
    finalBtn.addEventListener('click', actions.finalise);
  });
}


function updateStats(stats, viewEl1, viewEl2) {
  viewEl1.textContent = stats['hp'];
  viewEl2.textContent = stats['anger'];
}



async function gameLoop() {
  const stats = await playerDecide();
  console.log(stats);
  if (stats['hp'] == 0) {
    // End game.
    console.log('The object fainted!')
    game_message.textContent = 'The object fainted!';
  } else if (stats['anger'] == 100) {
    console.log('The object is too angry!')
    game_message.textContent = 'The object got too angry!';
  } else {
    gameLoop();     // Recursively runs itself until finished.
  }
}

gameInit();
gameLoop();
