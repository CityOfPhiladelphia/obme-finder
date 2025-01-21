export default {
  id: 'covid-testing',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/Black_Male_Engagement_Resources_(Public_View_Only_Layer)/FeatureServer/0/query',
  options: {
    params: {
      where: '1=1',
      outFields: '*',
      f: 'geojson',
    },
  },
};
