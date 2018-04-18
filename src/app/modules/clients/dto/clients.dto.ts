import { IsNotEmpty, IsString } from 'class-validator';

export class ClientsDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
}
