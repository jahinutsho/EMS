import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const attendance = this.attendanceRepo.create(createAttendanceDto);
    return this.attendanceRepo.save(attendance);
  }

  async getAllAttendance() {
    return this.attendanceRepo.find({ order: { date: 'DESC' } });
  }

  async getSummary(employeeId: number) {
    return this.attendanceRepo.find({
      where: { employeeId },
      order: { date: 'DESC' }
    });
  }
}
