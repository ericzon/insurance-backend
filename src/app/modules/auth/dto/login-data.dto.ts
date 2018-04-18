import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDataDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
}
