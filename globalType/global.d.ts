declare type CareerType = {
    companyName?: string;
    companyProject?: string;
    startYear?: string;
    startDate?: string;
    endYear?: string;
    endDate?: string;
}

declare type CareerUidType = CareerType & {
    uid: number;
}

declare type CareerQueryType = CareerUidType & {
    createdAt?: string;
    updatedAt?: string;
}