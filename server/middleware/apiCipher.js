const { default: axios } = require("axios");
const { sendSMS } = require("./twilio");

module.exports.cipher = async ({ postingSource, postData, user }) => {
  console.log("user!", postData, postingSource);
  try {
    let response;

    switch (true) {
      case postingSource.companyName.toLowerCase() === "360connect":
        response = await axios({
          method: postingSource.apiMethod,
          url: postingSource.apiEndpoint,
          data: {
            ...postData,
          },
        });

        return response.data;
      case postingSource.companyName.toLowerCase() === "boberdoo":
        console.log("boberdoo lead", postData);
        //Extract out all the required fields, no unnecesary data it request will fail!
        const requiredData = {};
        let query;
        if (postData.Time_In_Business)
          requiredData.Time_In_Business = postData.Time_In_Business;
        //////////////////////////////////////////////
        if (postData.Monthly_Credit_Card_Sales)
          requiredData.Monthly_Credit_Card_Sales =
            postData.Monthly_Credit_Card_Sales;
        ///////////////////////////////////////////
        if (postData.Monthly_Gross_Sales)
          requiredData.Monthly_Gross_Sales = postData.Monthly_Gross_Sales;
        ///////////////////////////////////////////////
        if (postData.First_Name) requiredData.First_Name = postData.First_Name;
        ///////////////////////////////////////////////
        if (postData.Last_Name) requiredData.Last_Name = postData.Last_Name;
        ///////////////////////////////////////////////
        if (postData.Email) requiredData.Email = postData.Email;
        ///////////////////////////////////////////////
        if (postData.Primary_Phone)
          requiredData.Primary_Phone = postData.Primary_Phone;
        ///////////////////////////////////////////////
        if (postData.Business_Name)
          requiredData.Business_Name = postData.Business_Name;
        ///////////////////////////////////////////////
        if (postData.TYPE === "19") {
          query = `${postingSource.apiEndpoint}?Key=${process.env.BOBERDOO_API_KEY}&API_Action=submitLead&Mode=post&TYPE=${postData.TYPE}&SRC=WinFreeOptins&Monthly_Gross_Sales=${requiredData.Monthly_Gross_Sales}&Personal_Credit_Score=Fair (600-679)&Landing_Page=https://www.winfreeadvertising.com/&Time_In_Business=${requiredData.Time_In_Business}&First_Name=${requiredData.First_Name}&Last_Name=${requiredData.Last_Name}&Business_Name=${requiredData.Business_Name}&Email=${requiredData.Email}&Primary_Phone=${requiredData.Primary_Phone}`;
        }
        if (postData.TYPE === "37") {
          query = `${postingSource.apiEndpoint}?Key=${process.env.BOBERDOO_API_KEY}&API_Action=submitLead&Mode=post&TYPE=${postData.TYPE}&SRC=WinFreeOptins&Monthly_Credit_Card_Sales=${requiredData.Monthly_Credit_Card_Sales}&Personal_Credit_Score=Fair (600-679)&Landing_Page=https://www.winfreeadvertising.com/&First_Name=${requiredData.First_Name}&Last_Name=${requiredData.Last_Name}&Business_Name=${requiredData.Business_Name}&Email=${requiredData.Email}&Primary_Phone=${requiredData.Primary_Phone}`;
        }

        if (!query) throw new Error("A query is required for posting");

        response = await axios.post(query);

        console.log("boberdoo response", response.data);
        return response;
      default:
        console.log("no api");
        return null;
    }
  } catch (error) {
    console.log("error in cipher", error);
    throw new Error("Error In Cipher:", error);
  }
};
