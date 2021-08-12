import { useState } from "react";

export const useKeyWordDistribution = (user: { survey: Array<any> }) => {
  const [keywords, setKeywords] = useState<Array<any>>([]);

  user.survey.forEach((surveyData: any) => {
    //make sure "qsri" matches provided id in db
    const foundSurvey = surveyData?.questionData.filter(
      (schema: any) => schema.questionSchemaRefId === "60db2ac309acdc2ffc1095f6"
    )[0];

    if (!foundSurvey) return;

    const keywordsParsed = JSON.parse(foundSurvey.answer);

    //create the keyword obj for state
    const keys = Object.values(keywordsParsed).map((kw: string, i: number) => ({
      key: `KW #${i + 1}`,
      value: i + 1 === 3 ? kw + ": UNAVAILABLE TAKEN BY COMPETITOR" : kw,
    }));

    console.log("leys", keys);
    if (keywords.length === 0) setKeywords(keys);
  });

  console.log("keydfsdf", keywords);
  return keywords;
};
