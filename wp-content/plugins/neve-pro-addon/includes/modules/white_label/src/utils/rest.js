/* global wp */
export const saveOption = (option, value) => {
  const model = new wp.api.models.Settings({
    [option]: value
  });

  return new Promise((resolve) => {
    model.save().then((r) => {
      if (! r || ! r[option] === value) {
        resolve({ success: false });
      }
      resolve({ success: true });
    });
  });
};
