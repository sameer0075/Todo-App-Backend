import { IsString, IsOptional, IsIn, IsDate, IsNotEmpty } from 'class-validator';

export class TodoDto {
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty()
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsIn(['ACTIVE', 'INACTIVE'], { message: 'Status must be "ACTIVE" or "INACTIVE"' })
  @IsOptional()
  status?: string;

  @IsDate({ message: 'Invalid date format' })
  @IsOptional()
  createdAt?: Date;

  constructor() {
    this.title = ''; // Initialize title here
  }
}
