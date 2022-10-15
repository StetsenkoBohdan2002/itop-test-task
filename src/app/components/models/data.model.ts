export interface DataApi {
  date: String;
  info: {
    rate: Number;
    timestamp: Number;
  };
  query: {
    amount: Number;
    from: String;
    to: String;
  };
  result: Number;
  success: Boolean;
}
