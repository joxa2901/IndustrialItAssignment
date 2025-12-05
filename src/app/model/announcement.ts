export interface AnnouncementPagination {
  limit: number;
  posts: Announcement[];
  skip: number;
  total: number;
}

export interface Announcement {
  body: string;
  id: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
  tags: string[];
  title: string;
  userId: number;
  views: number;
}
