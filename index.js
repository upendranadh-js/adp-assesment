const axios = require("axios");

const getUsersTransactionsData = async (url) => {
  let res = await axios(url);
  console.log(res);
  const person = getHighestPerson(res.data.transactions, res.data.id);
};

const postData = async (data) => {
  try {
    let post = await axios({
      method: "POST",
      url: "https://interview.adpeai.com/api/v2/submit-task",
      data: data,
    });
    console.log(post);
  } catch (e) {
    console.log(e);
  }
};
const getHighestPerson = (transactions, id) => {
  let obj = {};
  let curYear = new Date().getFullYear();
  console.log(curYear);
  let prevYear = curYear - 1;

  transactions.forEach((transaction) => {
    if (transaction["timeStamp"].includes(prevYear)) {
      let key = transaction["employee"]["name"];
      obj[key] = obj[key]
        ? obj[key] + transaction["amount"]
        : transaction["amount"];
    }
  });
  let max = 0;
  for (let key in obj) {
    let val = obj[key];
    max = Math.max(max, val);
  }
  console.log(max);
  let name = "";
  for (let key in obj) {
    if (obj[key] === max) {
      name = key;
    }
  }

  console.log(name);
  let filteredTrans = transactions
    .filter((trans) => {
      if (trans["employee"]["name"] === name && trans["type"] === "alpha") {
        return true;
      }
      return false;
    })
    .map((obj) => obj["transactionID"]);
  console.log(filteredTrans);
  let data = { id: id, result: filteredTrans };
  postData(data);
};
const inIt = () => {
  getUsersTransactionsData("https://interview.adpeai.com/api/v2/get-task");
};

inIt();
