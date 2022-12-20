import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  type: 'running' | 'cycle';

  @IsString()
  distance: string;

  @IsString()
  duration: string;

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
