const collectionName = 'users';

async function insertUser(ad) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(ad);
  return insertedId;
}

async function getAds() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
  insertAd,
  getAds,
};