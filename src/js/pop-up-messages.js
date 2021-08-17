import Notiflix from 'notiflix';
const notiflixParams = {
  position: 'center-top',
  timeout: 1000,
  success: {
  background: '#FF6B01',
    },
    warning: {
        background: '#FF6B01',
        textColor:'#000000'
  }
}

class Notification {
    constructor(notiflixParams) {
        this.options = notiflixParams;
    }
    
    addWatched() {
        Notiflix.Notify.success('Added to Watched', this.options)
    }

    deleteWatched() {
        Notiflix.Notify.warning('Deleted from Watched',  this.options)
    }

    addQueue() {
        Notiflix.Notify.success('Added to Queue',  this.options)
    }

    deleteQueue() {
        Notiflix.Notify.warning('Deleted from Queue',  this.options)
    }

    loadingCircle() {
        Notiflix.Loading.circle('Please wait ...', this.options);
    }
    loadingRemove() {
        Notiflix.Loading.remove();
    }

    oops() {
        Notiflix.Notify.info('Oops! Something went wrong, please try again', this.options);
    }
}

export default new Notification(notiflixParams);