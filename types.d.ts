export interface IPost {
  description: string;
  title : string ;
  createdAt : datetime;
  file: {
    asset: {
      _id: string;
      url: string;
      mimeType: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    createdAt: date;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  userId: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
  city: string;
  country: string;
  relationship: string;
  followings: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  followers: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
}
