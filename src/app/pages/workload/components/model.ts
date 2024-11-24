function getData() {
    return [
      {
        age: "Jan",
        timeSpentAlone: 193.30588,
        timeSpentWithFriends: 109.4145,
      },
      {
        age: "Feb",
        timeSpentAlone: 206.37056,
        timeSpentWithFriends: 110.7418,
      },
      {
        age: "Mar",
        timeSpentAlone: 224.17331,
        timeSpentWithFriends: 120.41887,
      },
      {
        age: "Apr",
        timeSpentAlone: 242.69839,
        timeSpentWithFriends: 137.75107,
      },
      {
        age: "May",
        timeSpentAlone: 267.79385,
        timeSpentWithFriends: 129.85716,
      },
      {
        age: "Jun",
        timeSpentAlone: 277.60379,
        timeSpentWithFriends: 122.7402,
      },
      {
        age: "Jul",
        timeSpentAlone: 270.21817,
        timeSpentWithFriends: 122.40627,
      },
      {
        age: "Aug",
        timeSpentAlone: 283.56686,
        timeSpentWithFriends: 100.16862,
      },
      {
        age: "Sept",
        timeSpentAlone: 270.93015,
        timeSpentWithFriends: 101.07177,
      },
      {
        age: "Oct",
        timeSpentAlone: 265.81378,
        timeSpentWithFriends: 96.786346,
      },
      {
        age: "Nov",
        timeSpentAlone: 275.12906,
        timeSpentWithFriends: 77.543015,
      },
      {
        age: "Dec",
        timeSpentAlone: 281.63202,
        timeSpentWithFriends: 77.856834,
      },
     
    ];
  }

export const numFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(value: any) {
  return `${Math.floor(value / 60)}h ${Math.round(value % 60)}m`;
}


  export default getData;