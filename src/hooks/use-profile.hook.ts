// @ts-nocheck
import { useState, useEffect } from 'react';

import Axios from 'axios';
import { User } from 'src/interfaces/user';

const MyriadAPI = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export const useProfileHook = user => {
  const [profile, setProfile] = useState<User>(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params] = useState({
    limit: 20,
    skip: 0
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);

    try {
      console.log('getProfile');
      const { data } = await MyriadAPI({
        url: `/users/${user.address}`,
        method: 'GET'
      });

      setProfile({
        ...profile,
        ...data
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (attributes: Partial<User>) => {
    setLoading(true);

    try {
      const { data } = await MyriadAPI({
        url: `/users/${user.address}`,
        method: 'PATCH',
        data: attributes
      });

      setProfile({
        ...profile,
        ...attributes
      });
      console.log('>>>>', attributes);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    profile,
    updateProfile
  };
};