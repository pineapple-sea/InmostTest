export interface TopAlbums {
  '@attr': {
    tag: string;
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
  };
  album: Album[];
  filteredAlbums: Album[];
}

interface Album {
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: {
    size: string;
    '#text': string;
  }[];
  name: string;
}
