import { useSpace } from '@/context/SpaceProvider';
import { saveDraftToLocalStorageUtil } from '@/utils/helpers';

export const useSaveDraft = () => {
  const { space, images: spaceImages, texts: spaceTexts, pages } = useSpace();

  const saveDraft = () => {
    if (space?.id) {
      saveDraftToLocalStorageUtil(space.id, {
        images: spaceImages,
        texts: spaceTexts,
        pages
      });
    }
  };

  return { saveDraft };
};
