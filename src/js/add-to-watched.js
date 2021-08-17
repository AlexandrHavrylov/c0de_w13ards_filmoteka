import globalVariables from './global-variables';
import { HEADER_ENUM } from './header-switch';
import userLibrary from './userLibrary';
import notification from './pop-up-messages.js';


function addToWatched(card) {
  const addToWatchBtn = document.querySelector("[data-name='watched']");

  const inList = userLibrary.getById(card.id);
  if (!inList || !inList.isWatched) {
    card.isWatched = true;
    userLibrary.processCard(card);
    notification.addWatched();
    addToWatchBtn.textContent = 'Remove from watched';
  } else {
    card.isWatched = false;
    userLibrary.processCard(card);
    notification.deleteWatched();
    addToWatchBtn.textContent = 'add to watch';
  }
  if (globalVariables.curPage === HEADER_ENUM.LIBRARY) userLibrary.showFiltered();
}

function addToQueue(card) {
  const addToQueueBtn = document.querySelector("[data-name='queue']");

  const inList = userLibrary.getById(card.id);
  if (!inList || !inList.isQueue) {
    card.isQueue = true;
    userLibrary.processCard(card);
    notification.addQueue();
    addToQueueBtn.textContent = 'Remove from queue';
  } else {
    card.isQueue = false;
    userLibrary.processCard(card);
    notification.deleteQueue();
    addToQueueBtn.textContent = 'Add to queue';
  }
  if (globalVariables.curPage === HEADER_ENUM.LIBRARY) userLibrary.showFiltered();
}

export { addToWatched, addToQueue };
