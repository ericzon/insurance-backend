import { IsNotEmpty, IsString } from 'class-validator';

export class PoliciesDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
}
