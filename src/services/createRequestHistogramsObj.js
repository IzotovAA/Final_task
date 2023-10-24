export default function createRequestHistogramsObj(
  startDate,
  endDate,
  inn,
  limit
) {
  const requestObject = {
    issueDateInterval: {
      startDate: startDate,
      endDate: endDate,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: inn,
            maxFullness: true,
            inBusinessNews: null,
          },
        ],
        onlyMainRole: true,
        tonality: "any",
        onlyWithRiskFactors: false,
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: true,
      excludeAnnouncements: true,
      excludeDigests: true,
    },
    similarMode: "duplicates",
    limit: limit,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };

  return JSON.stringify(requestObject);
}
