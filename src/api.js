export const getComments = async () => {
    return [
      {
        id: "1",
        RoleType: "URL",
        body: "https://migration.quodeck.com/learner/#/login",
        username: "Suraj",
        userId: "1",
        parentId: null,
        createdAt: "2022-07-16T23:00:33.010+02:00",
      },
      {
        id: "2",
        RoleType: "plainText",
        body: "Suraj Gupta",
        username: "Trupal",
        userId: "2",
        parentId: null,
        createdAt: "2022-07-16T23:00:33.010+02:00",
      },
      {
        id: "3",
        RoleType: "plainText",
        body: "gupta",
        username: "Suraj",
        userId: "2",
        parentId: "1",
        createdAt: "2022-07-16T23:00:33.010+02:00",
      },
      {
        id: "4",
        RoleType: "plainText",
        body: "MERN Developer in Quodeck",
        username: "Trupal",
        userId: "2",
        parentId: "2",
        createdAt: "2022-07-16T23:00:33.010+02:00",
      },
    ];
  };
  
  export const createComment = async (text, parentId = null,type) => {
    return {
      id: Math.random().toString(36),
      RoleType:type,
      body: text,
      parentId,
      userId: "1",
      username: "suraj",
      createdAt: new Date().toISOString(),
    };
  };

  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async (id) => {
    return {};
  };
  
