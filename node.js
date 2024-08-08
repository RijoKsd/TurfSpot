const object1 = {
  prop1: "value1",
  prop2: {
    prop3: "value3",
  },
};
const newObj = { ...object1 };
newObj.prop2.prop3 = "newValue3";
console.log(object1.prop2.prop3);
