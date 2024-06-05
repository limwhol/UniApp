exports.main = async (event, context) => {
let {name,age}=event;
return `My name is ${name}, my age is ${age}`
};
