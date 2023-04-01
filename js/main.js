import {renderGallery} from './gallery.js';
import {clickOnUpload, setUserFormSubmit, closeUserModal } from './form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

getData()
  .then((newPhotos) => {
    renderGallery(newPhotos);
  }).catch(
    (err) => showAlert(err.message)
  );

clickOnUpload();

setUserFormSubmit(closeUserModal);
