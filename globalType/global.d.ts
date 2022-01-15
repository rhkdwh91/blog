declare type CareerType = {
  companyName?: string;
  companyProject?: string;
  startYear?: string;
  startDate?: string;
  endYear?: string;
  endDate?: string;
};

declare type CareerUidType = CareerType & {
  uid: number;
};

declare type CareerQueryType = CareerUidType & {
  createdAt?: string;
  updatedAt?: string;
};

declare type BoardType = {
  title?: string;
  content?: string;
  userName?: string;
};

declare type BoardUidType = BoardType & {
  uid: number;
};

declare type BoardQueryType = BoardUidType & {
  createAt?: string;
  updatedAt?: string;
};
