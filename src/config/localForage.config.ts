import localForage from 'localforage';

export const locForage = localForage;

locForage.config({
  driver: localForage.INDEXEDDB,
  name: 'userGoals',
  storeName: '__user_goals',
  description: "Storage for the user's goal they are trying to get to."
});
