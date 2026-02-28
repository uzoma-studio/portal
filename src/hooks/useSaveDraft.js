import { useSpace } from '@/context/SpaceProvider';
import { saveDraftToLocalStorageUtil } from '@/utils/helpers';

export const useSaveDraft = () => {
  const { space, images: spaceImages, texts: spaceTexts, pages, settings } = useSpace();

//   override values allow you to specify only the part of the draft you want to update, without needing to pass everything
// added to ensure stale values aren't saved
  const saveDraft = (overrideImages, overrideTexts, overridePages, overrideSettings) => {
    if (space?.id) {
      saveDraftToLocalStorageUtil(space.id, {
        images: overrideImages !== undefined ? overrideImages : spaceImages,
        texts: overrideTexts !== undefined ? overrideTexts : spaceTexts,
        pages: overridePages !== undefined ? overridePages : pages,
        settings: overrideSettings !== undefined ? overrideSettings : settings
      });
    }
  };

  return { saveDraft };
};
