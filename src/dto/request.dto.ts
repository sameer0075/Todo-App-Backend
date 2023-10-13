import { IsString, IsOptional, IsIn, IsDate, IsNotEmpty, IsEnum } from 'class-validator';

enum StatusEnum {
  ACTIVE,
  INACTIVE
}
export class TodoDto {
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty()
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsEnum(StatusEnum, {
    message: 'Status must be either "ACTIVE" or "INACTIVE"',
  })  @IsOptional()
  status?: string;

  @IsDate({ message: 'Invalid date format' })
  @IsOptional()
  createdAt?: Date;

  constructor() {
    this.title = ''; // Initialize title here
  }
}
