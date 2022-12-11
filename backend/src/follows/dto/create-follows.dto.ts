import { IsNotEmpty } from 'class-validator';

export class CreateFollowsDto {
    @IsNotEmpty()
    followingId: number;

    @IsNotEmpty()
    followerId: number;
}