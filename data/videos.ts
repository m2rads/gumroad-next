type VideoMetaData = {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  };
  
  type VideoData = {
    name: string;
    id: string;
    updated_at: string;
    created_at: string;
    last_accessed_at: string;
    metadata: VideoMetaData;
    url: string;
    error: null;
  };
  
  const videoData: VideoData[] = [
    {
        name: '23e9bdf4-6d80-45a9-bf58-a01de9e976d1.mp4',
        id: '92d5192e-583d-47c2-9491-863ca6d3fdb0',
        updated_at: '2024-02-26T04:58:26.751Z',
        created_at: '2024-02-26T04:58:26.751Z',
        last_accessed_at: '2024-02-26T04:58:26.751Z',
        metadata: {
          eTag: '"f2a07a3da3fd8c91379fafa5dd01e6ef"',
          size: 1639036,
          mimetype: 'video/mp4',
          cacheControl: 'no-cache',
          lastModified: '2024-02-26T04:58:27.000Z',
          contentLength: 1639036,
          httpStatusCode: 200
        },
        url: 'https://vtruixhrrplucloewmhl.supabase.co/storage/v1/object/sign/trainer_videos/bbbabe81-8dd4-4466-bebd-46add93bfaa9/23e9bdf4-6d80-45a9-bf58-a01de9e976d1.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbmVyX3ZpZGVvcy9iYmJhYmU4MS04ZGQ0LTQ0NjYtYmViZC00NmFkZDkzYmZhYTkvMjNlOWJkZjQtNmQ4MC00NWE5LWJmNTgtYTAxZGU5ZTk3NmQxLm1wNCIsImlhdCI6MTcwODk4NTQ5MCwiZXhwIjoxNzA4OTg5MDkwfQ.E_-AfDiCFZN9gCs2jexIfkcPr4MdCDaxRQ31CV93jaE',
        error: null
      }
  ];
  
  export default videoData;
  