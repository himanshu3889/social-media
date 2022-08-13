export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
     description,
     topic,
     createdAt,
       file{
        asset->{
          _id,
          url,
          mimeType
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
    comments[]{
      comment,
      createdAt,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    _id,
     description,
     topic,
     createdAt,
       file{
        asset->{
          _id,
          url,
          mimeType
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
     likes,
    comments[]{
      comment,
      createdAt,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && description match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
     description,
     topic,
     createdAt,
       file{
        asset->{
          _id,
          url,
          mimeType
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
likes,
    comments[]{
      comment,
      createdAt,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;
  return query;
};

export const searchUsersQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "user" && userName match '${searchTerm}*'] `;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}'][0]`;
  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;
  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     description,
     topic,
     createdAt,
       file{
        asset->{
          _id,
          url,
          mimeType
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      createdAt,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     description,
     topic,
     createdAt,
       file{
        asset->{
          _id,
          url,
          mimeType
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      createdAt,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
    _id,
     description,
     topic,
     createdAt,
       file{
        asset->{
          _id,
          url,
          mimeType
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      createdAt,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const allVideosQuery = () => {
  const query = `*[_type == "post" && file.asset->mimeType in ["video/mp4", "video/webm", "video/ogg"]] | order(_createdAt desc){
    _id,
     description,
     topic,
     createdAt,
       file{
        asset->{
          _id,
          url,
          mimeType
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
    comments[]{
      comment,
      createdAt,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};
