export type NewsItem = {
  _id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  category: "Events" | "Announcements" | "Academics" | "General";
  public_id: string;
};
