import { IsArray, IsOptional, IsString } from 'class-validator';

export interface OutputBlockData {
  id?: string;
  type: any;
  data: any;
}

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsOptional()
  image: string;

  @IsOptional()
  @IsArray()
  tags: string;
}
