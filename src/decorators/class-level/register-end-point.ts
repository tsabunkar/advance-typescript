// Logic to cache/memorize the class-name passed in the class-level decorator as key:value pair
// in following format : endPoints[endPoint] = `http://serverApi.com/${endPoint}`
let endPoints: { [key: string]: string } = {};

export function registerEndPoint(customEndPointName?: string) {
  return function (klass: Function) {
    /* class decorator */
    console.log('Klass Names are : ', klass.name);

    const endPoint: string = customEndPointName || klass.name.toLowerCase();
    endPoints[endPoint] = `http://serverApi.com/${endPoint}`;
  };
}

export default endPoints;
