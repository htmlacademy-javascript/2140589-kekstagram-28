import {renderGallery} from './gallery.js';
import {clickOnUpload, setUserFormSubmit, closeUserModal } from './form.js';
import { getData } from './api.js';
import { showAlert, debounce } from './utils.js';
import {init, getSortedPictures} from './sorting.js';
import {uploadPhoto} from './upload-photo.js';

getData()
  .then((newPhotos) => {
    const debouncedRenderGallery = debounce(renderGallery);
    init(newPhotos, debouncedRenderGallery);
    renderGallery(getSortedPictures(newPhotos));
  }).catch(
    (err) => showAlert(err.message)
  );

clickOnUpload();

setUserFormSubmit(closeUserModal);

uploadPhoto();
