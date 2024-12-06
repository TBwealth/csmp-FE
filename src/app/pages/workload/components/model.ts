function getData() {
    return [
      {
        age: "Jan",
        timeSpentAlone: 193.30588,
        timeSpentWithFriends: 109.4145,
        timeSpentWithFamily: 103.7145,
      },
      {
        age: "Feb",
        timeSpentAlone: 206.37056,
        timeSpentWithFriends: 110.7418,
        timeSpentWithFamily: 112.7988,
      },
      {
        age: "Mar",
        timeSpentAlone: 224.17331,
        timeSpentWithFriends: 120.41887,
        timeSpentWithFamily: 103.7145,
      },
      {
        age: "Apr",
        timeSpentAlone: 242.69839,
        timeSpentWithFriends: 137.75107,
        timeSpentWithFamily: 242.69839,
      },
      {
        age: "May",
        timeSpentAlone: 267.79385,
        timeSpentWithFriends: 129.85716,
        timeSpentWithFamily: 137.75107,
      },
      {
        age: "Jun",
        timeSpentAlone: 277.60379,
        timeSpentWithFriends: 122.7402,
        timeSpentWithFamily: 224.17331,
      },
      {
        age: "Jul",
        timeSpentAlone: 270.21817,
        timeSpentWithFriends: 122.40627,
        timeSpentWithFamily: 100.16862,
      },
      {
        age: "Aug",
        timeSpentAlone: 283.56686,
        timeSpentWithFriends: 100.16862,
        timeSpentWithFamily: 122.40627,
      },
      {
        age: "Sept",
        timeSpentAlone: 270.93015,
        timeSpentWithFriends: 101.07177,
        timeSpentWithFamily: 270.93015,
      },
      {
        age: "Oct",
        timeSpentAlone: 265.81378,
        timeSpentWithFriends: 96.786346,
        timeSpentWithFamily: 77.543015,
      },
      {
        age: "Nov",
        timeSpentAlone: 275.12906,
        timeSpentWithFriends: 77.543015,
        timeSpentWithFamily: 101.07177,
      },
      {
        age: "Dec",
        timeSpentAlone: 281.63202,
        timeSpentWithFriends: 77.856834,
        timeSpentWithFamily: 270.93015,
      },
     
    ];
  }

export const numFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(value: any) {
  return `${Math.floor(value / 60)}h ${Math.round(value % 60)}m`;
}


  export default getData;