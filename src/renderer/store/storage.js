import Store from "electron-store";

export default ({ electronStore, electronStoreOpts } = {}) => {
  const store = electronStore || new Store(electronStoreOpts || {});

  return {
    store,
    getItem: key => {
      return new Promise(resolve => {
        resolve(store.get(key));
      });
    },
    setItem: (key, item) => {
      return new Promise(resolve => {
        resolve(store.set(key, item));
      });
    },
    removeItem: key => {
      return new Promise(resolve => {
        resolve(store.delete(key));
      });
    }
  };
};
