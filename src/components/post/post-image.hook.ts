type ImageListItem = {
  src: string;
  rows: number;
  cols: number;
};

type ImageList = {
  cols: number;
  cellHeight: number;
  images: ImageListItem[];
};

export const useImageHooks = () => {
  const buildList = (source: string[]): ImageList => {
    let listCols = 1;
    let itemCols = 1;
    let ROWS = 1;
    let cellHeight = 300;

    const images: ImageListItem[] = [];

    for (let index = 0; index < source.length; index++) {
      if (source.length > 1) {
        listCols = 2;
        itemCols = 2;
      }

      if (source.length >= 3) {
        listCols = 6;
        cellHeight = 200;
        ROWS = index === 0 ? 2 : 1;
        itemCols = index === 0 ? listCols : listCols / Math.min(source.length - 1, 3);
      }

      images.push({
        cols: itemCols,
        rows: ROWS,
        src: source[index]
      });
    }

    return {
      cols: listCols,
      cellHeight: cellHeight,
      images
    };
  };

  return {
    buildList
  };
};