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

declare type PostType = {
  title?: string;
  content?: string;
  userName?: string;
  userId?: string;
};

declare type PostUidType = PostType & {
  uid: number;
};

declare type PostQueryType = PostUidType & {
  createAt?: string;
  updatedAt?: string;
};
