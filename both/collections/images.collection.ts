import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { UploadFS } from 'meteor/jalik:ufs';
import { Thumb, Image } from "../models/image.model";

export const Images = new MongoObservable.Collection<Image>('images');
export const Thumbs = new MongoObservable.Collection<Thumb>('thumbs');

function loggedIn(userId) {
  return !!userId;
}

export const ThumbsStore = new UploadFS.store.Local({
  collection: Thumbs.collection,
  name: 'thumbs',
  path: process.env.PWD + '/uploads/thumbs',
  permissions: new UploadFS.StorePermissions({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
  }),
  transformWrite(from, to, fileId, file) {
    // Resize to 32x32
    const gm = require('gm');

    gm(from, file.name)
      .resize(128, 128)
      .gravity('Center')
      .extent(128, 128)
      .quality(100)
      .stream()
      .pipe(to);
  }
});

export const ImagesStore = new UploadFS.store.Local({
  collection: Images.collection,
  name: 'images',
  path: process.env.PWD + '/uploads/images',
  filter: new UploadFS.Filter({
    contentTypes: ['image/*']
  }),
  copyTo: [
    ThumbsStore
  ],
  permissions: new UploadFS.StorePermissions({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
  })
});
