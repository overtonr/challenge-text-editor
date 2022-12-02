import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.error('PUT to add content to the database');
  const jateDB = await openDB('jateDB', 1);
  const trans = jateDB.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  const request = store.put({id: id, text: content});
  const result = await request;
  console.log('data saved to DB', result);
};


// logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('GET all content from database');
  const jateDB = await openDB('jateDB',1);
  const trans = jateDB.transaction('jate', 'readonly');
  const store = trans.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
