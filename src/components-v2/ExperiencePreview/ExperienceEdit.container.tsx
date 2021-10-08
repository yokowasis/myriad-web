import React, {useEffect} from 'react';

import {useRouter} from 'next/router';

import {useExperienceHook} from '../../hooks/use-experience-hook';
import {Experience} from '../../interfaces/experience';
import {ExperienceEditor} from '../ExperienceEditor/ExperienceEditor';

import {debounce} from 'lodash';
import {useImageUpload} from 'src/hooks/use-image-upload.hook';

export const ExperienceEditContainer: React.FC = () => {
  const {searchTags, tags, searchPeople, people, experience, getDetail, updateExperience} =
    useExperienceHook();
  const {uploadImage} = useImageUpload();
  const router = useRouter();
  const {experienceId} = router.query;

  useEffect(() => {
    if (experienceId) getDetail(experienceId);
  }, []);

  const onImageUpload = async (files: File[]) => {
    const url = await uploadImage(files[0]);
    if (url) return url;
    return '';
  };

  const onSave = (newExperience: Partial<Experience>, newTags: string[]) => {
    updateExperience(newExperience, newTags);
  };

  const handleSearchTags = debounce((query: string) => {
    searchTags(query);
  }, 300);

  const handleSearchPeople = debounce((query: string) => {
    searchPeople(query);
  }, 300);

  return (
    <ExperienceEditor
      type={'Edit'}
      experience={experience}
      tags={tags}
      people={people}
      onSearchTags={handleSearchTags}
      onImageUpload={onImageUpload}
      onSearchPeople={handleSearchPeople}
      onSave={onSave}
    />
  );
};