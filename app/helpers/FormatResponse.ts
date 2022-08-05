export const FormatResponse = res => {
  let newRes;

  if (res.data && res.data.length > 0) {
    if (res.data.length === 1) {
      newRes = res.data[0].attributes;
      newRes.id = res.data[0].id;
      return newRes;
    }
    newRes = [];
    for (const item of res.data) {
      const obj = {...item.attributes};
      obj.id = item.id;
      console.log(obj);
      newRes.push(obj);
    }
    return newRes;
  }

  return res;
};
