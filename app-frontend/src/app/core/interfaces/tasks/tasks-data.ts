export interface TaskDto {
    _id?: string 
    title: string
    description: string
    status: string
    isUpdating?: boolean;
    updatedTitle?: string;
    updatedDescription?: string;
  }
  