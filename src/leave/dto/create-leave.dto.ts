import { IsDate, IsString } from 'class-validator';

export class CreateLeaveDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  leaveType: string;

  @IsString()
  reason: string;
}