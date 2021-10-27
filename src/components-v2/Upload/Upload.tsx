import React, {useState} from 'react';

import {Button, CircularProgress} from '@material-ui/core';

import {Dropzone} from '../atoms/Dropzone';
import {useStyles} from './Upload.styles';

type UploadProps = {
  accept: string[];
  loading: boolean;
  maxSize?: number;
  placeholder?: string;
  multiple?: boolean;
  onFileSelected: (result: File[] | string) => void;
};

export const Upload: React.FC<UploadProps> = props => {
  const {accept, placeholder, maxSize, loading, multiple = false, onFileSelected} = props;
  const styles = useStyles();

  const [files, setFiles] = useState<File[]>([]);
  const handleFileSelected = (files: File[]) => {
    setFiles(files);
  };

  const handleConfirm = () => {
    onFileSelected(files);
  };

  return (
    <div className={styles.root}>
      <Dropzone
        multiple={multiple}
        loading={loading}
        onImageSelected={handleFileSelected}
        accept={accept}
        placeholder={placeholder}
        maxSize={maxSize}
      />

      <Button
        className={styles.confirm}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConfirm}
        disabled={files.length === 0}>
        Confirm
        {loading && <CircularProgress size={24} className={styles.progress} color="secondary" />}
      </Button>
    </div>
  );
};
